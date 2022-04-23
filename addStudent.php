<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_cmsc_128"; 
$id = '';

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse

$studno = (int)$data['studno'];

//query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
$sql = "INSERT INTO student VALUES ('$studno','$data[lname]','$data[fname]','$data[mname]','$data[suffix]','$data[degree]',1,1,1.5,'-')";

// run SQL statement
$result = mysqli_query($con,$sql);
 
$con->close();