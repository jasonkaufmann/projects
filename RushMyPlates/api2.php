<?php /* Template Name: API2 */ ?>
<?php
$SRC=$_POST['SRC'];
$ch = curl_init('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCl3XF9go4hc6Dt6oVj6D0EnSe_wlUZLNo');
$post_vars='{
  "requests":[
    {
      "image":{
        "content":"';
 $post_vars.=$SRC;
 $post_vars.='"
      },
      "features":[
        {
          "type":"TEXT_DETECTION",
        }
      ]
    }
  ]
}';

curl_setopt($ch, CURLOPT_POSTFIELDS, $post_vars);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // this accepts any SSL certificate
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);

$result = curl_exec($ch);
echo $result;

?>
