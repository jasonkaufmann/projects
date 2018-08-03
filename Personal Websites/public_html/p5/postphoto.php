<?php require 'Connections.php' ?>
<?php
session_start();
if(isset($_SESSION["UserID"])) {
} else 
{
header('Location: Login.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<!-- Image Uploader -->
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Post Photo - Photo Dole</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/clean-blog.css" rel="stylesheet">
    <link href="css/clean-blog.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    
    <!-- Style was used below because if it is in the css file the sizing does not work. Possibly revise later.-->
    <style>
    .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      width: 70%;
      margin: auto;
  }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="Logout.php">Log Out</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a  href="index.php">Photo Strip</a>
                    </li>
                    <li>
                        <a  href="postphoto.php">Post Photo</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('images/phonepic.jpg')">
        <div class="container">
         
                    <div class="page-heading">
                        <h1>Post</h1>
                        <span class="subheading">Photo</span>
                </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">    
		<div class="row">
			<div id="formParent" class="col-md-8 col-md-offset-2">
				<form id="form" class="form-horizontal" method="POST" action="fileUploadAction.php" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="text" class="control-label col-xs-1">Name:</label><br><br>
                        <div class="col-xs-11">
                            <input type="text" class="form-control" id="text" name="username" maxlength="24" placeholder="Jason" required=""></input>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="text" class="control-label col-xs-1">Title:</label><br><br>
                        <div class="col-xs-11">
                            <input type="text" class="form-control" id="text" name="title" maxlength="139" placeholder="Awesome Photo" required=""></input>
                        </div>
                    </div>
                      
                    <div class="form-group">
                        <label for="text" class="control-label col-xs-1">Caption:</label><br><br>
                        <div class="col-xs-11">
                            <input type="text" class="form-control" id="text" name="caption" maxlength="139" placeholder="140 characters" required=""></input>
                        </div>
                    </div>
                    <table>
        <tr>
            <td>
            <div class= "form-group">
                        <label class="sr-only" for="image">Original Image</label>
                        <img id="image" name="image" width="100%" style="-webkit-filter: contrast(100%) brightness(1);">
                        <input type="file" id="upload" name="upload" accept="image/*"/><br>
                    </div>
            </td>
            <td>
            <div align="center"><div id="carousel-example-generic" class="carousel slide" data-autoplay="false" data-ride="carousel">
 
  <!-- Wrapper for slides -->

            <p align="right">Filters (Click filter name to apply filter) :</p> 
            <!-- Style was used below because if it is not directly in the div (meaning using another class) the sizing does not work. Possibly revise later-->
        <div class="form-group">  
            <div style="width:300px; height:210px;" class="carousel-inner">
                <div class="item active">
                  <img src="img/xpro2.jpg" alt="...">
                <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="xpro2" value="X Pro II" onclick="applyXpro2Filter();removeDropdown();"></input></h4>
                  </div>
                </div>
                    <div class="item">
                  <img src="img/willow.jpg" alt="...">
                <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="willow" value="Willow" onclick="applyWillowFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/walden.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="walden" value="Walden" onclick="applyWaldenFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/valencia.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="valencia" value="Valencia" onclick="applyValenciaFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/toaster.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="toaster" value="Toaster" onclick="applyToasterFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/sutro.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="sutro" value="Sutro" onclick="applySutroFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/sierra.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="sierra" value="Sierra" onclick="applySierraFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/rise.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="rise" value="Rise" onclick="applyRiseFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/original.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="original" value="Original" onclick="applyOriginalFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/nashville.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" id="nashville" value="Nashville" onclick="applyNashvilleFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/mayfair.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="mayfair" value="Mayfair" onclick="applyMayfairFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/lofi.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="xpro2" value="Lofi" onclick="applyLofiFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/kelvin.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="kelvin" value="Kelvin" onclick="applyKelvinFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/inkwell.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="inkwell" value="Inkwell" onclick="applyInkwellFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/hudson.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="hudson" value="Hudson" onclick="applyHudsonFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/hefe.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="hefe" value="Hefe" onclick="applyHefeFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/earlybird.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="earlybird" value="Earlybird" onclick="applyEarlybirdFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/brannan.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="brannan" value="Brannan" onclick="applyBrannanFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/amaro.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="amaro" value="Amaro" onclick="applyAmaroFilter();removeDropdown();"></input></h4>
                  </div>
                </div>
                <div class="item">
                  <img src="./img/1977.jpg" alt="...">
                    <div class="carousel-caption">
                    <h4><input type="button" class="nobac" name="filter" id="xpro2" value="1977" onclick="apply1977Filter();removeDropdown();"></input></h4>
                  </div>
                </div>
                    </div><br>
</div>

              <!-- Controls -->
              <a  href="#carousel-example-generic" role="button" data-slide="prev">
                Previous<span class="glyphicon glyphicon-chevron-left"></span>
              </a>
              <a  href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right">Next</span>
              </a>
                            </div></div> <br>
            </td>
            </tr>
            </table>
        
                    <div class="form-group">
                        <input type="button" name="custom" id="custom" value="Customize" onclick="createSecondaryDropdown(); applyOriginalFilter();useSliders();">
                         <br>
                         <div id="sec-menu"></div> <!-- Placeholder for secondary dropdown -->
                    </div>
            <div align="center">
                    <input type="submit" name="submit" class="btn btn-primary col-md-offset-1">
                    <input type="button" id="resetForm"  value="Start over!" class="btn btn-default" onclick="location.reload();">
        </div>
                    
                    <div class="form-group">
                            <div class="input-group">
                                <input type="hidden" class="form-control" id="tempFilter" name="tempFilter" value="contrast(100%) brightness(1);">
                            </div>
                    </div>
                    
				</form>
			</div>
		</div>
	</div>


    <hr>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <ul class="list-inline text-center">
                     <!--   <li>
                            <a href="#">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>   -->
                    </ul>
                    <p class="copyright text-muted">Theme from Bootstrap &copy; Photo Dole 2015</p>
                </div>
            </div>
        </div>
    </footer>

<script src="js/jquery.min.js"></script>
    <!-- Custom Theme JavaScript -->
<script src="https://maxcdn.bootstrap.cdn.com/bootstrap/3.3.5/js/min.js"></script>
<!-- jQuery -->
<script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.js"></script>

    <!-- Custom Theme JavaScript -->
<script src="js/clean-blog.min.js"></script>
<!-- Javascript for about.php-->
<script src="js/functions2.js"></script>
<script src="js/test.js"></script>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>


</body>

</html>
