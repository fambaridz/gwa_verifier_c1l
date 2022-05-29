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


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    return;
} else if ($_SERVER['REQUEST_METHOD'] !== "DELETE") {
    return;
}



// get the body of fetch then decode it
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse

// $id = isset($data['id']) ? $data['id'] : 0;
$ids = isset($data['ids']) ? $data['ids'] : [];

$hasError = False;

foreach ($ids as $id) {

    // TODO: Check if student record exists
    //query
    $sql = "DELETE FROM student_record WHERE id='$id'";

    // run SQL statement
    $result = mysqli_query($con, $sql);
    if (!$result) $hasError = True;
}

if ($hasError) {
    http_response_code(400);
    echo json_encode([
        "msg" => "Cannot delete records"
    ]);
} else {
    echo json_encode([
        "msg" => "Successfully deleted records"
    ]);
}




// if (!$result) {
//     echo "Error in deleting student record with id: " . $id;
// } else {
//     echo http_response_code();      //returns 200 if insertion is successful
// }
