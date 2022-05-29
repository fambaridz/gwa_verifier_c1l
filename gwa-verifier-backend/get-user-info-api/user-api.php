<?php

/*
This API is for requesting user's info.
For front-end requests:
    - API only listens to GET request
    - Only takes cookies with username
    - Is Expected to return a JSON of this format
    {
        "firstname": String,
        "middlename": String,
        "lastname": String,
        "suffix": String,
        "superuser": Boolean
    }
*/


// reference https://dev.to/durgeshsahani/react-crud-operations-using-php-api-and-mysql-13da



//connect to database
require_once('db-connect.php'); 

//retrieve what method was called
$method = $_SERVER['REQUEST_METHOD'];

//Retrieve input
$committee = json_decode(file_get_contents('php://input'));

//Prevent parsing error
$cookie_email = "email";




//Check if credentials exists
//todo
if( array_key_exists("email",$_COOKIE) and isset($_COOKIE["email"]) ){
    switch("$method") {
        //Only accepts GET requests
        case 'GET':
            $sql = "SELECT firstname, middlename, lastname, account_made_by, suffix FROM committee WHERE email='$_COOKIE[$cookie_email]' limit 1";

            $result = mysqli_query($con,$sql);
            
            //Check if user exists
            //CASE 2: User does not exist, Throw 403 error
            if(mysqli_num_rows($result)==0){
                header('HTTP/1.0 403 Forbidden');
                $con->close();
                exit();                
            }

            //Send the query results as JSON
            $res_send = array();
            while($row =mysqli_fetch_assoc($result)) $res_send[] = $row;
            
            //Sends A JSON without the array container
            $res_send = $res_send[0];
            
            if($res_send["account_made_by"]=="NULL") $res_send["superuser"] = true;
            else $res_send["superuser"]=false;
            unset($res_send["account_made_by"]);
            echo json_encode($res_send);

            break;
        }
}else{
    //CASE 1: No cookie Throw 401 Unauthorized error.
    header('HTTP/1.0 401 Unauthorized');
    $con->close();
    exit();
}
$con->close();