<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// constants
$DEFAULT_STATUS = 'INCOMPLETE';
$SUCCESS_RESPONSE = 200;


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


// decode the message body
$data = json_decode(file_get_contents('php://input'), true);  //json_decode == json_parse

// for testing data
// echo($data);

// variable assignment of each data in the body
$oldStudno = isset($data['oldStudNo']) ? (int)($data['oldStudNo']) : 0;
$newStudNo = isset($data['newStudNo']) ? (int)($data['newStudNo']) : 0;
$lName = isset($data['lname']) ? $data['lname'] : 0;
$fName = isset($data['fname']) ? $data['fname'] : 0;
$mName = isset($data['mname']) ? $data['mname'] : 0;
$suffix = isset($data['suffix']) ? $data['suffix'] : 0;
$degree = isset($data['degree']) ? $data['degree'] : 0;
$recommendedUnits = isset($data['rec_units']) ? $data['rec_units'] : 0;
$creditedUnits = isset($data['cred_units']) ? $data['cred_units'] : 0;
$gwa = isset($data['gwa']) ? (float)($data['gwa']) : 0;
$status = isset($data['status']) ? $data['status'] : $DEFAULT_STATUS;


// check if the new student number already exists in the database
function check_studno_if_already_exist($oldStudno, $newStudNo, $con){

    // if there's no change with the stud no
    if ($newStudNo == $oldStudno){
      return FALSE;
    }

    // query
    $sql = "SELECT student_number FROM student WHERE student_number=$newStudNo";
    $result = mysqli_query($con,$sql);

    //if existing
    if(mysqli_num_rows($result)>=1) {
        return TRUE;
    }
    else{
      return FALSE;
    }
}

// checks if the student data is already in the database
function check_studno_if_exist($oldStudno, $con){

  // query the student number
  $sql = "SELECT student_number FROM student WHERE student_number=$oldStudno";
  $result = mysqli_query($con,$sql);

  if(mysqli_num_rows($result)>=1) {
    return TRUE;
  }
  else{
    return FALSE;
  }
}


//checks if degree exists in degree_curriculums table
function check_degree_if_exist($degree, $con){

    $sql = "SELECT degree_nickname FROM degree_curriculums WHERE degree_nickname='$degree'";
    $result = mysqli_query($con,$sql);

    //if existing
    if(mysqli_num_rows($result)>=1) {
        return TRUE;
    }
    else{
      return FALSE;
    }
}




if (check_studno_if_exist($oldStudno, $con)){
  if(!check_studno_if_already_exist($oldStudno,$newStudNo, $con)){
    if(check_degree_if_exist($degree, $con)){

        // query for update of the student in the student table
        $sql = "UPDATE student 
        SET student_number = '$newStudNo', lastname = '$lName', firstname = '$fName', 
        middlename = '$mName', suffix = '$suffix', degree_program = '$degree', recommended_number_units	 = '$recommendedUnits', 
        credited_units = '$creditedUnits', gwa = '$gwa', status = '$status'
        WHERE student_number = $oldStudno;
        ";

        // run SQL statement
        $result = mysqli_query($con,$sql);

        if (!$result) {
        echo "Update unsuccesful";
        } else {
        echo http_response_code();      //returns 200 if insertion is successful
        }
    }
    else echo "Degree does not exist";
  }
  else echo "The new student number already exists";
}else{
  echo 'Student ID:'. $oldStudno. ' is not existing the database';
}

$con->close();