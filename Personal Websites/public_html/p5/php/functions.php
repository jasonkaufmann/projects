<?php
/*
 * Utility function that convert for format found in ini settings such as 
 * ini_get("upload_max_filesize") into a number of bytes
 * @return {int} number of bytes
 */
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    switch($last) {
        // The 'G' modifier is available since PHP 5.1.0
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }

    return $val;
}

/*
 * Cleans a string to prevent injection attacks.  Currently strips tags and 
 * slashes, converts html entities, and escapes sql queries.
 * @return {string}
 */
function sanitize_string($str) {
    $str = strip_tags($str);
    $str = htmlentities($str);
    $str = implode("", explode("//", $str));
    $str = stripslashes( trim($str) );
    return $str;
}