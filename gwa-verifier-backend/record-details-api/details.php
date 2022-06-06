<?php
/* 

Author: Tomboc, Ma. Zeit Elizha
Description:
  API of the Record Details Page for:
    1. Getting a student's details, courses, or comments
    2. Changing a student record's status
    3. Deleting a student record

 */

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
/*
expected body contents and methods:
  { action: 'get-student', student_number: <student_number> }, METHOD: POST
  { action: 'get-courses', student_number: <student_number> }, METHOD: POST
  { action: 'get-comments', student_number: <student_number> }, METHOD: POST
  { action: 'status-change', student_number: <student_number>,  prevStatus: <previous status>, newStatus: <new status>}, METHOD: POST
  { action: 'delete-record', student_number: <student_number>}, METHOD: DELETE
  { action: 'record-per-semester', term: term}, METHOD: POST
*/

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
// create and execute queries based on $body->action
switch ($body->action) {
  case 'get-student':
    // gets the student's details
    $sql = "SELECT * FROM student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
  case 'get-courses':
    // gets the courses and course details of a student record
    $sql = "SELECT id, course_number, grade, units, enrolled, running_total, term FROM student_record WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
  case 'get-comments':
    // gets the comments from committees for a student record
    $sql = "SELECT committee_email, comments FROM committee_student WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
  case 'delete-record':
    // deletes a student record
    insertActivityLog($body->email, "Deleted record ", $body->student_number, $con);
    $sql = "DELETE FROM student_record WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_errno($con)!=0) {
      //error
      echo("fail1");
    } else {
      echo("success1");
      $sql = "DELETE FROM student WHERE student_number = ?";
      $stmt = mysqli_stmt_init($con);
      mysqli_stmt_prepare($stmt, $sql);
      mysqli_stmt_bind_param($stmt, "s", $body->student_number);
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
      
      if (mysqli_errno($con)!=0) {
        //error
        echo("fail2");
      } else {
        echo("success2");
        $sql = "DELETE FROM committee_student WHERE student_number = ?";
        $stmt = mysqli_stmt_init($con);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "s", $body->student_number);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        
      }
    }
    break;
  case 'status-change':
    // changes the status of a student record

    // get the student's GWA
    $gwasql = "SELECT gwa FROM student WHERE student_number = ?";
    $gwastmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($gwastmt, $gwasql);
    mysqli_stmt_bind_param($gwastmt, "s", $body->student_number);
    mysqli_stmt_execute($gwastmt);
    $gwa = mysqli_fetch_object(mysqli_stmt_get_result($gwastmt))->gwa;
    // valid status changes: UNCHECKED <-> PENDING <-> SATISFACTORY or UNSATISFACTORY
    if(
      ($body->prevStatus == "UNCHECKED" and $body->newStatus == "PENDING") or
      ($body->prevStatus == "SATISFACTORY" and $body->newStatus != "UNCHECKED") or
      ($body->prevStatus == "UNSATISFACTORY" and $body->newStatus == "PENDING") or
      ($body->prevStatus == "UNSATISFACTORY" and $body->newStatus == "SATISFACTORY" and $gwa <= 1.75) or
      ($body->prevStatus == "PENDING" and $body->newStatus == "SATISFACTORY" and $gwa <= 1.75) or
      ($body->prevStatus == "PENDING" and $body->newStatus != "SATISFACTORY")
      ) {
        $sql = "UPDATE student SET status = ? WHERE student.student_number = ?";
        $stmt = mysqli_stmt_init($con);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $body->newStatus, $body->student_number);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    } else {
      exit(json_encode("Invalid status"));
    }
    break;
  
  //added by: Francis Bejosano
  case 'record-per-semester':
    // get the student's record for a semester
    $sql = "SELECT * FROM student_record WHERE term = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->term);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
}
 
// die if SQL statement failed
if (mysqli_errno($con)!=0) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
// return result to frontend
if ($body->action == "get-courses" or $body->action == "get-comments" or $body->action == "get-student") {
  // return courses, comments, or student details
  echo '[';
  for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  echo ']';
} elseif ($body->action == "status-change") {
  // return successful update in status
  insertActivityLog($body->email, "Updated record to ".$body->newStatus, $body->student_number, $con);
  echo json_encode('Successfully updated '.$body->student_number.' student record status to '.$body->newStatus);
} elseif ($body->action == "delete-record") {
  // return successful deletion of record
  echo json_encode('Successfully deleted ' . $body->student_number.' student record');
}
else {
    echo mysqli_affected_rows($con);
}
 
$con->close();

// REFERENCES
// https://tutorial101.blogspot.com/2021/11/reactjs-fetch-data-from-database-with.html
