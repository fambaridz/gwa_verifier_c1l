<?php

$host="localhost";
$user="root";
$password="";
$db="gwa_verifier_c1l_db";

//try to connect to database
$conn = mysqli_connect($host, $user, $password, $db);

//check if connection is successful
if ($conn -> connect_error){
    die("Failed to connect to database");
} 

$email = 'tester@test.com';
$password = hash('sha256', "password");
$sql = "INSERT INTO `committee`(`email`, `account_made_by`, `password`, `lastname`, `firstname`, `middlename`, `suffix`) VALUES ('$email','IAN','$password','GREY','IVAN','ANDERSON','III')";

$result = mysqli_query($conn, $sql);
if ($result){
    echo $result;
}

$conn->close();
?>