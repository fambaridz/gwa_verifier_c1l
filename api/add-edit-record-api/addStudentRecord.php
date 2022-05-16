<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db"; 

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//if failed to connect notify
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse
$lst = $data['lst'];    //get list of inputs
$studno = $data['studno'];  //student number

foreach($lst as $i) {
  $grade = (int)$i['grade'];
  $units = (float)$i['units'];
  $enrolled = (float)$i['enrolled'];
  $runningtotal = (double)$i['total'];

  //query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
  $sql = "INSERT INTO student_record(student_number, course_number, grade, units, enrolled, running_total, term) VALUES ('$studno','$i[courseno]','$grade','$units','$enrolled','$runningtotal','$i[term]')";

  // run SQL statement
  $result = mysqli_query($con,$sql);
}
 
$con->close();