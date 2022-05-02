<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:

$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_cmsc_128"; 

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse

$studno = isset($data['studno']) ? (int)$data['studno'] : 0;
$lname = isset($data['lname']) ? $data['lname'] : 0;
$fname = isset($data['fname']) ? $data['fname'] : 0;
$mname = isset($data['mname']) ? $data['mname'] : 0;
$suffix = isset($data['suffix']) ? $data['suffix'] : 0;
$degree = isset($data['degree']) ? $data['degree'] : 0;

//query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
$sql = "INSERT INTO student VALUES ('$studno','$lname','$fname','$mname','$suffix','$degree',1,1,1.5,'-')";

if($studno == 0) die();

// run SQL statement
$result = mysqli_query($con,$sql);

if (mysqli_num_rows($result) == 0) {
  echo "error";
} else {
  echo "success";
}

$con->close();