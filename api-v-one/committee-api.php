<?php

/*
API for requests done on committee page.
For front-end requests:
    - API only listens to GET, PUT, POST, DELETE request methods
    - All request payload is at body stored in JSON format.
    - Only SUPERUSER can ACCESS this API (Temporary: Any account made by "NULL")
    Sample Request:
    Method: GET
    body: 
        {
            "session_email": <email_string>[*]
            "email": <email_string>[**]
            "lastname": <string>[***]
            "firstname": <string>[***]
            "middlename": <string>[***]
            "suffix": <string>[***]
            "password": <string>[***]
        }
    Legend:
        [*] Field is always required at ALL request methods
        [**] Field is required on PUT, POST, and DELETE request methods
        [***] Field is required on PUT and POST methods
    
*/


// reference https://dev.to/durgeshsahani/react-crud-operations-using-php-api-and-mysql-13da

/* various API calls for committee: POST, GET, PUT, DELETE */


//connect to database
require_once('db-connect.php'); 

//retrieve what method was called
$method = $_SERVER['REQUEST_METHOD'];

//Retrieve input
$committee = json_decode(file_get_contents('php://input'));

/*
   ==========
   = NOTICE =
   ==========
    This verification method is still insecure.
    For future reference, validation is done using jwt or query in session table
*/

//Check if credential exists

if(property_exists($committee,'session_email')){
    $sql = "SELECT account_made_by from committee where email = '$committee->session_email'";
    $result = mysqli_query($con,$sql);
    $verified = false;
}else{
    //CASE 1: NO Credentials. Throw 401 Unauthorized error.
    header('HTTP/1.0 401 Unauthorized');
    $con->close();
    exit();
}

//Checks if user is superuser (Superuser's account is made by 'NULL')
//CASE 2: User does not exist. Throw 401 Unauthorized error.
if(mysqli_num_rows($result)==0){     
    header('HTTP/1.0 401 Unauthorized');
    mysqli_free_result($result);
}else{
    //CASE 3: User is not a superuser. Throw 403 Forbidden error.
    $checker = mysqli_fetch_assoc($result);
    if($checker['account_made_by'] == "NULL"){
        $verified = true;
    }
    else{
        header('HTTP/1.0 403 Forbidden');
        mysqli_free_result($result);
    }
}

//Case 4: User is superuser. Has privilege to access/modify full DB content
if($verified){
    //determine which method was called
    switch("$method") {

        //POST for adding new committee users
        case 'POST':

            //check first if email already exists in the database
            $sql = "SELECT email FROM committee where email = '$committee->email' ";
            $result = mysqli_query($con,$sql);

            //if not, proceed with adding new user to database
            if(mysqli_num_rows($result)==0){     

                //Encrypts password into SHA-256 hash.
                $encrypted_password = hash('sha256',$committee->password);
                //sql query 
                $sql = "INSERT INTO committee VALUES (  '$committee->email', 
                                                        '$committee->session_email', 
                                                        '$encrypted_password', 
                                                        '$committee->lastname', 
                                                        '$committee->firstname', 
                                                        '$committee->middlename', 
                                                        '$committee->suffix')";

                //save result
                $result = mysqli_query($con,$sql);
              
            } else {
                echo $committee->email . "already exists";
                mysqli_free_result($result);
            } 
         
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

            //check first if email already exists in the database
            $sql = "SELECT email FROM committee where email = '$committee->email' ";
            $result = mysqli_query($con,$sql);

            //if so, proceed
            if(mysqli_num_rows($result)==1){
                $encrypted_password = hash('sha256',$committee->password);
                $sql = "UPDATE committee SET    email = '$committee->email',
                                                password = '$encrypted_password', 
                                                lastname = '$committee->lastname', 
                                                firstname = '$committee->firstname', 
                                                middlename ='$committee->middlename', 
                                                suffix = '$committee->suffix' WHERE email = '$committee->email'";
                $result = mysqli_query($con,$sql);
            } else {
                //else, exit
                echo $committee->email . "does not exists";
                mysqli_free_result($result);
            }

            break;

        case 'DELETE':

            //check first if email already exists in the database
            $sql = "SELECT email FROM committee where email = '$committee->email' ";
            $result = mysqli_query($con,$sql);

            //if so, proceed
            if(mysqli_num_rows($result)==1){
                $sql = "DELETE from committee WHERE email = '$committee->email'";
                $result = mysqli_query($con,$sql);
            } else {
                //else, exit
                echo $committee->email . "does not exists";
                mysqli_free_result($result);
            }

            break;
    }
}
$con->close();