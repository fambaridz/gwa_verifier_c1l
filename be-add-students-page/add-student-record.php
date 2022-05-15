<?php

/*
API for request done when adding student records.
For front-end requests:
    - API only listens to POST request methods
    - All request payload is at body stored in JSON format.
    - Only COMMITTEE USERS can ACCESS this API 
    - Front-end is expected to dynamically calculate 'enrolled' and 'running_total' before putting into body
    Sample Request:
    Method: POST
    body: 
        {
          "student_number":<int>,
          "subjects": 
          {
            [
              "course_number":<string>,
              "grade":<string>,
              "units":<string>,
              "enrolled":<float>,
              "running_total":<double>,
              "term":<string>
            ], 
            .
            .
            .
            [
              "course_number":<string>,
              "grade":<string>,
              "units":<string>,
              "enrolled":<float>,
              "running_total":<double>,
              "term":<string>
            ]
          }
        }
*/

header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db"; 

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

//decode JSON object from HTTP body
$data = json_decode(file_get_contents('php://input'));  //json_decode == json_parse

$student_number = $data->student_number;    //stores the student's student number
$student_record = $data->student_record;    //stores the student's records to be evaluated

/**
 * TEMPORARY:
 * for now, student's Degree ID will be based off the a general degree found in the "degree_curriculum table" (those with an empty "major column"); 
 * this is found by:
 * 1. getting the degree_program of the student and finding a matching degree_nickname in degree_curriculum table
 * 2. finding the row where 'major' column is '' AND 'old_new' column is 'New' 
 * this  will return a table with a single row with the specified conditions
 * this is only to see if the to be added student record is valid or invalid once a degree ID is set for the student, for now
 * will be updated once there is a properly defined basis for student's Degree ID
 */

$sql = "SELECT student_number, degree_id, degree_nickname, old_new, major, major_units, options, ge_electives_units, electives_units, recommended_units
        FROM degree_curriculums, student
        WHERE student_number = $student_number AND degree_curriculums.degree_nickname = student.degree_program AND major = '' AND old_new = 'New'";

$result = mysqli_query($con,$sql);
$student_degree = mysqli_fetch_assoc($result);  

$degree_id = (int)$student_degree['degree_id'];                      //stores the student's degree id
$degree_program = $student_degree['degree_nickname'];
$old_new =$student_degree['old_new'];
$major = $student_degree['major'];
$options = $student_degree['options'];
$major_units_required = (int)$student_degree['major_units'];            //major units required based on degree id
$ge_units_required = (int)$student_degree['ge_electives_units'];        //ge units required based on degree id
$elective_units_required = (int)$student_degree['electives_units'];     //elective units required based on degree id
$recommended_units_required = (int)$student_degree['recommended_units'];//total unites required

$calculated_running_total = 0;                                          //stores summation of enrolled units; updated for every pass in each entry in the student record
/**
 * $response will contain all relevant details about the student's degree
 * and the validity of a student record and the fields inside a student_record
 */

$response = array('student_number'=>$student_number,    
                  'degree_id'=>$degree_id, 
                  'degree_program'=>$degree_program,
                  'old_new'=>$old_new,
                  'major'=>$major,
                  'options'=>$options,
                  'major_units_required'=>$major_units_required,
                  'majors_taken'=>NULL,
                  'ge_units_required'=>$ge_units_required,
                  'ge_taken'=>NULL,
                  'elective_units_required'=>$elective_units_required,
                  'electives_taken'=>NULL,
                  'recommended_units_required'=>$recommended_units_required,
                  'total_units_taken'=>NULL,
                  'records_remarks'=>NULL);                    

$records_remarks = array();   //will contain all records that have been checked for validation and it's remarks, to be later inserted into $response

$major_units_taken = 0;
$ge_units_taken = 0;
$elective_units_taken = 0;
$total_units_taken = 0;

$numeric_grade = array('1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.5', '2.75', '3.0', '4.0', '5.0');
$non_numeric_grade = array('INC', 'DRP');

function is_subject ($con, $degree_id, $course, &$expected_units, &$subject_elective){
  $sql = "SELECT course_number, number_units, required_choice
          FROM subjects
          WHERE degree_id = $degree_id AND course_number = '$course'";

  $result = mysqli_query($con,$sql);

  if(mysqli_num_rows($result)==1) {
    //if so, get the expected amount of units for this subject, and set subject_elective
    $result = mysqli_fetch_assoc($result);
    $expected_units = $result['number_units'];
    
    if ($result['required_choice'] == '')               //if empty column 
      $subject_elective = 0;
    else if ($result['required_choice'] == 'Required') //if major
      $subject_elective = 1;
    else if ($result['required_choice'] == 'Other')    //if choice/other (?)
      $subject_elective = 2;
    return 1;
  }
  return 0;
}

function is_elective ($con, $course, &$expected_units, &$subject_elective){
  $sql = "SELECT course_number, number_units, general_or_free
          FROM electives
          WHERE course_number = '$course'";
  
  $result = mysqli_query($con,$sql);

  if(mysqli_num_rows($result)==1) {
    $result = mysqli_fetch_assoc($result);
    //if so, get the expected amount of units for this subject
    $expected_units = $result['number_units'];
    
    //and check if it is a general elective or free_elective
    if($result['general_or_free'] == 'general')   //general elective
      $subject_elective = 3;
    else if($result['general_or_free'] == 'Free') //free elective
      $subject_elective = 4;
    return 1;
  }
  return 0;
}

foreach($student_record as $entry) {
  
  init: //intializations needed for verification

  $course_number = $entry->course_number;   //fields from entry
  $grade = $entry->grade;
  $units = $entry->units;
  $enrolled = $entry->enrolled;
  $running_total = $entry->running_total;
  $term = $entry->term;

  $valid_student_record = 0;  //to know if this student_record has valid values and format, and can be safely added to the database

  $subject_elective = NULL;      //can be 0 => '' , 1=> 'Required', 2=> 'Other', 3=> 'general', 4=> 'free'; refer to the functions (is_subject(), is_elective()) for how it is obtained
  $expected_units = NULL;        //stores expected number of units once cross-referenced with either subjects or electives

  $valid_grade = 0;           //set to 1/TRUE once field has been to checked to be correct and valid, default 0/FALSE
  $valid_units = 0;
  $valid_enrolled = 0;
  $valid_running_total = 0; 
  $valid_term = 0;
  $calculated_enrolled = 0;           //stores value of grade * units; set 0
  
  
  categorize: //program section that finds if a student record is a subject or elective
  //function calls pass by reference $expected_units and $subject_elective
  if(is_subject($con, $degree_id, $course_number, $expected_units, $subject_elective));  //check first if student record -> course_number is in subject with matching degree_id
  else if(is_elective($con, $course_number, $expected_units, $subject_elective));        //else check if it is in elective and also determine if it is general or free
  else {
    /**
   * TEMPORARY:
   * ELSE, if it not in either subject or elective, consider for now as a free elective
   * WILL be updated/removed once all electives are added in the database
   */
  $subject_elective = 4;
  $expected_units = $entry->units;
  }
  
  validity:  //program section where format and values are verified
  
    //units:
      if ($units == $expected_units) 
        $valid_units = 1; 
    
    //grades:
      //if grade is numeric
      if (in_array($grade, $numeric_grade)) {
        $valid_grade = 1; 
        $calculated_enrolled = (float)$grade * (float)$units;  //stores value when grade and units are multiplied              
      }
      //else, if grade is non-numeric
      else if (in_array($grade, $non_numeric_grade)) {
        $valid_grade = 1;
        $grade = $grade;
      }
      //else, grade is invalid

    //enrolled: calculated $enrolled here should be equal to the value in the entry->enrolled AND should follow the format (either whole number or float with at most 2 decimal digits)
      if ($calculated_enrolled == (float)$enrolled && preg_match("/^[0-9]+(\.[0-9]{1,2}){0,1}$/", $enrolled)) 
        $valid_enrolled = 1;

    //running total: before updating running total, check first if it would match what is in the student record
      if ($calculated_running_total + $calculated_enrolled == (float)$running_total && preg_match("/^[0-9]+(\.[0-9]{1,2}){0,1}$/", $running_total)) {
        $calculated_running_total += $calculated_enrolled;  //if valid, only time to update running_total
        $valid_running_total = 1;
      }
    //term: regex; to update: midyear case
      if (preg_match("/I{1,2}\/[0-9]{2}\/[0-9]{2}/", $term))
        $valid_term = 1;
    
    //student_record: check if all fields are valid
    if($valid_grade && $valid_units && $valid_enrolled && $valid_running_total && $valid_term)
      $valid_student_record = 1;
    
    $remarks = '';
  
  insert:
  echo $units."\n";
  //if valid student record
  if($valid_student_record) {
    //firstly, check if recommended_units_required is about to be reached
    if(($total_units_taken + $units) > (float)$recommended_units_required) {
      $remarks .= "$course_number not added to database, will exceed total units required\n - total units taken: $total_units_taken\n - recommended units required: $recommended_units_required";
      goto compilation;
    }
    //secondly, check if subject is a major/ge/elective and check if the taken units won't exceed yet
    switch($subject_elective) {
      case 1:   //check if major units have exceeded
        if(($major_units_taken + $units) > (float)$major_units_required) {
          $remarks .= "$course_number not added to database, will exceed major units required\n - major units taken: $major_units_taken\n - major units required: $major_units_required";
        goto compilation;
        }
        break;

      case 3:   //check if ge units have exceeded
        if(($ge_units_taken + $units) > (float)$ge_units_required) {
          $remarks .= "$course_number not added to database, will exceed ge units required\n - ge units taken: $ge_units_taken\n - ge units required: $ge_units_required";
          goto compilation;
        } 
        break;
        
      case 4:   //check if elective units have exceeded
        if(($elective_units_taken + $units) > (float)$elective_units_required) {
          $remarks .= "$course_number not added to database, will exceed elective units required\n - elective units taken: $elective_units_taken\n - elective units required: $elective_units_required";
          goto compilation;
        }
        break;
    }
    
    $sql = "INSERT INTO student_record(student_number, course_number, grade, units, enrolled, running_total, term)
            VALUES ('$student_number','$course_number','$grade','$units','$enrolled','$running_total','$term')";

    // run SQL statement
    $result = mysqli_query($con,$sql);

    if (!$result) {
      echo "error";
    } else {
      echo http_response_code() . " OK: $course_number added to database\n";
      $remarks .= "$course_number successfully added to database\n";
      //update units taken, depending on category and in total
      $total_units_taken += $units;
      switch($subject_elective) {
        case 1:
          $major_units_taken += $units;
          break;

        case 3:
          $ge_units_taken += $units;
          break;
          
        case 4:
          $elective_units_taken += $units;
          break;
      }
        
    }
  } 
  else {
    $remarks .= "$course_number not added to database, please double-check the following:\n";
    if(!$valid_grade)
      $remarks .= "- grade, $grade;\n";
    if(!$valid_units) 
      $remarks .= "- units, $units;\n";
    if(!$valid_enrolled) 
      $remarks .= "- enrolled, $enrolled;\n";
    if(!$valid_running_total) 
      $remarks .= "- running total, $running_total;\n";
    if(!$valid_term)
      $remarks .= "- term, $term;\n";
    
  }
  
  compilation:  //after checking an entire entry, record in an array all details about it's validity and remarks
  echo $remarks."\n";
  $records_remarks[] = array('course_number'=>$course_number, 'valid_student_record'=>$valid_student_record, 'valid_grade'=>$valid_grade,'valid_units'=>$valid_units,'valid_enrolled'=>$valid_enrolled,'valid_running_total'=>$valid_running_total,'valid_term'=>$valid_term,'remarks'=>$remarks);
}

//final additions to the response
$response['records_remarks'] = $records_remarks;
$response['majors_taken'] = $major_units_taken;
$response['ge_taken'] = $ge_units_taken;
$response['electives_taken'] = $elective_units_taken;
$response['total_units_taken'] = $total_units_taken;

print_r($response); //uncomment to properly see response
echo json_encode($response);

$con->close();