<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//Connects to database
include_once 'database.php';

$data = json_decode(file_get_contents('php://input'));

//if input fields is empty
if (!isset($data->id)){
    echo "Input fields is empty";
} else {        //if input fields is not empty
    //SQL Query
    $sql = "SELECT * FROM student_record WHERE id=?";
    //Prepare statement
    $stmt = mysqli_stmt_init($conn);
    $id = $data->id;
    //Check if sql query is correct
    if (!mysqli_stmt_prepare($stmt, $sql)){
        echo "SQL statement failed";
    } else {
        //binds, executes, and get results of sql query
        mysqli_stmt_bind_param($stmt, "s", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        //check if id is registered
        if(mysqli_num_rows($result) == 0){
            echo "Student is not registered";
        } else {
            $sql_2 = "UPDATE student_record SET student_number=?, course_number=?, grade=?, units=?, enrolled=?, running_total=?, term=? WHERE id=?";
            $stmt_2 = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt_2, $sql_2)){
                echo "SQL statement failed";
            } else {
                mysqli_stmt_bind_param($stmt_2, "ssssssss", $data->student_number, 
                                                            $data->course_number, 
                                                            $data->grade, 
                                                            $data->units, 
                                                            $data->enrolled, 
                                                            $data->running_total, 
                                                            $data->term, 
                                                            $data->id);
                mysqli_stmt_execute($stmt_2);
                $result_2 = mysqli_stmt_get_result($stmt_2);
                echo "Updated";
            }
        }

    }
}