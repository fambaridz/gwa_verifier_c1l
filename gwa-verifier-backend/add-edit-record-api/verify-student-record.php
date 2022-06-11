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
            ...
            ...
            ...
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

function string_contains($haystack, $needle) { //accomodate php 7 below that can't use str_contains()
  return $needle !== '' && mb_strpos($haystack, $needle) !== false;
}


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
functions:
function categorize($con, $course, $general_degree_id, $specialized_degree_id, &$expected_units, $major_units_required)
{ // function returns int; categorizes courses between non-majors (additionally HK, NSTP), majors, electives (ge or free)
  /**
   * $subject_elective cases:
   *  checking subject table:
   *    0 => HK 11
   *    1 => HK 12/13
   *    2 => NSTP 1
   *    3 => NSTP 2
   *    4 => Non-major
   *    5 => Major
   *  checking elective table:
   *    6 => 'general'
   *    7 => 'free'
   *    8 => 190
   *    9 => 200
   */
  non_majors:   //check under general degree
  //echo "checking if non-major\n";
  // $sql = "SELECT course_number, number_units, required_choice
  //         FROM subjects
  //         WHERE degree_id = $general_degree_id AND course_number = '$course'";

  // $result = mysqli_query($con, $sql);

  $sql = "SELECT course_number, number_units, required_choice
          FROM subjects
          WHERE degree_id = ? AND course_number = ?";
  
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "ss", $general_degree_id, $course);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) == 1) {

    $result = mysqli_fetch_assoc($result);
    $expected_units = $result['number_units'];
    //echo "expected units: $expected_units\n";
    if ($result['course_number'] == "HK 11") return 0;
    else if (in_array($result['course_number'], array("HK 12", "HK 13"))) return 1;
    else if ($result['course_number'] == "NSTP 1") return 2;
    else if ($result['course_number'] == "NSTP 2") return 3;
    else if(preg_match("/ 190/", $result['course_number'])) return 8;
    else if(preg_match("/ 200/", $result['course_number'])) return 9;
    else return 4; //normal course to take
  }

  majors: //check specialized degree_id; if major units neeeded for this degree is 0, skip
  
  if ($specialized_degree_id != $general_degree_id){
    //echo "checking if major\n";
    // $sql = "SELECT course_number, number_units, required_choice
    //         FROM subjects
    //         WHERE degree_id = $specialized_degree_id AND course_number = '$course'";

    // $result = mysqli_query($con, $sql);
    $sql = "SELECT course_number, number_units, required_choice
            FROM subjects
            WHERE degree_id = ? AND course_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $specialized_degree_id, $course);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) == 1) {

      $result = mysqli_fetch_assoc($result);
      $expected_units = $result['number_units'];
      //echo "expected units: $expected_units\n";
      //echo "IF 190/200 SUBJECT\N";
      if(preg_match("/ 190/", $result['course_number'])) return 8;
      if(preg_match("/ 200/", $result['course_number'])) return 9;
      return 5; //is a major
    }
  }

  electives: //lastly, check if elective
  //echo "checking if elective\n";
  // $sql = "SELECT course_number, number_units, general_or_free
  //         FROM electives
  //         WHERE course_number = '$course'";

  // $result = mysqli_query($con, $sql);
  $sql = "SELECT course_number, number_units, general_or_free
          FROM electives
          WHERE course_number = ?";
  
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "s", $course);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) == 1) {
    $result = mysqli_fetch_assoc($result);
    $expected_units = $result['number_units'];
    //echo "expected units: $expected_units\n";
    //check if it is a general elective or free_elective
    if ($result['general_or_free'] == 'general')   return 6;  //general elective
    else if ($result['general_or_free'] == 'Free') return 7;  //free elective

  }

  catch_all: //assumed free elective, find in the database if it exists first

  $sql = "SELECT course_number, number_units, required_choice
          FROM subjects
          WHERE course_number = ?";
  
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "s", $course);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) > 0) {
    $result = mysqli_fetch_assoc($result);
    $expected_units = $result['number_units'];
    //echo "expected units: $expected_units\n";
    
    return 7;  //free elective

  }

  //echo "catch all\n";
  $expected_units = 3;  //need confirmation if 3
  //echo "expected units: $expected_units\n";
  return 7;
}
function getDegreeIds($degree_nickname, $studno, $student_record, $con, &$general_degree_id)
{ // function returns int; finds the specific degree id of the student based on the passed student record; if no specialization is found, it is the "general" degree by default
  // thank u xyrk and francis <3 - Allen

  // check if it needs new or old curriculum
  // truncate the studno
  $truncatedStudno = (int)substr($studno, 0, -5);
  // Commented out by Ian Salazar
  // $old_new;
  $old_new = $truncatedStudno > 2017 ? "new" : "old";

  // check if option of a student is thesis or SP
  $options = "Thesis";
  foreach ($student_record as $entry) {
    if (string_contains($entry->courseno, '190')) {
      $options = "SP";
      break;
    }
  }
  //echo "option: $options\n";

  //get the general degree_id, to be used for non-major subjects
  // $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = '$degree_nickname' AND old_new = '$old_new' AND major = '' AND options = ''";
  // $result = mysqli_query($con, $sql);
  $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = ? AND old_new = ? AND major = '' AND options = ''";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "ss", $degree_nickname, $old_new);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  $row = mysqli_fetch_assoc($result);
  //echo $row['degree_id'];
  $general_degree_id = $row['degree_id'];
  //echo "g id: $general_degree_id\n";
  // get all degree IDs with the specific nickname
  // sql query for all degrees that has degree nickname
  // init for local variable declaration
  $sql = 0;
  // get the major degree_id
  if ($options == "Thesis") {
    // $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = '$degree_nickname' AND old_new = '$old_new' AND options IN('', 'Thesis') AND degree_id != $general_degree_id ";
    $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = ? AND old_new = ? AND options IN('', 'Thesis') AND degree_id != ? ";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $degree_nickname, $old_new, $general_degree_id);
    mysqli_stmt_execute($stmt);
  } else {
    // $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = '$degree_nickname' AND old_new = '$old_new' AND options = 'SP' AND degree_id != $general_degree_id ";
    $sql = "SELECT degree_id FROM degree_curriculums WHERE degree_nickname = ? AND old_new = ? AND options = 'SP' AND degree_id != ? ";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $degree_nickname, $old_new, $general_degree_id);
    mysqli_stmt_execute($stmt);
  }
  // $result = mysqli_query($con, $sql);
  $result = mysqli_stmt_get_result($stmt);

  $degree_id_results = array();     //hold the degree_ids

  //get the degree_id results from the query
  while ($row = mysqli_fetch_assoc($result)) {
    $degree_id_results[] = $row['degree_id'];
    //echo $degree_id_results[0];
  }
  //echo "degree id results: \n";
  //print_r($degree_id_results);
  // If the result is empty then there is no major
  if (!count($degree_id_results)) {
    //set the specialization as general
    //echo "s id: $general_degree_id\n";
    return $general_degree_id;
  }else if (count($degree_id_results) == 1) {
    //echo "s id: $degree_id_results[0]\n";
    return $degree_id_results[0];
  }


  //for every subject in student record
  foreach ($student_record as $subj) {

    // get degree_id from subjects
    // $sql = "SELECT degree_id FROM subjects WHERE course_number = '$subj->courseno'";
    // $result = mysqli_query($con, $sql);
    $sql = "SELECT degree_id FROM subjects WHERE course_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $subj->courseno);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    //for every degree_id from result
    while ($row = mysqli_fetch_assoc($result)) {

      //check if in array
      if (in_array($row['degree_id'], $degree_id_results)) {
        //echo $row['degree_id'];

        //return general degree_id when found
        //echo "s id: ".$row['degree_id']."\n";
        return $row['degree_id'];
      }
    }
  }

  //echo if there are no subjects with degree_ids equal to degree_id_results array;
  echo "Cannot detect major due to incomplete subjects";
}
function getDegree($degree_id, $con)
{ // function returns array; retrieves all degree details given the specialized degree id
  // $sql = "SELECT * FROM degree_curriculums WHERE degree_id = $degree_id";
  // $result = mysqli_query($con, $sql);
  $sql = "SELECT * FROM degree_curriculums WHERE degree_id = ?";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "s", $degree_id);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  return mysqli_fetch_assoc($result);
}
function check_units_190_200(&$units, $expected_units, $running_units, $grade, $passing, $non_passing) 
{ //returns int, if valid units for 190/200
  if (in_array($grade, array('S','U')) && $running_units + $units <= $expected_units) return 1;
  else if($running_units == $expected_units && strcmp($units, '(1)'.$expected_units) == 0) {
    if (in_array($grade, $passing) || in_array($grade, $non_passing)) {
      $units = $expected_units;
      return 1;
    }
  }

  return 0;
}

//decode JSON object from HTTP body
$data = json_decode(file_get_contents('php://input'));  //json_decode == json_parse

//[1] check studno...
//[1.1] if NULL
if (!isset($data->studno)) {
  $payload = array('msg' => "no student number provided; send as 'studno'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
$studno = $data->studno;
//[1.2] if valid format 
if (!preg_match("/^[1-9][0-9]{8}$/", $studno)) {
  $payload = array('msg' => "student number: '" . $studno . "' has invalid format; expected exactly 9 digits, with first digit being 1-9");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
//[1.3] if in the database
/*
-Commented out by Ian Salazar since in Francis's API it already checks if the student number is already taken
- Also, since this API will be used by edit-student record page, it's counterintuitive to return a "DUPLICATE RESOURCE" error for student number if we're just going to update a student record

$sql = "SELECT student_number FROM student WHERE student_number = $studno";
$result = mysqli_query($con,$sql);
if(mysqli_num_rows($result)==1) {
  $payload = array('msg' => "error: student number: '" . $studno . "' is already taken");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
*/

//[2] check degree_program...
//[2.1] if NULL
if (!isset($data->degree)) {
  $payload = array('msg' => "no degree program provided; send as 'degree'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}
$degree = $data->degree;

// $sql = "SELECT * FROM degree_curriculums WHERE degree_nickname = '$degree'";
// $result = mysqli_query($con, $sql);
$sql = "SELECT * FROM degree_curriculums WHERE degree_nickname = ?";
$stmt = mysqli_stmt_init($con);
mysqli_stmt_prepare($stmt, $sql);
mysqli_stmt_bind_param($stmt, "s", $degree);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

//[2.2] if in the database
if (mysqli_num_rows($result) == 0) {
  $payload = array('msg' => "error: degree program: '" . $degree . "' does not exist");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}

//[3] check student record...
//[3.1] if not NULL
if (!isset($data->student_record)) {
  $payload = array('msg' => "no student record provided; send as 'student_record'");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}

$student_record = $data->student_record;
$general_degree_id;     //for non-majors verification
$specialized_degree_id = getDegreeIds($degree, $studno, $student_record, $con, $general_degree_id); //for majors verification

$student_degree = getDegree($specialized_degree_id, $con);  //array that contains all relevant information regarding the degree program
//echo "degree id: $specialized_degree_id\n";

//each element in the array to be put into their own variables
$degree_program = $student_degree['degree_nickname'];
$old_new = $student_degree['old_new'];
$major = $student_degree['major'];
$options = $student_degree['options'];
$major_units_required = (int)$student_degree['major_units'];              
$ge_units_required = (int)$student_degree['ge_electives_units'];          
$elective_units_required = (int)$student_degree['electives_units'];       
$hk11_required = 1;
$hk1213_required = 3;
$nstp1_required = 1;
$nstp2_required = 1;
$recommended_required = (int)$student_degree['recommended_units'];  
//counters for units taken
$major_units_taken = 0;
$ge_units_taken = 0;
$elective_units_taken = 0;
$hk11_taken = 0;
$hk1213_taken = 0;
$nstp1_taken = 0;
$nstp2_taken = 0;
$total_units_taken = 0;
$course190 = 0; //taken units for course 190
$course200 = 0; //taken units for course 200
//status of student record if it is complete/error found; 0 for false, 1 for true
$complete = 0;
$error = 0;

$calculated_running_total = 0;  //stores summation of enrolled units; updated for every pass in each entry in the student record
$verified_running_total = 0;    //summation of VALID enrolled units, only added if entry is valid
/**
 * $response will contain all relevant details about the student's degree
 * and the validity of a student record and the fields inside a student_record
 */

$response = array(
  'studno' => $studno,
  'complete' => 0,
  'error' => 0,
  'degree_id' => $specialized_degree_id,
  'general_degree_id' => $general_degree_id,
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
//print_r($response);

$records_remarks = array();   // will contain all records that have been checked for validation and it's remarks, to be later inserted into $response
$passed_courses = array();    // contains courses that have a passing grade; used to make sure a student doesn't take the same course when it was already taken
$taken_per_term = array();    // will contain elements of "term" -> array("courseno1", "courseno2", ...); to make sure the student didn't take the same course again in the same semester
$passing_grade = array('1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.5', '2.75', '3.0', 'P', 'S');
$non_passing_grade = array('4.00', '5.00', 'INC', 'DRP', 'DFG', 'U');

foreach ($student_record as $entry) {

  init: //intializations needed for verification
  //fields from entry
  $courseno = $entry->courseno;   
  $grade = $entry->grade;
  $units = $entry->units;
  $enrolled = $entry->enrolled;
  $total = $entry->total;
  $term = $entry->term;
  /*echo "courseno: $courseno
        grade: $grade
        units: $units
        enrolled: $enrolled
        total: $total
        enrolled: $enrolled
        term: $term\n";*/
  //$valid_entry = 0;  //to know if this entry has valid values and format
  $entry_error = 0;
  $subject_elective = NULL;
  /**
   * $subject_elective cases:
   *  checking subject table:
   *    0 => HK 11
   *    1 => HK 12/13
   *    2 => NSTP 1
   *    3 => NSTP 2
   *    4 => Non-major
   *    5 => Major
   *  checking elective table:
   *    6 => 'general'
   *    7 => 'free'
   *    8 => 190
   *    9 => 200
   */
  $expected_units = NULL;        //stores expected number of units once cross-referenced with either subjects or electives
  $passing = 0;

  $valid_grade = 0;              //set to 1/TRUE once field has been to checked to be correct and valid, default 0/FALSE
  $valid_units = 0;
  $valid_enrolled = 0;
  $valid_total = 0;
  $valid_term = 0;
  $calculated_enrolled = 0;           //stores value of grade * units; set 0

  //various error flags for entries, use as needed
  $duplicate = 0;  //duplicate entry 
  $exceed = 0;     //units taken will exceed
  $remarks = '';   //reinitialize remarks to an empty string, concatinate later remarks about this entry

  check_if_duplicate: //check if this course has already been passed
    if (in_array($courseno, $passed_courses)) {
      $remarks .= "Duplicate: $courseno cannot be added to database, student already passed this course\n";
      $duplicate = 1;
      $error = 1;
      $entry_error = 1;
      goto compilation;
    }

  taken_this_term: //check if this course was already taken this term
  if (isset($taken_per_term[$term]) && in_array($courseno, $taken_per_term[$term])) {
    $remarks .= "Duplicate: $courseno was already taken for this term $term\n";
    $duplicate = 1;
    $error = 1;
    $entry_error = 1;
    goto compilation;
  }
  else $taken_per_term[$term][] = $courseno;

  categorize: //program section that finds if a record is a subject/elective/hk/nstp
  //function calls pass by reference $expected_units, will return subject_elective
  $subject_elective = categorize($con, $courseno, $general_degree_id, $specialized_degree_id, $expected_units, $major_units_required);

  valid_format_values:  //program section where format and values of each field in the entry are verified
  units:
  if ($subject_elective == 8) $valid_units = check_units_190_200($units, $expected_units, $course190, $grade, $passing_grade, $non_passing_grade);
  else if ($subject_elective == 9) $valid_units = check_units_190_200($units, $expected_units, $course200, $grade, $passing_grade, $non_passing_grade);
  else if ($units == $expected_units) $valid_units = 1;
  if ($valid_units == 0) {
    $error = 1;
    $entry_error = 1;
  }
  
  grades:
  //if grade is passing
  if (in_array($grade, $passing_grade)) {
    $valid_grade = 1;
    $passing = 1;
    if ($valid_units && strcmp($grade, "P") != 0) //only calculate if units are valid AND grade is numerical
       $calculated_enrolled = (float)$grade * (float)$units;     
          
  }
  //else, if grade is non-passing
  else if (in_array($grade, $non_passing_grade)) $valid_grade = 1;
  //else, 190 or 200 with grade of S/U
  else if (($subject_elective == 8 || $subject_elective == 9) && in_array($grade, array('S','U'))) $valid_grade = 1;
  //else, grade is invalid
  else {
    $error = 1;
    $entry_error = 1;
  }

  
  enrolled: //$calculated_enrolled here should be equal to the value in the entry->enrolled AND should follow the format (either whole number or float with at most 2 decimal digits)
  if ($calculated_enrolled == (float)$enrolled && preg_match("/\b^[0-9]+(\.[0-9]{1,2}){0,1}$/", $enrolled)) $valid_enrolled = 1;
  else {
    $error = 1;
    $entry_error = 1;
  }

  running_total:
  $calculated_running_total += $calculated_enrolled;
  if ($calculated_running_total == (float)$total && preg_match("/\b^[0-9]+(\.[0-9]{1,2}){0,1}$/", $total)) $valid_total = 1;
  else {
    $error = 1;
    $entry_error = 1;
  }

  term: // to update: over/underload
  if (preg_match("/\b(I{1,2}|M)\/[0-9]{2}\/[0-9]{2}$/", $term)) $valid_term = 1;
  else {
    $error = 1;
    $entry_error = 1;
  }

  insertability: //if everything has been valid thus far
  if ($valid_grade && $valid_units && $valid_enrolled && $valid_total && $valid_term) {
    
    //check_if_passing:
    if($passing) {
      //if grade of P
      if (strcmp($grade, 'P') == 0) {
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
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            $passed_courses[] = $courseno;
            break;
        }
        $recommended_required -= $units; //reduce units required
      }
     //else, a numerical grade
      else {
        //check_if_exceed:  has to be numerical passing grade to check if it will exceed
        switch ($subject_elective) {
          case 0:
            if ($hk11_taken + 1 > $hk11_required) {
              $remarks .= "Exceed: HK 11 was already taken\n";
              $duplicate = 1;
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $hk11_taken++;
            break;
          case 1:
            if ($hk1213_taken + 1 > $hk1213_required) {
              $remarks .= "Exceed: HK 12/13 was already finished thrice\n";
              $duplicate = 1;
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $hk1213_taken++;
            break;
          case 2:
            if ($nstp1_taken + 1 > $nstp1_required) {
              $remarks .= "Exceed: NSTP 1 was already taken\n";
              $duplicate = 1;
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $nstp1_taken++;
            break;
          case 3:
            if ($nstp2_taken + 1 > $nstp1_required) {
              $remarks .= "Exceed: NSTP 2 was already taken\n";
              $duplicate = 1;
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $nstp2_taken++;
            break;
          case 4:
            $passed_courses[] = $courseno;
            break;
          case 5:
            $major_units_taken += $units;
            $passed_courses[] = $courseno;
            break;
          case 6:
            if ($ge_units_taken + (int)$units > (float)$ge_units_required) {
              $remarks .= "Exceed: $courseno cannot added to database, will exceed ge units required\n - ge units taken: $ge_units_taken\n - ge units required: $ge_units_required\n";
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $ge_units_taken += $units;
            $passed_courses[] = $courseno;
            break;
          case 7:
            if ($elective_units_taken + (int)$units > (float)$elective_units_required) {
              $remarks .= "Exceed: $courseno cannot added to database, will exceed free elective units required\n - free elective units taken: $elective_units_taken\n - free elective units required: $elective_units_required\n";
              $exceed = 1;
              $error = 1;
              $entry_error = 1;
              goto compilation;
            }
            $elective_units_taken += $units;
            $passed_courses[] = $courseno;
            break;
          case 8:
            if(strcmp($grade, 'S') == 0) $course190 += $units;
            else {
              $major_units_taken += $units;
              $passed_courses[] = $courseno;
            }
            //echo "course190 = $course190\n";
            break;
          case 9:
            if(strcmp($grade, 'S') == 0) $course200 += $units;
            else {
              $major_units_taken += $units;
              $passed_courses[] = $courseno;
            }
            //echo "course200 = $course200\n";
            break;
        }
        $verified_running_total += $enrolled;
        $total_units_taken += $units;
      } 
    }
    $remarks .= "OK: $courseno can added to database\n";
    $valid_entry = 1;
  } 
  else {
    //prevent further verifying if an early entry will result to inconsistencies later on in the record 
    if ($total_units_taken == 0 && !in_array($subject_elective, array(0, 1, 2, 3))) {
      $msg = "stopping verification early because of an inconsistency found in $courseno, please make sure the following are correct:";
      if (!$valid_grade)
        $msg .= " grade: $grade; unexpected value/format;";
      if (!$valid_units)
        $msg .= " units: $units; expected: $expected_units;";
      if (!$valid_enrolled)
        $msg .= " enrolled: $enrolled; expected: $calculated_enrolled;";
      if (!$valid_total)
        $msg .= " running total: $total; expected: $calculated_running_total;";
      if (!$valid_term)
        $msg .= " term: $term; unexpected value/format;";
      $msg .= " continuing verification will result in total units taken of 0. notice: total units taken will only start adding if (1) entry has valid formatting and values, (2) the entry has a passing grade, (3) the entry has non-zero units";
      $payload = array('msg' => $msg);
      //hoo boy that is a long boi
      header('Content-type: application/json');
      http_response_code(400);
      echo json_encode($payload);
      goto close;
    }

    $remarks .= "Error: $courseno cannot be added to database, please double-check the following:\n";
    if (!$valid_grade)
      $remarks .= "- grade, $grade; unexpected value/format of grade\n";
    if (!$valid_units)
      $remarks .= "- units: $units; expected units: $expected_units\n";
    if (!$valid_enrolled)
      $remarks .= "- enrolled, $enrolled; expected enrolled: $calculated_enrolled;\n";
    if (!$valid_total)
      $remarks .= "- running total, $total; expected total: $calculated_running_total\n";
    if (!$valid_term)
      $remarks .= "- term, $term; unexpected value/format of term\n";
    
  }

  compilation:  //after checking an entire entry, record in an array all details about it's validity and remarks
  //echo "$courseno checked! subject_elective = $subject_elective\n"; //uncomment to see what courses have been checked
  //echo $remarks;
  //if($entry_error) echo $remarks;
  $records_remarks[] = array(
    'courseno' => $courseno,
    'error'=> $entry_error,
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

//for the case only valid entries with 0 units are checked
if ($total_units_taken == 0) {
  $payload = array('msg' => "error: total units taken is 0, cannot calculate gwa");
  header('Content-type: application/json');
  http_response_code(400);
  echo json_encode($payload);
  goto close;
}

//echo "taken: $total_units_taken; total: $verified_running_total; GWA: " .(float)$verified_running_total / (float)$total_units_taken ."\n";
//final additions to the response
if (
  $total_units_taken >= $recommended_required &&
  $major_units_taken >= $major_units_required && //majors can exceed
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
//notice: total_units_taken will only contain units from entries that are VALID AND PASSING
$response['gwa'] = (float)$verified_running_total / (float)$total_units_taken;
$response['records_remarks'] = $records_remarks;
//$response['courses_taken_per_term'] = $taken_per_term;

//print_r($response); //uncomment to see a pretty/cleaner version of what the response looks like :>
echo json_encode($response);

close:
$con->close();
