<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost"; 
$user = "root"; 
$password = "kikoman23142314"; 
$dbname = "gwa_verifier_c1l_db"; 

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse

$studno = isset($data['studno']) ? (int)$data['studno'] : 0;
$new_status = isset($data['new_status']) ? $data['new_status'] : 0;

//update status using the student number
$sql = "UPDATE student SET status='$new_status' WHERE student_number='$studno'";
$result = mysqli_query($con,$sql);

if (!$result) {
    echo "error";
} else {
    echo http_response_code();      //returns 200 if update is successful
}


$con->close();