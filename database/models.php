<?php

//variables for the models here

// variables for student model
$student_number = $_POST['student_number'];
$lastname = $_POST['lastname'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$suffix = $_POST['suffix'];
$degree_program = $_POST['degree_program'];
$reccommended_number_units = $_POST['reccommended_number_units'];
$credited_units = $_POST['credited_units'];
$gwa = $_POST['gwa'];
$status = $_POST['status'];

// models here

//database variable
$db = new mysqli('localhost', 'root', '', 'gwa_verifier_c1l_db'); //database instance;
if($db->connect_error){
    die('Connection Failed : ' .$db->connect_error);
}else{
    $student_model = $db->prepare("insert into student (student_number, lastname, firstname, middlename, suffix, degree_program, reccommended_number_units, credited_units, gwa, status)
        values(?, ?, ? ,?, ?, ?, ?, ?, ?, ?)");
    $student_model->bind_param("isssssiids", $student_number, $lastname, $firstname, $middlename, $suffix, $degree_program, $reccommended_number_units, $credited_units, $gwa, $status);
    $student_model->execute();
}

?>
