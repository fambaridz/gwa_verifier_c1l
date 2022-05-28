<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include '../activity-log-api/activity_log.php';

$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";

//connect to database
$con = mysqli_connect($host, $user, $password, $dbname);

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
$rec_units = isset($data['rec_units']) ? (int)$data['rec_units'] : 0;
$cred_units = isset($data['cred_units']) ? (int)$data['cred_units'] : 0;
$gwa = isset($data['gwa']) ? (float)$data['gwa'] : 0;
$status = isset($data['status']) ? $data['status'] : 0;

// check if student number already exists in the database
function check_studno_if_exist($studno, $con)
{
  $sql = "SELECT student_number FROM student WHERE student_number=$studno";
  $result = mysqli_query($con, $sql);

  //return 1 if existing
  if (mysqli_num_rows($result) >= 1) {
    return 1;
  } else {
    return 0;
  }
}

//checks if degree exists in degree_curriculums table
function check_degree_if_exist($degree, $con)
{
  $sql = "SELECT degree_nickname FROM degree_curriculums WHERE degree_nickname='$degree'";
  $result = mysqli_query($con, $sql);

  //return 1 if existing
  if (mysqli_num_rows($result) >= 1) {
    return 1;
  } else {
    return 0;
  }
}


if (!check_studno_if_exist($studno, $con)) {
  if (check_degree_if_exist($degree, $con)) {
    //query - insert student no, last name, first name, middle name, suffix, degree, recommended no units, credited units, gwa, status
    $sql = "INSERT INTO student VALUES ('$studno','$lname','$fname','$mname','$suffix','$degree','$rec_units','$cred_units','$gwa','$status')";

    // run SQL statement
    $result = mysqli_query($con, $sql);

    insertActivityLog($data['email'], "Added student", $studno, $con);

    if (!$result) {
      echo "error";
    } else {
      echo http_response_code();      //returns 200 if insertion is successful
    }
  } else {
    http_response_code(404);
    $data = [
      "msg" => "Degree does not exist"
    ];
    echo json_encode($data);
  }
}
// added by Ian Salazar
// return a 409 status code and json msg for duplicate resource
else {
  http_response_code(409);
  $data = [
    "msg" => "Student number already exists"
  ];
  echo json_encode($data);
}


$con->close();
