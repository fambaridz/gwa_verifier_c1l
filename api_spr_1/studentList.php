<?php
header("Access-Control-Allow-Origin: *"); //Allow CORS for any domain
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

// TBD:
// - SEPARATE QUERY/RETURNS FOR VERIFICATION/QUALIFICATION STATUS
// -->
// credentials
$con = mysqli_connect($host, $user, $password, $dbname);

// gets request method from header
$method = $_SERVER['REQUEST_METHOD'];

if(!$con) {
    die("Connection failed: " . mysqli_connect_error()); 
}

// query statement
$sql = "SELECT * FROM `student`";

// query
$result = mysqli_query($con, $sql);

// resource not found if query returns empty
if(!$result) {
    http_response_code(404);
    die(mysqli_error($con));
}

// return query as array of JSON objects
if ($method == 'GET') {
    $new = array();
    while($r = mysqli_fetch_assoc($result)) {
        $new[] = $r; 
    }
    echo json_encode($new);
}
else {
    echo mysqli_affected_rows($con);
}

// exit
$con->close();

