<?php require 'Connections.php' ?>
<?php
    
    if(isset($_POST['LogIn'])) {
    
    $EM = $_POST['email'];
    $PW = $_POST['Password'];
    
    $result = $con->query("SELECT * FROM users WHERE Email='$EM' AND Password='$PW'");
    
    $row = $result->fetch_assoc();
    
    
    session_start();
    
    $_SESSION["UserID"] = $row["UserID"];
    
    header('Location: postphoto.php');
} 
    
?>
<!doctype html>
<html>
<head>
<link href="css/Master.css" rel="stylesheet" type="text/css"/>
<link href="css/Menu.css" rel="stylesheet" type="text/css"/>
<meta charset="utf-8">
<title>Register</title>
</head>
    
<body>
    <div class="Container">
        <h1>Photo Dole Login</h1>
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
            <h4 align="center">No account? <a href="Register.php">Register here</a></h4>
        <form name="form1" method="post" action="">
       <div class="FormElement"><input name="email" type="email" required="required" class="TField" id="email" placeholder="Email"></div>
                <div class="FormElement"><input name="Password" type="password" required="required" class="TField" id="password" placeholder="Password"></div>
                <div class="FormElement">
<input name="LogIn" type="submit" onclick="DisplayError()" class="button" id="LogIn" value="Login"></input>                
</div>
        </form>
            </div>
        <div class="footer"></div>
    </div>
    
</body>




</html>