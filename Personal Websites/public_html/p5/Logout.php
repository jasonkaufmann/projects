<?php require 'Connections.php' ?>
<?php 
session_start();
unset($_SESSION["UserID"]);
session_destroy();
?>
<!doctype html>
<html>
<head>
<link href="./css/Master.css" rel="stylesheet" type="text/css"/>
<link href="./css/Menu.css" rel="stylesheet" type="text/css"/>
<meta charset="utf-8">
<title>Register</title>
</head>
    
<body>
    <div class="Container">
        <h1>Photo Dole Logout</h1>
            <div id="Menu">
                 <nav>
                    <ul class="cssmenu">

                        <li><a href="Register.php">Register</a></li>	

                        <li><a href="Login.php">Login</a></li>	

                    </ul>
                 </nav>
            </div>
        <div class="LeftBody"></div>
        <div class="RightBody">
        <h3 align="center">You have been logged out</h3>
            </div>
        <div class="footer"></div>
    </div>
    
</body>




</html>