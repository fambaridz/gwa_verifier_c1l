<?php
// Author: Tomboc, Ma. Zeit Elizha

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];
$body = json_decode(file_get_contents('php://input'));

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  return;
}

// expected method and body:
// POST, { term: <"all" or specific semester>, student_number: <student no.> }

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($body->term) {
  case 'all':
    // get grades for all terms
    $sql = "SELECT units, enrolled FROM student_record WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "s", $body->student_number);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
  default:
    // get grades for one term
    $sql = "SELECT units, enrolled FROM student_record WHERE student_number = ? AND term = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $body->student_number, $body->term);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    break;
}

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == "POST") {
  $total_enrolled = 0;
  $total_units = 0;

  // get summation of each course's enrolled and units
  for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    $course = mysqli_fetch_object($result);
    if ($course->enrolled != 0) {
      if (preg_match("/\(.*\)/", $course->units)) {
        // for units of format (1)6 or similar
        $total_units += 6;
      } else {
        $total_units += $course->units;
      }
      $total_enrolled += $course->enrolled;
    }
  }

  // create stdClass/object for response
  $response = new stdClass();
  $response->total_enrolled = $total_enrolled;
  $response->total_units = $total_units;
  $response->gwa = $total_enrolled / $total_units;

  // send response object to frontend
  // response: {total_enrolled: <val>, total_units: <val>, gwa: <val>}
  echo json_encode($response);
}

$con->close();
