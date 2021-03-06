<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";

//connect to database
$con = mysqli_connect($host, $user, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  return;
}

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse
$lst = $data['lst'];    //get list of inputs
$studno = (int)$data['studno'];  //student number

//loop through every record and insert to database
foreach ($lst as $i) {
  $grade = $i['grade'];
  $units = $i['units'];
  $enrolled = (float)$i['enrolled'];
  $runningtotal = (float)$i['total'];

  //query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
  $sql = "INSERT INTO student_record(student_number, course_number, grade, units, enrolled, running_total, term) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  //run query
  $stmt = mysqli_stmt_init($con);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, "sssssss", $studno, $i['courseno'], $grade, $units, $enrolled, $runningtotal, $i['term']);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
}

$con->close();
