<?php /* Template Name: API5 */ ?>
<?php
$SRC=$_POST['SRC'];
$ch = curl_init(' https://eastus.api.cognitive.microsoft.com/face/v1.0/detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes]&subscription-key=ca9124a38612484b8ce2285c052ef458');
$post_vars='{"url:"'
$post_vars.=$SRC
post_vars.'}';

curl_setopt($ch, CURLOPT_POSTFIELDS, $post_vars);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // this accepts any SSL certificate
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);

$result = curl_exec($ch);
echo $result;

?>
