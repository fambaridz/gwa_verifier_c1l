<?php
header("Access-Control-Allow-Origin: *"); //Allow CORS for any domain
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8');
$host = "localhost";
$user = "root";
$password = "";
$dbname = "gwa_verifier_c1l_db";
$id = ''; 
// WRITTEN BY: ANDREI JOSHUA GELAGA
// FUNCTIONS: 
// - CONNECTS TO MYSQL SERVER
// - QUERIES FOR ALL ROWS IN TABLE 'STUDENT'
// - RETURNS QUERY RESPONSE AS ARRAY OF JSON OBJECTS TO FRONTEND
// - 'POST' METHOD DELETES SPECIFIC ROW IN SERVER

// credentials
$con = mysqli_connect($host, $user, $password, $dbname);

// gets request method from header
$method = $_SERVER['REQUEST_METHOD'];

if(!$con) {
    die("Connection failed: " . mysqli_connect_error()); 
}

// return query as array of JSON objects
if ($method == 'GET') {
    // query statement
    $sql = "SELECT * FROM `student`";

    // query
    $result = mysqli_query($con, $sql);

    // resource not found if query returns empty
    if(!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }

    $new = array();
    while($r = mysqli_fetch_assoc($result)) {
        $new[] = $r; 
    }
    

}
// delete
else if ($method == 'POST') {

    // accesses POST body 
    $json = file_get_contents('php://input');
    $target = json_decode($json);
    // accesses value json object 'target' property for deletion
    $sql = "DELETE FROM `student` WHERE student_number = '{$target->target}'";
    // query
    $result = mysqli_query($con, $sql);

    // resource not found if query returns empty
    if(!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    else {
        $sql = "SELECT * FROM `student`";
        // query
        $result = mysqli_query($con, $sql);
    }

    $new = array();
    while($r = mysqli_fetch_assoc($result)) {
        $new[] = $r; 
    }
    
}

echo json_encode($new);
// exit
$con->close();

