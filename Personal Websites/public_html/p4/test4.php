<!DOCTYPE html>
<html>
<head>
    <title>Weather Forecast</title>
	
	<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

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
                <a class="navbar-brand topnav" href="index.php">Home</a>
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
	
<div id="forecast">
    <h1>Weather Finder</h1>
	<br>
    <form name="weather">
        <!-- autofocus and required are used so the text field is required to fill in and is already focused on when the page is loaded so a click is not necessary-->
        <p>Location: <br><input name="location" id="location" type="text" autofocus required/><br><br>(city, state or city, country (if out of US) )</p>
        <p><button id="find_weather">Find Weather</button></p>
    </form>

<script>
  // Attach event handler to button
  document.getElementById("find_weather").addEventListener("click",find_weather,false);
  // Get user input and submit form
  function find_location(){
    document.upcoming_form.location.value = document.getElementById("location").value;
    document.upcoming_form.submit();
  }     
</script>

<?php

ini_set("display_errors", "1");

/* The following code was based off of examples from the yahoo developer website and the example created by Dr. Marques*/
$BASE_URL = "https://query.yahooapis.com/v1/public/yql";

function sanitizeString($str)
{
    $str = strip_tags($str);
    $str = htmlentities($str);
    return $str;
}

if(isset($_GET["location"])){
    $location = sanitizeString($_GET["location"]);  
    $weather = "";  
     
    // Form YQL query and build URI to YQL Web service
    $yql_query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='$location')";
    $yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";

    // Make call with cURL
    $session = curl_init($yql_query_url);
    curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
    $json = curl_exec($session);
    // Convert JSON to PHP object 
    $phpObj =  json_decode($json);

        // Confirm that results were returned before searching server information
        if(!is_null($phpObj->query->results)){
        // Examine results and extract data to display
        // $cha for channel variable was created below to simplify the data location and extraction process
        $cha = $phpObj->query->results->channel;
        $weather .= '<h3>' . $cha->location->city . ', ' . $cha->location->region . ', ' . $cha->location->country . '</h3>';
          $weather .= $cha->item->description."<br>";
          $weather .= "Wind Direction:" . " " . $cha->wind->direction . "&#176;" . " " . "(in North azimuth degrees)" . "<br>" . "Wind Speed:" . " " . $cha->wind->speed . " " . "mph" . "<br>";
          $weather .= "Latitude :". " ". $cha->item->lat. "<br>". "Longitude :". " ". $cha->item->long. "<br>";
          $weather .= "Last Refreshed :". " ". $cha->item->pubDate. "<br>";
        }
    
        //makes sure that input is not a number
        else if(is_numeric($location)){
            $weather = " '$location' is not a valid input. Please input the name of a city.";
        }
        //informs user if there input was not found on the server
        else {
            echo " '$location' was not found.";
        }
    
    // Display results and unset the global array $_GET
    echo $weather;
    unset($_GET);
  }
?> 

	</div>
 
</body>
</html>
