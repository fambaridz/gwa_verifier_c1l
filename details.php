<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db";  // temporary database for testing
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];

// $data = json_decode(file_get_contents('php://input'), true); // to be used when retrieving data from fetch body

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
switch ($method) {
    case 'GET':
      // TODO: id value should be dyanmic; get id from fetch body
      $sql = "select * from student_record where student_number='202011111'"; 
      break;
}
 
// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    // if (!$id) echo '['; // CHECK: is "if (!$id)" needed?
    echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    echo ']';
}else {
    echo mysqli_affected_rows($con);
}
 
$con->close();

// REFERENCES
// https://tutorial101.blogspot.com/2021/11/reactjs-fetch-data-from-database-with.html