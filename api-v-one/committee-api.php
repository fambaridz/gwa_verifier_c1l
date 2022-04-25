<?php
// reference https://dev.to/durgeshsahani/react-crud-operations-using-php-api-and-mysql-13da

/* various API calls for committee: POST, GET, PUT */

//connect to database
require_once('db-connect.php'); 

//retrieve what method was called
$method = $_SERVER['REQUEST_METHOD'];

//determine which method was called
switch("$method") {

    //POST for adding new committee users
    case 'POST':

        //retrieve input
        $committee = json_decode(file_get_contents('php://input'));
        //sql query 
        $sql = "INSERT INTO committee VALUES (  '$committee->email', 
                                                '$committee->account_made_by', 
                                                '$committee->password', 
                                                '$committee->lastname', 
                                                '$committee->firstname', 
                                                '$committee->middlename', 
                                                '$committee->suffix')";

        //save result
        $result = mysqli_query($con,$sql);
        break;
        
    //GET for retrieving committee users
    case 'GET':
        $sql = "SELECT * FROM committee";

        $result = mysqli_query($con,$sql);
        
        //Send the query results as JSON
        $res_send = array();
        while($row =mysqli_fetch_assoc($result)) $res_send[] = $row;

        echo json_encode($res_send);

        break;
    
    //PUT for updating existing committee users
    case 'PUT':
        $committee = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE committee SET    email = '$committee->email',
                                        account_made_by = '$committee->account_made_by', 
                                        password = '$committee->password', 
                                        lastname = '$committee->lastname', 
                                        firstname = '$committee->firstname', 
                                        middlename ='$committee->middlename', 
                                        suffix = '$committee->suffix' WHERE email = '$committee->email'";
        $result = mysqli_query($con,$sql);
        break;

    case 'DELETE':
        $committee = json_decode(file_get_contents('php://input'));
        $sql = "DELETE from committee WHERE email = '$committee->email'";
    
        $result = mysqli_query($con,$sql);
        break;
}

$con->close();