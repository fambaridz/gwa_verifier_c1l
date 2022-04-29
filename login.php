<?php

//Connects to database
include_once 'database.php';

$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);
$userEmail = $decodedData['Email'];
$userPw = ($decodedData['Password']);

//if input fields is empty
if (!isset($userEmail) || !isset($userPw)){
    echo "Input fields is empty";
} else {        //if input fields is not empty
    $email = trim($userEmail);
    $password = trim($userPw);
        
    //SQL Query
    $sql = "SELECT * FROM logincreds WHERE user=?";
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
            if(!password_verify($password, $row['Password'])){
                echo "Email and password do not match";
            } else {
                echo "You are logged in";
            }
        }
    }
}
