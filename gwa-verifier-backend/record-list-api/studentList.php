<?php
header("Access-Control-Allow-Origin: *"); //Allow CORS for any domain
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
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

include '../activity-log-api/activity_log.php';

if(!$con) {
    die("Connection failed: " . mysqli_connect_error()); 
}

// gets the list of students to be displayed at the student list page
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

    $sql = "DELETE FROM `student` WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "i", $target->target);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    //insert activity to activity_log
    insertActivitylog($target->email, "Deleted student record with ", $target->target, $con);

    // resource not found if query returns empty
    if(mysqli_errno($con)!=0) {
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

    // delete from student-record
    $sql = "DELETE FROM `student_record` WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "i", $target->target);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    //Update comments in committee_student
    $sql = "DELETE FROM `committee_student` WHERE student_number = ?";
    $stmt = mysqli_stmt_init($con);
    mysqli_stmt_prepare($stmt, $sql);
    mysqli_stmt_bind_param($stmt, "i", $target->target);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);


}

echo json_encode($new);
// exit
$con->close();
