<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// sample json data 
// note that there should be an entry of this in database for testing
// {
// 	"old_stud_no": "200001234",
// 	"new_stud_no": "201901234",
// 	"lname": "TEST",
// 	"fname": "HELLO",
// 	"mname": "WORLD",
// 	"degree": "BSCS",
// 	"suffix": null,
// 	"recommended_number_units": "150",
// 	"credited_units": "150",
// 	"gwa": "1.99",
// 	"status": "qualified"
// }


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
$old_stud_no = isset($data['old_stud_no']) ? (int)($data['old_stud_no']) : 0;
$new_stud_no = isset($data['new_stud_no']) ? (int)($data['new_stud_no']) : 0;
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
function check_studno_if_already_exist($old_stud_no, $new_stud_no, $con){

    // if there's no change with the stud no
    if ($new_stud_no == $old_stud_no){
      return FALSE;
    }

    // query
    $sql = "SELECT student_number FROM student WHERE student_number=$new_stud_no";
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
function check_studno_if_exist($old_stud_no, $con){

  // query the student number
  $sql = "SELECT student_number FROM student WHERE student_number=$old_stud_no";
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

// check if there's a comment for a studno
function check_studno_in_comments($studno, $con){

  $sql = "SELECT * FROM committee_student WHERE student_number='$studno'";
  $result = mysqli_query($con,$sql);

  //if existing
  if(mysqli_num_rows($result)>=1) {
      return TRUE;
  }
  else{
    return FALSE;
  }
}




if (check_studno_if_exist($old_stud_no, $con)){
  if(!check_studno_if_already_exist($old_stud_no,$new_stud_no, $con)){
    if(check_degree_if_exist($degree, $con)){

        // query for update of the student in the student table
        $sql = "UPDATE student 
                SET student_number = '$new_stud_no', lastname = '$lName', firstname = '$fName', 
                middlename = '$mName', suffix = '$suffix', degree_program = '$degree', recommended_number_units	 = '$recommendedUnits', 
                credited_units = '$creditedUnits', gwa = '$gwa', status = '$status'
                WHERE student_number = $old_stud_no;
                ";

        // run SQL statement
        $result = mysqli_query($con,$sql);

        
        // cascading of the studno value incase of a change in the current value of studno in student table
        if ($new_stud_no != $old_stud_no){
          // query for update of the student number in the student_record
          $updateStudentNumberInStudRecord = "UPDATE student_record 
                                  SET student_number = '$new_stud_no'
                                  WHERE student_number = $old_stud_no;
                                  ";

          $updateStudentRecord = mysqli_query($con, $updateStudentNumberInStudRecord);

          if (!$updateStudentRecord){
            echo "Failure to update student number in student record";
          }

          // check if there's a comment for this student
          if (check_studno_in_comments($old_stud_no, $con)){
            
            // query for update of the studno in committee_student table
            $updateStudentNumberInCommmStud = "UPDATE committee_student 
                                              SET student_number = '$new_stud_no'
                                              WHERE student_number = $old_stud_no;
                                              ";
            $updateCommitteStudent = mysqli_query($con, $updateStudentNumberInCommmStud);

            if (!$updateCommitteStudent){
              echo "Failure to update student number in committee student table";
            }
          }
        }
        

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
  echo 'Student ID:'. $old_stud_no. ' is not existing the database';
}

$con->close();
