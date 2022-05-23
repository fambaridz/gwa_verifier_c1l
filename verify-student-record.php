<?php

/*
API for request done when adding student records.
For front-end requests:
    - API only listens to POST request methods
    - All request payload is at body stored in JSON format.
    - Only COMMITTEE USERS can ACCESS this API 
    - Front-end is expected to dynamically calculate 'enrolled' and 'total' before putting into body
    Sample Request:
    Method: POST
    body: 
        {
          "studno":<int>,
          "degree":<string>,
          "rec_units":<int>,
          "student_record": 
          {
            [
              "courseno":<string>,
              "grade":<string>,
              "units":<string>,
              "enrolled":<float>,
              "total":<double>,
              "term":<string>
            ], 
            .
            .
            .
            [
              "courseno":<string>,
              "grade":<string>,
              "units":<string>,
              "enrolled":<float>,
              "total":<double>,
              "term":<string>
            ]
          }
        }
*/


header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";

//connect to database
$con = mysqli_connect($host, $user, $password, $dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

// "I got this from details.php, credits to Zeit's work on handling preflight requests" - Ian; 
// "tenks Ian" - Allen
// for PREFLIGHT request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  return;
}

//decode JSON object from HTTP body
$data = json_decode(file_get_contents('php://input'));  //json_decode == json_parse

//[1] check studno...
//[1.1] if NULL
if(!isset($data->studno)) {
  $payload = array('msg' => "no student number provided; send as 'studno'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
$studno = $data->studno;
//[1.2] if valid format 
if(!preg_match("/^[1-9][0-9]{8}$/", $studno)) {
  $payload = array('msg' => "student number: '" . $studno . "' has invalid format; expected exactly 9 digits, with first digit being 1-9");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
//[1.3] if in the database
$sql = "SELECT student_number FROM student WHERE student_number = $studno";
$result = mysqli_query($con,$sql);
if(mysqli_num_rows($result)==1) {
  $payload = array('msg' => "error: student number: '" . $studno . "' is already taken");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}

//[2] check degree_program...
//[2.1] if NULL
if(!isset($data->degree)) {
  $payload = array('msg' => "no degree program provided; send as 'degree'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
$degree = $data->degree;
/**
 * TEMPORARY:
 * for now, student's Degree ID will be based off the a general degree found in the "degree_curriculum table" (those with an empty "major column"); 
 * will be updated once there is a properly defined basis for student's Degree ID
 */
$sql = "SELECT * FROM degree_curriculums WHERE degree_nickname = '$degree' AND major = '' AND old_new = 'New'";
$result = mysqli_query($con,$sql);
//[2.2] if in the database
if(mysqli_num_rows($result)==0) {
  $payload = array('msg' => "error: degree program: '" . $degree . "' does not exist");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}

$student_degree = mysqli_fetch_assoc($result);  //stores all information about the degree

//[3] check student record...
//[3.1] if not NULL
if(!isset($data->student_record)) {
  $payload = array('msg' => "no student record provided; send as 'student_record'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
$student_record = $data->student_record;    //stores the student's records to be evaluated

$degree_id = (int)$student_degree['degree_id'];                      //stores the student's degree id
$degree_program = $student_degree['degree_nickname'];
$old_new = $student_degree['old_new'];
$major = $student_degree['major'];
$options = $student_degree['options'];
$major_units_required = (int)$student_degree['major_units'];             //major units required based on degree id
$ge_units_required = (int)$student_degree['ge_electives_units'];          //ge units required based on degree id
$elective_units_required = (int)$student_degree['electives_units'];       //elective units required based on degree id
$hk11_required = 1;
$hk1213_required = 2;
$nstp1_required = 1;
$nstp2_required = 1;
$recommended_required = (int)$student_degree['recommended_units'];  //total unites required

$major_units_taken = 0;
$ge_units_taken = 0;
$elective_units_taken = 0;
$hk11_taken = 0;
$hk1213_taken = 0;
$nstp1_taken = 0;
$nstp2_taken = 0;
$total_units_taken = 0;


$complete = 0;
$error = 0;

$calculated_total = 0;  //stores summation of enrolled units; updated for every pass in each entry in the student record
/**
 * $response will contain all relevant details about the student's degree
 * and the validity of a student record and the fields inside a student_record
 */

$response = array(
  'studno' => $studno,
  'complete' => 0,
  'error' => 0,
  'degree_id' => $degree_id,
  'degree_program' => $degree_program,
  'old_new' => $old_new,
  'major' => $major,
  'options' => $options,
  'major_units_required' => $major_units_required,
  'ge_units_required' => $ge_units_required,
  'elective_units_required' => $elective_units_required,
  'hk11_required' => $hk11_required,
  'hk1213_required' => $hk1213_required,
  'nstp1_required' => $nstp1_required,
  'nstp2_required' => $nstp2_required,
  'recommended_required' => $recommended_required
);

$records_remarks = array();   //will contain all records that have been checked for validation and it's remarks, to be later inserted into $response
$passed_courses = array();
$passing_grade = array('1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.5', '2.75', '3.0');
$non_passing_grade = array('4.00', '5.00', 'INC', 'DRP', 'DFG');

function is_subject($con, $degree_id, $course, &$expected_units, &$subject_elective)
{
  $sql = "SELECT course_number, number_units, required_choice
            FROM subjects
            WHERE degree_id = $degree_id AND course_number = '$course'";

  $result = mysqli_query($con, $sql);

  if (mysqli_num_rows($result) == 1) {
    //if so, get the expected amount of units for this subject, and set subject_elective
    $result = mysqli_fetch_assoc($result);
    $expected_units = $result['number_units'];

    if ($result['required_choice'] == '') {  //if empty column 

      if ($result['course_number'] == "HK 11") $subject_elective = 0;
      else if (in_array($result['course_number'], array("HK 12", "HK 13"))) $subject_elective = 1;
      else if ($result['course_number'] == "NSTP 1") $subject_elective = 2;
      else if ($result['course_number'] == "NSTP 2") $subject_elective = 3;
      else $subject_elective = 4;
    } else if ($result['required_choice'] == 'Required') //if major
      $subject_elective = 5;
    else if ($result['required_choice'] == 'Other')    //if choice/other (?)
      $subject_elective = 6;
    return 1;
  }
  return 0;
}
function is_elective($con, $course, &$expected_units, &$subject_elective)
{
  $sql = "SELECT course_number, number_units, general_or_free
            FROM electives
            WHERE course_number = '$course'";

  $result = mysqli_query($con, $sql);

  if (mysqli_num_rows($result) == 1) {
    $result = mysqli_fetch_assoc($result);
    //if so, get the expected amount of units for this subject
    $expected_units = $result['number_units'];

    //and check if it is a general elective or free_elective
    if ($result['general_or_free'] == 'general')   //general elective
      $subject_elective = 7;
    else if ($result['general_or_free'] == 'Free') //free elective
      $subject_elective = 8;
    return 1;
  }
  return 0;
}

foreach ($student_record as $entry) {

  init: //intializations needed for verification

  $courseno = $entry->courseno;   //fields from entry
  $grade = $entry->grade;
  $units = $entry->units;
  $enrolled = $entry->enrolled;
  $total = $entry->total;
  $term = $entry->term;

  $valid_entry = 0;  //to know if this entry has valid values and format, and can be safely added to the database

  $subject_elective = NULL;
  /**
   * $subject_elective cases:
   *  checking subject table:
   *    0 => HK 11
   *    1 => HK 12/13
   *    2 => NSTP 1
   *    3 => NSTP 2
   *    4 => ''
   *    5 => 'Required'
   *    6 => 'Other
   *  checking elective table:
   *    7 => 'general'
   *    8 => 'free'
   */
  $expected_units = NULL;        //stores expected number of units once cross-referenced with either subjects or electives
  $passing = 0;

  $valid_grade = 0;           //set to 1/TRUE once field has been to checked to be correct and valid, default 0/FALSE
  $valid_units = 0;
  $valid_enrolled = 0;
  $valid_total = 0;
  $valid_term = 0;
  $calculated_enrolled = 0;           //stores value of grade * units; set 0

  //various error flags for entries, use as needed
  $duplicate = 0; //duplicate entry 
  $exceed = 0;     //units taken will exceed


  categorize: //program section that finds if a record is a subject/elective/hk/nstp
  //function calls pass by reference $expected_units and $subject_elective
  if (is_subject($con, $degree_id, $courseno, $expected_units, $subject_elective));  //check first if student record -> courseno is in subject with matching degree_id
  else if (is_elective($con, $courseno, $expected_units, $subject_elective));        //else check if it is in elective and also determine if it is general or free
  else {
    /**
     * TEMPORARY:
     * ELSE, if it not in either subject or elective, consider for now as a free elective
     * WILL be updated/removed once all electives are added in the database
     */
    $subject_elective = 8;
    $expected_units = $entry->units;
  }

  validity:  //program section where format and values are verified

  //units:
  if ($units == $expected_units)
    $valid_units = 1;
  else $error = 1;
  //grades:
  //if grade is passing
  if (in_array($grade, $passing_grade)) {
    $valid_grade = 1;
    $passing = 1;
    $calculated_enrolled = (float)$grade * (float)$units;  //stores value when grade and units are multiplied              
  }
  //else, if grade is non-passing
  else if (in_array($grade, $non_passing_grade))
    $valid_grade = 1;

  //else, grade is invalid
  else $error = 1;
  //enrolled: calculated $enrolled here should be equal to the value in the entry->enrolled AND should follow the format (either whole number or float with at most 2 decimal digits)
  if ($calculated_enrolled == (float)$enrolled && preg_match("/\b^[0-9]+(\.[0-9]{1,2}){0,1}$/", $enrolled))
    $valid_enrolled = 1;
  else $error = 1;

  $calculated_total += $calculated_enrolled;
  //running total: 
  if ($calculated_total == (float)$total && preg_match("/\b^[0-9]+(\.[0-9]{1,2}){0,1}$/", $total))
    $valid_total = 1;
  else $error = 1;

  //term: regex; to update: midyear case
  if (preg_match("/\bI{1,2}\/[0-9]{2}\/[0-9]{2}$/", $term))
    $valid_term = 1;
  else $error = 1;
  //student_record: check if all fields are valid


  $remarks = '';

  insertability:
  //if everything has been valid thus far

  if ($valid_grade && $valid_units && $valid_enrolled && $valid_total && $valid_term) {
    //firstly, check if recommended_required is about to be reached
    if (in_array($courseno, $passed_courses)) {
      $remarks .= "Duplicate: $courseno cannot be added to database\n";
      $duplicate = 1;
      $error = 1;
      goto compilation;
    }
    if (($total_units_taken + $units) > (float)$recommended_required) {
      $remarks .= "Exceed: $courseno cannot be added to database, will exceed total units required\n - total units taken: $total_units_taken\n - recommended units required: $recommended_required";
      $error = 1;
      goto compilation;
    }
    //secondly, check if subject is a majors/ge/elective and check if the taken units won't exceed yet
    switch ($subject_elective) {
      case 0:   //check if student already took HK 11
        if ($hk11_taken + 1 > $hk11_required) {
          $remarks .= "Exceed: HK 11 was already taken";
          $duplicate = 1;
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 1:   //
        if ($hk1213_taken + 1 > $hk1213_required) {
          $remarks .= "Exceed: HK 12/13 was already finished twice";
          $duplicate = 1;
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 2:   //
        if ($nstp1_taken + 1 > $nstp1_required) {
          $remarks .= "Exceed: NSTP 1 was already taken";
          $duplicate = 1;
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 3:   //
        if ($nstp2_taken + 1 > $nstp1_required) {
          $remarks .= "Exceed: NSTP 2 was already taken";
          $duplicate = 1;
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 5:   //check if majors units have exceeded
        if (($majors_taken + $units) > (float)$major_units_required) {
          $remarks .= "Exceed: $courseno cannot added to database, will exceed major units required\n - major units taken: $major_taken\n - major units required: $major_required";
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 7:   //check if ge units have exceeded
        if (($ge_units_taken + $units) > (float)$ge_units_required) {
          $remarks .= "Exceed: $courseno cannot added to database, will exceed ge units required\n - ge units taken: $ge_units_taken\n - ge units required: $ge_units_required";
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
      case 8:   //check if elective units have exceeded
        if (($elective_units_taken + $units) > (float)$elective_units_required) {
          $remarks .= "Exceed: $courseno cannot added to database, will exceed elective units required\n - elective units taken: $elective_units_taken\n - elective units required: $elective_units_required";
          $exceed = 1;
          $error = 1;
          goto compilation;
        }
        break;
    }

    $valid_entry = 1;
    $remarks .= "OK: $courseno can added to database\n";

    if ($passing) {
      switch ($subject_elective) {
        case 0:
          $hk11_taken++;
          break;
        case 1:
          $hk1213_taken++;
          break;
        case 2:
          $nstp1_taken++;
          break;
        case 3:
          $nstp2_taken++;
          break;

        case 5:
          $majors_taken += $units;
          $passed_courses[] = $courseno;
          break;

        case 7:
          $ge_units_taken += $units;
          $passed_courses[] = $courseno;
          break;
        case 8:
          $elective_units_taken += $units;
          $passed_courses[] = $courseno;
          break;
        case 4:
        case 6:
          $passed_courses[] = $courseno;
          break;
      }
      $total_units_taken += $units;
    }

  } else {
    $remarks .= "Error: $courseno not added to database, please double-check the following:\n";
    if (!$valid_grade)
      $remarks .= "- grade, $grade; unexpected value/format\n";
    if (!$valid_units)
      $remarks .= "- units: $units; expected: $expected_units\n";
    if (!$valid_enrolled)
      $remarks .= "- enrolled, $enrolled; expected: $calculated_enrolled;\n";
    if (!$valid_total)
      $remarks .= "- running total, $total; expected: $calculated_total\n";
    if (!$valid_term)
      $remarks .= "- term, $term; unexpected value/format\n";
  }

  compilation:  //after checking an entire entry, record in an array all details about it's validity and remarks
  //echo $remarks."\n";
  $records_remarks[] = array(
    'courseno' => $courseno,
    'remarks' => $remarks,
    'duplicate' => $duplicate,
    'exceed' => $exceed,
    'valid_entry' => $valid_entry,
    'valid_grade' => $valid_grade,
    'valid_units' => $valid_units,
    'valid_enrolled' => $valid_enrolled,
    'valid_total' => $valid_total,
    'valid_term' => $valid_term
  );
}

//final additions to the response
if (
  $major_units_taken == $major_units_required &&
  $ge_units_taken == $ge_units_required &&
  $elective_units_taken == $elective_units_required &&
  $hk11_taken == $hk11_required &&
  $hk1213_taken == $hk1213_required &&
  $nstp1_taken == $nstp1_required &&
  $nstp2_taken == $nstp2_required
) {
  $response['complete'] = 1;
}
$response['error'] = $error;
$response['major_units_taken'] = $major_units_taken;
$response['ge_units_taken'] = $ge_units_taken;
$response['elective_units_taken'] = $elective_units_taken;
$response['hk11_taken'] = $hk11_taken;
$response['hk1213_taken'] = $hk1213_taken;
$response['nstp1_taken'] = $nstp1_taken;
$response['nstp2_taken'] = $nstp2_taken;
$response['total_units_taken'] = $total_units_taken;
$response['gwa'] = (float)$calculated_total / (float)$total_units_taken;
$response['records_remarks'] = $records_remarks;


//print_r($response); //uncomment to see a pretty/cleaner version of what the response looks like :>
echo json_encode($response);

close:
$con->close();
