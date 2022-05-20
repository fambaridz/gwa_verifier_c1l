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

$studno = isset($data['studno']) ? (int)$data['studno'] : 0;
$lname = isset($data['lname']) ? $data['lname'] : 0;
$fname = isset($data['fname']) ? $data['fname'] : 0;
$mname = isset($data['mname']) ? $data['mname'] : 0;
$suffix = isset($data['suffix']) ? $data['suffix'] : 0;
$degree = isset($data['degree']) ? $data['degree'] : 0;

// check if student number already exists in the database
function check_studno_if_exist($studno, $con){
    $sql = "SELECT student_number FROM student WHERE student_number=$studno";
    $result = mysqli_query($con,$sql);

    //return 1 if existing
    if(mysqli_num_rows($result)>=1) {
        return 1;
    }
    else{
      return 0;
    }
}

//checks if degree exists in degree_curriculums table
function check_degree_if_exist($degree, $con){
    $sql = "SELECT degree_nickname FROM degree_curriculums WHERE degree_nickname='$degree'";
    $result = mysqli_query($con,$sql);

    //return 1 if existing
    if(mysqli_num_rows($result)>=1) {
        return 1;
    }
    else{
      return 0;
    }
}


if(!check_studno_if_exist($studno, $con)){
    if(check_degree_if_exist($degree, $con)){
        //query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
        $sql = "INSERT INTO student VALUES ('$studno','$lname','$fname','$mname','$suffix','$degree',1,1,1.5,'-')";

        // run SQL statement
        $result = mysqli_query($con,$sql);

        if (!$result) {
        echo "error";
        } else {
        echo http_response_code();      //returns 200 if insertion is successful
        }
    }
    else echo "Degree does not exist";
}
else echo "Student number already exists";

$con->close();
