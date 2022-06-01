<?php

header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// How to use this api

// 1. include 'PATH/activity_log.php';

// call the functions below

// insertActivitylog(params);
// getActivitylogs(params); currently not working ....

// constants
$DEFAULT_STATUS = 'INCOMPLETE';
$SUCCESS_RESPONSE = 200;
$DATE_DEFAULT_TIME_ZONE = 'Singapore';



$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gwa_verifier_c1l_db"; 

//connect to database
$con = mysqli_connect($host, $user, $password,$dbname);

//failed to connect
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

function insertActivitylog ($email, $activity, $studno, $con){
    // for local variable
    $sql = 0;
    $date = date('Y/m/d H:i:s');

    // This would return
    // $date = '2012-03-06 17:33:07';
    // reference: https://stackoverflow.com/questions/470617/how-do-i-get-the-current-date-and-time-in-php

    // if the activity was not a student record
    if ($studno !=0){
        $activity_studno = $activity. ' Student number: '. (string)$studno;
        //$sql = "INSERT INTO activity_log (email, date, activity) VALUES('$email', '$date', '$activity_studno')";
        $sql = "INSERT INTO activity_log (email, date, activity) VALUES(?, ?, ?)";
        $stmt = mysqli_stmt_init($con);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $email, $date, $activity_studno);
        mysqli_stmt_execute($stmt);
        
    } else{
        //$sql = "INSERT INTO activity_log (email, date, activity) VALUES('$email', '$date', '$activity')";
        $sql = "INSERT INTO activity_log (email, date, activity) VALUES(?, ?, ?)";
        $stmt = mysqli_stmt_init($con);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $email, $date, $activity);
        mysqli_stmt_execute($stmt);
    }
    // echo $sql;
    //$result = mysqli_query($con, $sql);
    $result = mysqli_stmt_get_result($stmt);
    
    // if (!$result) {
    //     echo "Activity Log unsuccesful";
    // } else {
        
    // echo http_response_code();      //returns 200 if insertion is successful
    // }
}

// get activity log

// function getActivitylog ($con){
//     // for local variable
//     $sql = "SELECT * from activity_log";

//     $result = mysql_query($con, $sql);

//     if (!$result) {
//         echo "Update unsuccesful";
//     } else {
        
//     echo http_response_code();      //returns 200 if insertion is successful
//     }
// }


// sample api call
// insertActivitylog('sample@data.com', 'trial activity', 0, $con);
