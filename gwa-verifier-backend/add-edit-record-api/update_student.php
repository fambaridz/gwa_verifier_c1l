<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include '../activity-log-api/activity_log.php';


// sample json data 
// note that there should be an entry of this in database for testing
// {
// 	"old_stud_no": "200001234",
// 	"new_stud_no": "201901234",
// 	"lname": "TEST",
// 	"fname": "HELLO",
// 	"mname": "WORLD",
// 	"degree": "BSCS",
// 	"suffix": null,
// 	"recommended_number_units": "150",
// 	"credited_units": "150",
// 	"gwa": "1.99",
// 	"status": "qualified"
// }


// constants
$DEFAULT_STATUS = 'INCOMPLETE';
$SUCCESS_RESPONSE = 200;


$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";

//connect to database
$con = mysqli_connect($host, $user, $password, $dbname);

//failed to connect
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  return;
}

// decode the message body
$data = json_decode(file_get_contents('php://input'), True);  //json_decode == json_parse

// for testing data
// echo($data);

// variable assignment of each data in the body
$old_stud_no = isset($data['old_stud_no']) ? (int)($data['old_stud_no']) : 0;
$new_stud_no = isset($data['new_stud_no']) ? (int)($data['new_stud_no']) : 0;
$lName = isset($data['lname']) ? $data['lname'] : 0;
$fName = isset($data['fname']) ? $data['fname'] : 0;
$mName = isset($data['mname']) ? $data['mname'] : 0;
$suffix = isset($data['suffix']) ? $data['suffix'] : 0;
$degree = isset($data['degree']) ? $data['degree'] : 0;
$recommendedUnits = isset($data['rec_units']) ? $data['rec_units'] : 0;
$creditedUnits = isset($data['cred_units']) ? $data['cred_units'] : 0;
$gwa = isset($data['gwa']) ? (float)($data['gwa']) : 0;
$status = isset($data['status']) ? $data['status'] : $DEFAULT_STATUS;


// check if the new student number already exists in the database
// I believe this is redundant code, you already have a function to check if the a student number already exists
// function check_studno_if_already_exist($old_stud_no, $new_stud_no, $con)
// {

//   // if there's no change with the stud no
//   if ($new_stud_no == $old_stud_no) {
//     return False;
//   }

//   // query
//   $sql = "SELECT student_number FROM student WHERE student_number=$new_stud_no";
//   $result = mysqli_query($con, $sql);

//   //if existing
//   if (mysqli_num_rows($result) >= 1) {
//     return True;
//   }
//   return False;
// }

// checks if the student data is already in the database
function check_studno_if_exist($stud_no, $con)
{

  // query the student number
  // $sql = "SELECT student_number FROM student WHERE student_number=$stud_no";
  // $result = mysqli_query($con, $sql);
  $sql = "SELECT student_number FROM student WHERE student_number=?";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "i", $stud_no);
  mysqli_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) >= 1) {
    return True;
  }
  return False;
}


//checks if degree exists in degree_curriculums table
function check_degree_if_exist($degree, $con)
{

  // $sql = "SELECT degree_nickname FROM degree_curriculums WHERE degree_nickname='$degree'";
  // $result = mysqli_query($con, $sql);
  $sql = "SELECT degree_nickname FROM degree_curriculums WHERE degree_nickname=?";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "s", $degree);
  mysqli_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  //if existing
  if (mysqli_num_rows($result) >= 1) {
    return True;
  }
  return False;
}

// check if there's a comment for a studno
function check_studno_in_comments($studno, $con)
{

  // $sql = "SELECT * FROM committee_student WHERE student_number='$studno'";
  // $result = mysqli_query($con, $sql);
  $sql = "SELECT * FROM committee_student WHERE student_number=?";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "i", $studno);
  mysqli_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  

  //if existing
  if (mysqli_num_rows($result) >= 1) {
    return True;
  }
  return False;
}



// Refactored logic so that the nesting is up to 1-2 levels only
if (!check_studno_if_exist($old_stud_no, $con)) {
  http_response_code(404);
  $data = [
    "msg" => 'The old student number does not exist in the database'
  ];
  echo json_encode($data);
  return;
}

if ($old_stud_no != $new_stud_no && check_studno_if_exist($new_stud_no, $con)) {
  http_response_code(409);
  $data = [
    "msg" => "The new student number already exists"
  ];
  echo json_encode($data);
  return;
}
if (!check_degree_if_exist($degree, $con)) {
  http_response_code(404);
  $data = [
    "msg" => "Degree does not exist"
  ];
  echo json_encode($data);
  return;
}

// $sql = "UPDATE student 
//                 SET student_number = '$new_stud_no', lastname = '$lName', firstname = '$fName', 
//                 middlename = '$mName', suffix = '$suffix', degree_program = '$degree', recommended_number_units	 = '$recommendedUnits', 
//                 credited_units = '$creditedUnits', gwa = '$gwa', status = '$status'
//                 WHERE student_number = $old_stud_no;
//                 ";
$sql = "UPDATE student 
                SET student_number = '$new_stud_no', lastname = '$lName', firstname = '$fName', 
                middlename = '$mName', suffix = '$suffix', degree_program = '$degree', recommended_number_units	 = '$recommendedUnits', 
                credited_units = '$creditedUnits', gwa = '$gwa', status = '$status'
                WHERE student_number = $old_stud_no;
                ";

$stmt = mysqli_stmt_init($con);
mysqli_stmt_prepare($stmt, $sql);
mysqli_stmt_bind_param($stmt, "isssssiidsi", $new_stud_no, $lName, $fName, $mName, $suffix, $degree, $recommendedUnits, $creditedUnits, $gwa, $status, $old_stud_no);
mysqli_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// run SQL statement
// $result = mysqli_query($con, $sql);


// cascading of the studno value incase of a change in the current value of studno in student table
if ($new_stud_no != $old_stud_no) {
  // query for update of the student number in the student_record
  // $updateStudentNumberInStudRecord = "UPDATE student_record 
  //                                 SET student_number = '$new_stud_no'
  //                                 WHERE student_number = $old_stud_no;
  //                                 ";

  // $updateStudentRecord = mysqli_query($con, $updateStudentNumberInStudRecord);
  $updateStudentNumberInStudRecord = "UPDATE student_record 
                                   SET student_number = '$new_stud_no'
                                   WHERE student_number = $old_stud_no;
                                   ";
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $updateStudentNumberInStudRecord);
  mysqli_stmt_bind_param($stmt, "ii", $new_stud_no, $old_stud_no);
  mysqli_execute($stmt);
  $updateStudentRecord = mysqli_stmt_get_result($stmt);

  if (!$updateStudentRecord) {
    http_response_code(500);
    $data = [
      "msg" => "Server error: failure to update student number in student record"
    ];
    echo json_encode($data);
    // echo "Failure to update student number in student record";
  }

  // check if there's a comment for this student
  if (check_studno_in_comments($old_stud_no, $con)) {

    // query for update of the studno in committee_student table
    // $updateStudentNumberInCommmStud = "UPDATE committee_student 
    //                                           SET student_number = '$new_stud_no'
    //                                           WHERE student_number = $old_stud_no;
    //                                           ";
    // $updateCommitteStudent = mysqli_query($con, $updateStudentNumberInCommmStud);
    $updateStudentNumberInCommmStud = "UPDATE committee_student 
                                              SET student_number = '$new_stud_no'
                                              WHERE student_number = $old_stud_no;
                                              ";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $updateStudentNumberInCommmStud);
    mysqli_stmt_bind_param($stmt, "ii", $new_stud_no, $old_stud_no);
    mysqli_execute($stmt);
    $updateCommitteStudent = mysqli_stmt_get_result($stmt);

    if (!$updateCommitteStudent) {
      http_response_code(500);
      // echo "Failure to update student number in committee student table";
      $data = [
        "msg" => "Server error: failure to update student number in committee student table"
      ];
      echo json_encode($data);
    }
  }
}


if (!$result) {
  http_response_code(400);
  $data = [
    "msg" => "Update unsuccesful"
  ];
  echo json_encode($data);
} else {
  insertActivityLog($data['email'], "Update student", $new_stud_no, $con);
  $data = [
    "msg" => "Update successful"
  ];
  http_response_code();
  echo json_encode($data);
}

$con->close();
