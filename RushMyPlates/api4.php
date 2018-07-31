<?php /* Template Name: API4 */ ?>
<?php
require(__DIR__ . '/vendor/autoload.php');
$client = TaxJar\Client::withApiKey("96445d401e8b752708705a353b9e0490");
$categories = $client->categories();
echo $categories;
?>
