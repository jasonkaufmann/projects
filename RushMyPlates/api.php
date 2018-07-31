<?php /* Template Name: API */ ?>
<?php
$VIN=$_POST['VIN'];
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$ch = curl_init('https://api.dataonesoftware.com/webservices/vindecoder/decode');
$post_vars = 'client_id=16753&authorization_code=fd39ec5a2aa5a31fc6e429db028ba5c345064312&decoder_query=';
$post_vars .= '
{
   "decoder_settings" : {
      "display" : "full",
      "version" : "7.2.0",
      "styles" : "on",
      "style_data_packs" : { 
         "basic_data" : "on",
         "pricing" : "off",
         "engines" : "off",
         "transmissions" : "off",
         "standard_specifications" : "on",
         "standard_generic_equipment" : "off",
         "oem_options" : "off",
         "optional_generic_equipment" : "off",
         "colors" : "off",
         "warranties" : "off",
         "fuel_efficiency" : "off",
         "green_scores" : "off",
         "crash_test" : "off",
         "awards" : "off"
      },
      "common_data" : "on",
      "common_data_packs" : { 
         "basic_data" : "on",
         "pricing" : "off",
         "engines" : "on",
         "transmissions" : "off",
         "standard_specifications" : "on",
         "standard_generic_equipment" : "off",
         "oem_options" : "off",
         "optional_generic_equipment" : "off",
         "colors" : "off",
         "warranties" : "off",
         "fuel_efficiency" : "off",
         "green_scores" : "off",
         "crash_test" : "off",
         "awards" : "off"
         }
   },
   "query_requests" : {
      "Request-Sample" : {
         "vin" : "'.$VIN.'",
         "year" : "",
         "make" : "",
         "model" : "",
         "trim" : "",
         "model_number" : "",
         "package_code" : "",
         "drive_type" : "",
         "vehicle_type" : "",
         "body_type" : "",
         "body_subtype" : "",
         "doors" : "",
         "bedlength" : "",
         "wheelbase" : "",
         "msrp" : "",
         "invoice_price" : "",
         "engine" : {
            "description" : "",
            "block_type" : "",
            "cylinders" : "",
            "displacement" : "",
            "fuel_type" : ""
         },
         "transmission" : {
            "description" : "",
            "trans_type" : "",
            "trans_speeds" : ""
         },
         "optional_equipment_codes" : "",
         "installed_equipment_descriptions" : "",
         "interior_color" : {
            "description" : "",
            "color_code" : ""
         },
         "exterior_color" : {
            "description" : "",
            "color_code" : ""
         }
      }
   }
}';
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_vars);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // this accepts any SSL certificate
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);

$result = curl_exec($ch);
echo $result;
?>