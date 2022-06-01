<?php
// Author: Tomboc, Ma. Zeit Elizha

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db";
include '../activity-log-api/activity_log.php';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];

// for DELETE method
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  return;
}

$body = json_decode(file_get_contents('php://input'));
// expected body contents and methods:
// { action: 'get-student', student_number: this.state.student_number }, METHOD: POST
// { action: 'get-courses', student_number: this.state.student_number }, METHOD: POST
// { action: 'get-comments', student_number: this.state.student_number }, METHOD: POST
// { action: 'status-change', student_number: this.state.student_number,  prevStatus: this.state.status, newStatus: value}, METHOD: POST
// { action: 'delete-record', student_number: this.state.student_number}, METHOD: DELETE
// { action: 'record-per-semester', term: term}, METHOD: POST

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
// create and execute queries based on $body->action
switch ($body->action) {
  case 'get-student':
    // gets the student's details
    // $sql = "SELECT * FROM student WHERE student_number = '$body->student_number'";
    // $result = mysqli_query($con,$sql);
    $sql = "SELECT * FROM student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result2 = True;
    $result3 = True;
    break;
  case 'get-courses':
    // gets the courses and course details of a student record
    // $sql = "SELECT id, course_number, grade, units, enrolled, running_total, term FROM student_record WHERE student_number = '$body->student_number'";
    // $result = mysqli_query($con,$sql);
    $sql = "SELECT id, course_number, grade, units, enrolled, running_total, term FROM student_record WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result2 = True;
    $result3 = True;
    break;
  case 'get-comments':
    // gets the comments from committees for a student record
    // $sql = "SELECT committee_email, comments FROM committee_student WHERE student_number = '$body->student_number'";
    // $result = mysqli_query($con,$sql);
    $sql = "SELECT committee_email, comments FROM committee_student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result2 = True;
    $result3 = True;
    break;
  case 'delete-record':
    // deletes a student record
    insertActivityLog($body->email, "Deleted record ", $body->student_number, $con);
    // $sql = "DELETE FROM student_record WHERE student_number = '$body->student_number'; DELETE FROM student WHERE student_number = '$body->student_number'; DELETE FROM committee_student WHERE student_number = '$body->student_number'";
    // $result = mysqli_multi_query($con,$sql);
    $sql = "DELETE FROM student_record WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $sql2 = "DELETE FROM student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result2 = mysqli_stmt_get_result($stmt);

    $sql3 = "DELETE FROM committee_student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result3 = mysqli_stmt_get_result($stmt);

    break;
  case 'status-change':
    // changes the status of a student record
    // valid status changes: UNCHECKED <-> PENDING <-> SATISFACTORY or UNSATISFACTORY
    if(
      ($body->prevStatus == "UNCHECKED" and $body->newStatus == "PENDING") or
      ($body->prevStatus == "SATISFACTORY" and $body->newStatus != "UNCHECKED") or
      ($body->prevStatus == "UNSATISFACTORY" and $body->newStatus != "UNCHECKED") or
      ($body->prevStatus == "PENDING")
      ) {
        // $sql = "UPDATE student SET status = '$body->newStatus' WHERE student.student_number = '$body->student_number'"; 
        // $result = mysqli_query($con,$sql);
        $sql = "UPDATE student SET status = ? WHERE student.student_number = ?";
        $stmt = mysqli_stmt_init($con);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $body->newStatus, $body->student_number);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $result2 = True;
        $result3 = True;
    } else {
      exit(json_encode("Invalid status"));
    }
    break;
  
  //added by: Francis Bejosano
  case 'record-per-semester':
    // $sql = "SELECT * FROM student_record WHERE term = '$body->term'";
    // $result = mysqli_multi_query($con,$sql);
    $sql = "SELECT * FROM student_record WHERE term = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->term);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $result2 = True;
    $result3 = True;
    break;
}
 
// die if SQL statement failed
if (!$result || !$result2 || !$result3) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
// return result to frontend
if ($body->action == "get-courses" or $body->action == "get-comments" or $body->action == "get-student") {
  echo '[';
  for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  echo ']';
} elseif ($body->action == "status-change") {
  insertActivityLog($body->email, "Updated record to ".$body->newStatus, $body->student_number, $con);
  echo json_encode('Successfully updated '.$body->student_number.' student record status to '.$body->newStatus);
} elseif ($body->action == "delete-record") {
  echo json_encode('Successfully deleted ' . $body->student_number.' student record');
}
else {
    echo mysqli_affected_rows($con);
}
 
$con->close();

// REFERENCES
// https://tutorial101.blogspot.com/2021/11/reactjs-fetch-data-from-database-with.html
