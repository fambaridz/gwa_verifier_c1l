<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

//Connects to database
include_once 'database.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    return;
}
$data = json_decode(file_get_contents('php://input'), true);

$data_list = $data['lst'];
$studno = $data['studno'];


// initial checking: check if student exists
$query = "SELECT * FROM student WHERE student_number=?";

// prepare stamtent
$stmt = mysqli_stmt_init($conn);

// checks if prepare sql statement is successful
if (!mysqli_stmt_prepare($stmt, $query)) {
    http_response_code(500);
    echo json_encode([
        "msg" => "Sever error: SQL Statement failed."
    ]);
    return;
}

// bind, executes and gets restult of sql statements
// check if student number exists
mysqli_stmt_bind_param($stmt, "s", $studno);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$hasErrors = false;

if (mysqli_num_rows($result) == 0) {
    // echo "Student is not registered";
    http_response_code(404);
    echo json_encode([
        "msg" => "Student is not registered"
    ]);
    return;
}

// for loop to update student records
foreach ($data_list as $row) {
    $id = $row["id"];
    $studno = $row['student_number'];
    $courseno = $row['course_number'];
    $grade = $row['grade'];
    $units = $row['units'];
    $enrolled = $row['enrolled'];
    $runtotal = $row['running_total'];
    $term = $row['term'];

    //sql statement for edit student record
    $sql_2 = "UPDATE student_record SET student_number=?, course_number=?, grade=?, units=?, enrolled=?, running_total=?, term=? WHERE id=?";
    $stmt_2 = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt_2, $sql_2)) {
        // echo "SQL statement failed";
        http_response_code(500);
        echo json_encode([
            "msg" => "Sever error: SQL Statement failed."
        ]);
    } else {
        mysqli_stmt_bind_param(
            $stmt_2,
            "ssssssss",
            $studno,
            $courseno,
            $grade,
            $units,
            $enrolled,
            $runtotal,
            $term,
            $id,
        );
        mysqli_stmt_execute($stmt_2);
        $result_2 = mysqli_stmt_get_result($stmt_2);
    }
}

echo json_encode([
    "msg" => "Student records successfully updated"
]);

$conn->close();

// REFACTORED BY IAN: Disregard paramater "student number", instead accept an id for each student record
// Refactored by Ian Salazar
/*
foreach ($data_list as $i) {
    $id = $data["id"];
    $studno = $data['student_number'];
    $courseno = $data['course_number'];
    $grade = $data['grade'];
    $units = $data['units'];
    $enrolled = $data['enrolled'];
    $runtotal = $data['running_total'];
    $term = $data['term'];

    $sql = "SELECT * FROM student_record WHERE student_number=?";
    //Prepare statement
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL statement failed";
    } else {
        mysqli_stmt_bind_param($stmt, "s", $studno);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        //check if id is registered
        if (mysqli_num_rows($result) == 0) {
            echo "Student is not registered";
        } else {
            $sql_2 = "UPDATE student_record SET student_number=?, course_number=?, grade=?, units=?, enrolled=?, running_total=?, term=? WHERE student_number=?";
            $stmt_2 = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($stmt_2, $sql_2)) {
                echo "SQL statement failed";
            } else {
                mysqli_stmt_bind_param(
                    $stmt_2,
                    "ssssssss",
                    $data->student_number,
                    $data->course_number,
                    $data->grade,
                    $data->units,
                    $data->enrolled,
                    $data->running_total,
                    $data->term,
                    $data->student_number
                );
                mysqli_stmt_execute($stmt_2);
                $result_2 = mysqli_stmt_get_result($stmt_2);
                echo "Updated";
            }
        }
    }
}

$conn->close();

*/