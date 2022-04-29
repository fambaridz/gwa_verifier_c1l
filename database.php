<?php

$host="localhost";
$user="root";
$password="";
$db="users_128";

//try to connect to database
$conn = mysqli_connect($host, $user, $password, $db);

//check if connection is successful
if ($conn -> connect_error){
    die("Failed to connect to database");
} else {
    echo "";
}
