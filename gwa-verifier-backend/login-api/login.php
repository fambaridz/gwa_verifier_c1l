<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//Connects to database
include_once 'database_login.php';

$data = json_decode(file_get_contents('php://input'));

//if input fields is empty
if (!isset($data->Email) || !isset($data->Password)){
    echo "Input fields is empty";
} else {        //if input fields is not empty
    $email = trim($data->Email);
    // $hashed_password = trim($data->Password);
    $hashed_password = hash('sha256', trim($data->Password));   // accepts hashed password
        
    //SQL Query
    $sql = "SELECT * FROM committee WHERE email=?";
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
            $object = array("success"=>False);
            $json_object = json_encode($object);
            echo $json_object;
        } else {
            $row = mysqli_fetch_assoc($result);

            //check if passwords match 
            if(!($hashed_password == $row['password'])){
                $object = array("success"=>False);
                $json_object = json_encode($object);
                echo $json_object;
            } else {
                 if(is_null($row["account_made_by"])){
                    $superuser_flag = True;
                } else {
                    $superuser_flag = False;
                }
                $object = array("success"=>True, "firstname"=>$row['firstname'], "middlename"=>$row['middlename'], "lastname"=>$row['lastname'], "suffix"=>$row['suffix'], "superuser"=>$superuser_flag);
                $json_object = json_encode($object);
                echo $json_object;
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
