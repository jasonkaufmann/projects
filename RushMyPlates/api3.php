<?php /* Template Name: API3 */ ?>
<?php
$URL=$_POST['URL'];
$ch = curl_init($URL); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
echo $data;
?>
