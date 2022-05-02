<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//Connects to database
include_once 'database.php';

$data = json_decode(file_get_contents('php://input'));

//if input fields is empty
if (!isset($data->Email) || !isset($data->Password)){
    echo "Input fields is empty";
} else {        //if input fields is not empty
    $email = trim($data->Email);
    //$hashed_password = trim($data->Password);
    $hashed_password = hash('sha256', trim($data->Password));
        
    //SQL Query
    $sql = "SELECT * FROM logincreds WHERE User=?";
    //Prepare statement
    $stmt = mysqli_stmt_init($conn);

    //Check if sql query is correct
    if (!mysqli_stmt_prepare($stmt, $sql)){
        echo "SQL statement failed";
    } else {
        //binds, executes, and get results of sql query
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        //check if email is registered
        if(mysqli_num_rows($result) == 0){
            echo "Email is not registered";
        } else {
            $row = mysqli_fetch_assoc($result);

            //check if passwords match 
            if(!($hashed_password == $row['Pass'])){
                echo "Email and password do not match";
            } else {
                echo "You are logged in";
            }
        }
    }
}

$conn->close();
/* 

References:
Prepare statements: https://www.youtube.com/watch?v=I4JYwRIjX6c
Handle json objects: https://www.w3schools.com/js/js_json_php.asp
Decrypt password: https://www.php.net/manual/en/function.password-verify.php

*/