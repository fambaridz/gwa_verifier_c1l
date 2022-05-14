<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

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
$email = isset($data['email']) ? $data['email'] : 0;
$studno = isset($data['studno']) ? (int)$data['studno'] : 0;
$comment = isset($data['comment']) ? $data['comment'] : 0;

//query
$sql = "INSERT INTO committee_student VALUES ('$email','$studno','$comment')";
if($studno == 0) die();
// run SQL statement

$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  echo "duplicate key";
} else {
  echo http_response_code();
}

$con->close();