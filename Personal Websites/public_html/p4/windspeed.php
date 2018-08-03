<!DOCTYPE html>
<html>
<head>
	<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Wind Speed Converter</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/landing-page.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div class="container topnav">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topnav" href="index.php#topus">Home</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="./test4.php">Forecast</a>
                    </li>
                    <li>
                        <a href="./windspeed.php">Wind Speed Converter</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
</body>
		
<body>
	<div id="wind">	
    <div class="container">        
            <div class="col-md-6 col-md-offset-3">
             <form class="form-horizontal"  method="POST">
                <div class="form-group">
					<h2 align="center">Wind Speed Unit Converter</h2>
                    <label for="windspeed">Wind Speed</label>
                    <input type="text" id="windspeed" name="windspeed" class="form-control" required autofocus>
                </div>

                <div class="form-group"> 
                    <div class="checkbox-inline">
                        <label for="miles_per_hour">Miles Per Hour to Kilometer Per Hour</label>
                        <input type="radio" name="conversion" id="miles_per_hour" value="miles_per_hour" checked>
                     </div>

                     <div class="checkbox-inline">
                        <label for="kilometer_per_hour">Kilometer Per Hour to Miles Per Hour</label>
                        <input type="radio" name="conversion" id="kilometer_per_hour" value="kilometer_per_hour">
                     </div>
                 </div> 

                <div class="form-group">
					<input type="submit" class="btn btn-primary"></input>
                </div>
            </form>
        </div>
<?php
ini_set('display_errors', '1');

function removeSlashes($string)
{
    $string=implode("",explode("\\",$string));
    return stripslashes(trim($string));
}

function sanitizeString($str)
{
    $str = strip_tags($str);
    $str = htmlentities($str);
    $str = removeSlashes($str);
    return $str;
}

function toMilesPerHour($kilometer_per_hour)
{
    return ($kilometer_per_hour * 0.621371); 
}

function toKilometerPerHour($miles_per_hour)
{
    return($miles_per_hour * 1.609344); 
}

function displayErrorMessage()
{
    echo "<div class=\"col-md-6 col-md-offset-3\">".
    "<div class=\"alert alert-danger\" role=\"alert\">" . "Error!" . "</div>". "</div>";
}

if(isset($_POST['windspeed']))
{
    // sanitize windspeed
    $windspeed = sanitizeString($_POST['windspeed']);
    
    // $output = "Error!";
    $startDiv = "<div class=\"col-md-6 col-md-offset-3\">"."<div class=\"alert alert-success\" role=\"alert\">";
    $endDiv = "</div>". "</div>";
    
    // business logic
    
    if (is_numeric($windspeed))
    {
        if($_POST['conversion'] === 'miles_per_hour')
        {
            $output = $startDiv . $windspeed . " mi/h = " . toKilometerPerHour($windspeed) . " km/h" . $endDiv;
        }
        else if($_POST['conversion'] === 'kilometer_per_hour')
        {
            $output = $startDiv . $windspeed . " km/h = " . toMilesPerHour($windspeed) . " mi/h" . $endDiv;
        }
        else
        {
            // for future buttons (if any)
            // should not enter this part of the code
        } 
        echo $output;
    } 
    else // User input was not a valid number
    {
        displayErrorMessage();   
    }
    

    // OLD BUSINESS LOGIC BELOW
    /*
    if($_POST['conversion'] === 'fahrenheit')
    {
        if (is_numeric($temperature))
        {
            $output = $startDiv . $temperature . " F = " . toCelsius($temperature) . " C" . $endDiv;
             echo $output;
        }
        else
        {
            displayErrorMessage();
        }
    }
    else if($_POST['conversion'] === 'celsius')
    {
        if (is_numeric($temperature))
        {
            $output = $startDiv . $temperature . " C = " . toFahrenheit($temperature) . " F" . $endDiv;  
             echo $output;
        }
        else
        {
            displayErrorMessage();
        }     
    }
    else
    {
        // for future buttons (if any)
        // should not enter this part of the code
    }*/
}
?> 
        </div>
    </div>
    <!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>
</html>
