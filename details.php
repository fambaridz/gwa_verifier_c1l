<?php
// Author: Tomboc, Ma. Zeit Elizha

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db";
 
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
// { action: 'delete-record', term: term}, METHOD: POST

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
// create and execute queries based on $body->action
switch ($body->action) {
  case 'get-student':
    // gets the student's details
    $sql = "SELECT * FROM student WHERE student_number = '$body->student_number'";
    $result = mysqli_query($con,$sql);
    break;
  case 'get-courses':
    // gets the courses and course details of a student record
    $sql = "SELECT id, course_number, grade, units, enrolled, running_total, term FROM student_record WHERE student_number = '$body->student_number'";
    $result = mysqli_query($con,$sql);
    break;
  case 'get-comments':
    // gets the comments from committees for a student record
    $sql = "SELECT committee_email, comments FROM committee_student WHERE student_number = '$body->student_number'";
    $result = mysqli_query($con,$sql);
    break;
  case 'delete-record':
    // deletes a student record
    $sql = "DELETE FROM student_record WHERE student_number = '$body->student_number'; DELETE FROM student WHERE student_number = '$body->student_number'; DELETE FROM committee_student WHERE student_number = '$body->student_number'";
    $result = mysqli_multi_query($con,$sql);
    break;
  case 'status-change':
    // changes the status of a student record
    // valid status changes: UNVERIFIED <-> DEFICIENT <-> SATISFIED or UNSATISFIED
    if(
      ($body->prevStatus == "UNVERIFIED" and $body->newStatus == "DEFICIENT") or
      ($body->prevStatus == "SATISFIED" and $body->newStatus != "UNVERIFIED") or
      ($body->prevStatus == "UNSATISFIED" and $body->newStatus != "UNVERIFIED") or
      ($body->prevStatus == "DEFICIENT")
      ) {
        $sql = "UPDATE student SET status = '$body->newStatus' WHERE student.student_number = '$body->student_number'"; 
        $result = mysqli_query($con,$sql);
    } else {
      exit(json_encode("Invalid status"));
    }
    break;
  
  //added by: Francis Bejosano
  case 'record-per-semester':
    $sql = "SELECT * FROM student_record WHERE term = '$body->term'";
    $result = mysqli_multi_query($con,$sql);
    break;
}
 
// die if SQL statement failed
if (!$result) {
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