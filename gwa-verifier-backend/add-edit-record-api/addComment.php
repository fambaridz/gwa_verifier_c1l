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
$email = isset($data['email']) ? $data['email'] : 0;
$studno = isset($data['studno']) ? (int)$data['studno'] : 0;
$comment = isset($data['comment']) ? $data['comment'] : 0;

//query
$sql = "INSERT INTO committee_student (committee_email, student_number, comments) VALUES (?, ?, ?)";
$stmt = mysqli_stmt_init($con);
mysqli_stmt_prepare($stmt, $sql);
mysqli_stmt_bind_param($stmt, "sss", $email, $studno, $comment);
mysqli_stmt_execute($stmt);
if ($studno == 0) die();
// run SQL statement

$result = mysqli_stmt_get_result($stmt);

// die if SQL statement failed
if (mysqli_errno($con)!=0) {
  http_response_code(500);
  echo json_encode([
    "msg" => "Server error: cannot save comment"
  ]);
} else {
  http_response_code(201);
  echo json_encode([
    "msg" => "Successfully created comment"
  ]);
  // echo http_response_code();
}

$con->close();
