<?php
ini_set('display_errors','1');

include_once 'php/functions.php';
require_once 'php/db_connect.php';

// Handle the file upload
$target_dir = '/home/jkaufmann2015/public_html/p5/uploads';
$target_file = $target_dir . basename($_FILES['upload']['name']);
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
// rename to upload time to avoid naming conflicts
$target_file = $target_dir . $_SERVER['REQUEST_TIME'] . '.' . $imageFileType;

// checks if file is an image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES['upload']['tmp_name']);
    if($check !== false) {
        $uploadOk = true;
    } else {
        $uploadOk = false;
    }
}

// Check file size
if($_FILES['upload']['size'] > return_bytes(ini_get("upload_max_filesize"))) {
    $uploadOk = false;
}

// Check if the files already exists
if(file_exists($target_file)) {
    $uploadOk = false;
}

// Move uploaded file
if($uploadOk) {
    if( !(move_uploaded_file($_FILES['upload']['tmp_name'], $target_file)) ) {
        $uploadOk = false; 
    }
}

// UPDATE THE DATABASE

if($uploadOk) {
    // gets values from post
    if(isset($_POST['username'])) {
        $username = sanitize_string($_POST['username']);
    } else {
        $username = null;
    }
    if(isset($_POST['title'])) {
        $title = sanitize_string($_POST['title']);
    } else {
        $title = null;
    }
    if(isset($_POST['caption'])) {
        $caption = sanitize_string($_POST['caption']);
    } else {
        $caption = null;
    }
    if(isset($_POST['tempFilter'])) {
        $filter = sanitize_string($_POST['tempFilter']);
    } else {
        $filter = null;
    }
    $imageName = substr( strrchr($target_file, '/'), 1);
    
    // create the sql query
    $query = "INSERT INTO wall (USER_USERNAME, STATUS_TEXT, STATUS_TITLE, "
           . "IMAGE_NAME, TIME_STAMP, FILTER) VALUES (?, ?, ?, ?, ?, ?);";
    
    // Prepare the statement
    $statement = $db->prepare($query);
    
    // bind parameters
    $statement->bind_param('ssssss', $username, $caption, $title, $imageName, 
            $_SERVER['REQUEST_TIME'], $filter);
    
    if($statement->execute()) {
        header( 'Location: index.php#wall');
    } else {
        //
    }
    
    $statement->close();
} else {
    print_r($_POST);
    print_r($_FILES);
}

$db->close();
