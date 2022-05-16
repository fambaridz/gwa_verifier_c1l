<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$host="localhost";
$user="root";
$password="";
$db="gwa_verifier_c1l_db";

//try to connect to database
$conn = mysqli_connect($host, $user, $password, $db);

//check if connection is successful
if ($conn -> connect_error){
    die("Failed to connect to database");
} else {
    // echo "Connected to database";
}