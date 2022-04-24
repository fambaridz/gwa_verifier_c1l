<?php

$host="localhost";
$user="root";
$password="";
$db="users_128";

$con = mysqli_connect($host,$user,$password,$db);

if(isset($_POST['username'])){
    $uname=$_POST['username'];
    $password2=$_POST['password'];

    $sql="select * from logincreds where user='".$uname."' AND pass='".$password2."' limit 1";
    $result=mysqli_query($con, $sql);

    if(mysqli_num_rows($result)==1){
        echo " You are logged in ";
        exit();
    }else{
        echo "Username of password is invalid";
        exit();
    }
}

?>

<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <form action="#" method="POST">
        <input type="text" name="username" placeholder="User Name"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="submit" name="submit" value="LOGIN" class="login-button"/>
    </form>
</body>
</html>