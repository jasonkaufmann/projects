<?php require 'Connections.php' ?>
<?php 
    if(isset($_POST["Register"])) {
    
    session_start();
    $FName = $_POST['First_Name'];
    $LName = $_POST['Last_Name'];
    $Email = $_POST['Email'];
    $PW = $_POST['Password'];
    
    $sql = $con->query("INSERT INTO users(Fname, Lname, Email, Password)Values('{$FName}', '{$LName}', '{$Email}', '{$PW}')");
    
    header('Location: Login.php');
}
?>

<!doctype html>
<html>
<head>
<link href="css/Menu.css" rel="stylesheet" type="text/css"/>
<link href="css/Master.css" rel="stylesheet" type="text/css"/>
<meta charset="utf-8">
<title>Register</title>
</head>
    
<body>
    <div class="Container">
        <h1>Photo Dole Register</h1>
            <div id="Menu">
                 <nav>
                    <ul class="cssmenu">

                        <li><a href="Register.php">Register</a></li>	

                        <li><a href="Login.php">Login</a></li>
                        <li><a href="Logout.php">Logout</a></li>

                    </ul>
                 </nav>
            </div>
        <div class="LeftBody"></div>
        <div class="RightBody">
            <form action="" method="post" name="RegisterForm" id="RegisterForm">
                <div class="FormElement"><input name="First_Name" type="text" required="required" class="TField" id="First_Name" placeholder="First Name"></div>
                <div class="FormElement"><input name="Last_Name" type="text" required="required" class="TField" id="Last_Name" placeholder="Last Name"></div>
                <div class="FormElement"><input name="Email" type="email" required="required" class="TField" id="Email" placeholder="Email"></div>
                <div class="FormElement"><input name="Password" type="password" required="required" class="TField" id="Password" placeholder="Password"></div>
                <div class="FormElement">
<input name="Register" type="submit" class="button" id="Register" value="Register"></input>                
</div>
            </form>
    </div>
        <div class="footer"></div>
    </div>
    
</body>




</html>