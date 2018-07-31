var wto;
var times=0;
var make;
var model;
var year;
$(document).ready(function() {
 $("#field66402009").on("input", function() {
  $("#preview").css("display", "none");
  document.getElementById("label66402009").classList.remove("loading8");
   var VIN = document.getElementById("field66402009").value;
   document.getElementById("verification").classList.remove("fsValidationError");
   document.getElementById("verification").classList.remove("verificationGreen");
   document.getElementById("fsCell66402009").classList.remove("fsValidationError");
   if (VIN != "") {
     document.getElementById("label66425137").className = "loading1";
     document.getElementById("label66425138").className = "loading2";
     document.getElementById("label66425140").className = "loading3";
     document.getElementById("label66427573").className = "loading4";
     document.getElementById("label66402018").className = "loading5";
     document.getElementById("label66402011").className = "loading6";
     document.getElementById("label66764231").className = "loading7";
   }
   document.getElementById("verification").innerHTML = "";
   clearTimeout(wto);
   wto = setTimeout(function() {
     console.log(VIN);
     if (VIN == "") {
       document.getElementById("field66425137").value = "";
       document.getElementById("field66425138").value = "";
       document.getElementById("field66425140").value = "";
       document.getElementById("field66402018").value = "Please select an option";
       document.getElementById("field66402011").value = "Please select an option";
       document.getElementById("field66427573").value = "";
       document.getElementById("field66764231").innerHTML = "";
       document.getElementById("label66425137").classList.remove("loading1");
       document.getElementById("label66425138").classList.remove("loading2");
       document.getElementById("label66425140").classList.remove("loading3");
       document.getElementById("label66427573").classList.remove("loading4");
       document.getElementById("label66402018").classList.remove("loading5");
       document.getElementById("label66402011").classList.remove("loading6");
       document.getElementById("label66764231").classList.remove("loading7");
     } else {

      var url = "api";
       $.ajax({
         url: url,
         type: "POST",
         data: {
           'VIN': VIN
         },
         contentType: "application/x-www-form-urlencoded",
         crossDomain: true,
         dataType: "json",
         headers: {
           'Access-Control-Allow-Origin': true
         },
         success: function(data) {
           try {
             console.log(data);
             if (data.query_responses['Request-Sample'].query_error.error_message == "") {
               document.getElementById("label66425137").classList.remove("loading1");
               document.getElementById("label66425138").classList.remove("loading2");
               document.getElementById("label66425140").classList.remove("loading3");
               document.getElementById("label66427573").classList.remove("loading4");
               document.getElementById("label66402018").classList.remove("loading5");
               document.getElementById("label66402011").classList.remove("loading6");
               document.getElementById("label66764231").classList.remove("loading7");
               document.getElementById("verification").classList.remove("fsValidationError");
               document.getElementById("verification").classList.remove("validationGreen");
               document.getElementById("fsCell66402009").classList.remove("fsValidationError");
               document.getElementById("field66425137").value = "";
               document.getElementById("field66425138").value = "";
               document.getElementById("field66425140").value = "";
               document.getElementById("field66402018").value = "Please select an option";
               document.getElementById("field66402011").value = "Please select an option";
               document.getElementById("field66427573").value = "";
               document.getElementById("field66764231").innerHTML = "";
               make = data.query_responses['Request-Sample'].us_market_data.common_us_data.basic_data.make;
               model = data.query_responses['Request-Sample'].us_market_data.common_us_data.basic_data.model;
               year = data.query_responses['Request-Sample'].us_market_data.common_us_data.basic_data.year;
               var vehicletype = data.query_responses['Request-Sample'].us_market_data.common_us_data.basic_data.body_type;
               var fueltype = data.query_responses['Request-Sample'].us_market_data.common_us_data.engines['0'].fuel_type;
               var cylinder = data.query_responses['Request-Sample'].us_market_data.common_us_data.engines['0'].ice_cylinders;
               if (fueltype == "Gasoline") {
                 fueltype = "Gas";
               }
               if (fueltype == "Flex Fuel") {
                 fueltype = "Flex";
               }
               if (fueltype == "Electric") {
                 document.getElementById("field66427573").type = "hidden";
                 document.getElementById("label66427573").style.visibility = "hidden";
               } else {
                 document.getElementById("field66427573").type = "text";
                 document.getElementById("label66427573").style.visibility = "visible";
               }
               if (vehicletype != null) {
                 if (vehicletype == "Cabriolet/Convertible") {
                   vehicletype = "Convertible";
                 } else if (vehicletype == "Sport Utility Vehicle (SUV)/Multi Purpose Vehicle (MPV)") {
                   vehicletype = "SUV";
                 } else if (vehicletype == "Pickup") {
                   vehicletype = "Pick-Up Truck";
                 } else if (vehicletype.includes("Van") || vehicletype == "Minivan") {
                   vehicletype = "Van";
                 } else if (vehicletype == "Sedan") {
                   vehicletype = "4-Door Sedan";
                 } else if (vehicletype.includes("Motorcycle")) {
                   vehicletype = "Motorcycle";
                 }
               }

               document.getElementById("field66425137").value = year;
               document.getElementById("field66425138").value = make.toUpperCase();
               document.getElementById("field66425140").value = model.toUpperCase();
               document.getElementById("field66427573").value = cylinder;
               if (fueltype == null || fueltype != "Gas" || fueltype != "Diesel" || fueltype != "Electric") {
                 console.log(fueltype);
                 document.getElementById("field66402018").value = "Please select an option";
               }
               if (fueltype == "Gas" || fueltype == "Diesel" || fueltype == "Electric") {
                 console.log(fueltype);
                 document.getElementById("field66402018").value = fueltype;
               }
               if (vehicletype == null || vehicletype != "2-Door Coupe" || vehicletype != "4-Door Sedan" || vehicletype != "Convertible" || vehicletype != "Pick-Up Truck" || vehicletype != "SUV" || vehicletype != "Van" || vehicletype != "Motorcycle" || vehicletype != "Trailer") {
                 console.log(vehicletype);
                 document.getElementById("field66402011").value = "Please select an option";
               }
               if (vehicletype == "2-Door Coupe" || vehicletype == "4-Door Sedan" || vehicletype == "Convertible" || vehicletype == "Pick-Up Truck" || vehicletype == "SUV" || vehicletype == "Van" || vehicletype == "Motorcycle" || vehicletype == "Trailer") {
                 console.log(vehicletype);
                 document.getElementById("field66402011").value = vehicletype;
                  $("#field66402011").trigger('change');
               }
               document.getElementById("verification").innerHTML = "";
               document.getElementById("verification").innerHTML = "Make sure autocompleted fields are correct";
               document.getElementById("verification").classList.add("verificationGreen");
               var number = data.query_responses['Request-Sample'].us_market_data.us_styles.length;
               console.log(number);
               var select = document.getElementById('field66764231');
               var length = select.options.length;
               console.log(length);
               console.log(select);
               document.getElementById("field66764231").innerHTML = "";
               console.log(select);
               var opt = document.createElement('option');
               opt.value = "";
               opt.innerHTML = "Please select an option"
               select.appendChild(opt);
               for (var i = 0; i < number; i++) {
                 var opt = document.createElement('option');
                 opt.value = data.query_responses['Request-Sample'].us_market_data.us_styles[i].name.toUpperCase();
                 opt.innerHTML = data.query_responses['Request-Sample'].us_market_data.us_styles[i].name.toUpperCase();
                 select.appendChild(opt);
               }
               console.log(select);
               photo_video();
             } else {
               try{
                 if (VIN.length==17) {
               var gov = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/";
               var format = "?format=json"
               var  url =  gov+VIN+format;
               $.ajax({
                 url: url,
                 type: "GET",
                 dataType: "json",
                 success: function(data) {
                   document.getElementById("label66425137").classList.remove("loading1");
                   document.getElementById("label66425138").classList.remove("loading2");
                   document.getElementById("label66425140").classList.remove("loading3");
                   document.getElementById("label66427573").classList.remove("loading4");
                   document.getElementById("label66402018").classList.remove("loading5");
                   document.getElementById("label66402011").classList.remove("loading6");
                   document.getElementById("label66764231").classList.remove("loading7");
                   document.getElementById("verification").classList.remove("fsValidationError");
                   document.getElementById("verification").classList.remove("verificationGreen");
                   document.getElementById("fsCell66402009").classList.remove("fsValidationError");
                   console.log(data);
                   try {
                   make =data.Results[5].Value;
                   console.log(make);
                  model =data.Results[7].Value;
                  console.log(model);
                  year =data.Results[8].Value;
                  console.log(year);
                  document.getElementById("verification").innerHTML = "";
                  document.getElementById("verification").innerHTML = "Make sure autocompleted fields are correct";
                  document.getElementById("verification").classList.add("verificationGreen");
                } catch(err) {
                  document.getElementById("fsRow3123304-97").hidden=true;
                }
                   document.getElementById("field66425137").value = year;
                   document.getElementById("field66425138").value = make.toUpperCase();
                   document.getElementById("field66425140").value = model.toUpperCase();
                   photo_video();
                 },
                 error: {
                 }   })
               } else  {
                 document.getElementById("fsCell66402009").classList.add("fsValidationError");
                 document.getElementById("verification").innerHTML = "Make sure VIN is correct. Enter info manually if needed.";
                 document.getElementById("verification").classList.add("fsValidationError");
                 document.getElementById("field66425137").value = "";
                 document.getElementById("field66425138").value = "";
                 document.getElementById("field66425140").value = "";
                 document.getElementById("field66402018").value = "Please select an option";
                 document.getElementById("field66402011").value = "Please select an option";
                 document.getElementById("field66427573").type = "text";
                 document.getElementById("label66427573").style.visibility = "visible";
                 document.getElementById("field66427573").value = "";
                 var select = document.getElementById('field66764231');
                 var length = select.options.length;
                 console.log(length);
                 document.getElementById("field66764231").innerHTML = "";
                 console.log(select);
                 document.getElementById("label66425137").classList.remove("loading1");
                 document.getElementById("label66425138").classList.remove("loading2");
                 document.getElementById("label66425140").classList.remove("loading3");
                 document.getElementById("label66427573").classList.remove("loading4");
                 document.getElementById("label66402018").classList.remove("loading5");
                 document.getElementById("label66402011").classList.remove("loading6");
                 document.getElementById("label66764231").classList.remove("loading7");
               }
             } catch(err) {}
             }
             } catch(err) {
               document.getElementById("fsCell66402009").classList.add("fsValidationError");
               document.getElementById("verification").innerHTML = "Make sure VIN is correct. Enter info manually if needed.";
               document.getElementById("verification").classList.add("fsValidationError");
               document.getElementById("field66425137").value = "";
               document.getElementById("field66425138").value = "";
               document.getElementById("field66425140").value = "";
               document.getElementById("field66402018").value = "Please select an option";
               document.getElementById("field66402011").value = "Please select an option";
               document.getElementById("field66427573").type = "text";
               document.getElementById("label66427573").style.visibility = "visible";
               document.getElementById("field66427573").value = "";
               var select = document.getElementById('field66764231');
               var length = select.options.length;
               console.log(length);
               document.getElementById("field66764231").innerHTML = "";
               console.log(select);
             }
         },
         error: function() {

         }
       });
     }
 }, 750);
 });
});

function photo_video() {
document.getElementById("field66647668").value="none";
var url1="https://api.fuelapi.com/v1/json/vehicle/"
var url2= "https://api.fuelapi.com/v1/json/vehicles/?";
var api_key = "&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
console.log(year);
console.log(model);
console.log(make);
var url3=url2+"year="+year+"&"+"model="+model+"&"+"make="+make+api_key;
url3 =url3.replace(/\s+/g, '');
console.log(url3);
$.ajax({
  url: url3,
  type: "GET",
  contentType: "application/x-www-form-urlencoded",
  crossDomain: true,
  dataType: "json",
  success: function(data) {
    try {
     console.log(data);
     var id = data["0"].id;
     console.log(id);
   $.ajax({
       url: "./api3",
       type: "POST",
       data: {
         "URL":url1+id+api_key
       },
       crossDomain: true,
       dataType: "json",
       success: function(data) {
         document.getElementById("fsRow3123304-112").hidden=false;
           console.log(data);
             if (data.products["0"].productFormats["0"].assets) {
               console.log("searching for photos");
               var video = data.products["0"].productFormats["0"].assets;
               for (i=0;i<video.length;i++) {
                 if (video[i].shotCode.code=="116") {
                   var photo = video[i].url;
                       console.log(photo);
                   document.getElementById("field66647668").value=photo;
             }
           }
         } else {
         }
             try {
               var video1 = data.products[8].productFormats[0].assets["0"].url;
               console.log(video1);
               document.getElementById("aliciasucks").src=video1;
               var video=  document.getElementById("alicia");
               video.load();
               video.play();
               document.getElementById("fsCell66672188").hidden=false;
             } catch(err) {
               try {
               var video1 = data.products[9].productFormats[1].assets["0"].url;
               console.log(video1);
               document.getElementById("aliciasucks").src=video1;
               var video=  document.getElementById("alicia");
               video.load();
               video.play();
               document.getElementById("fsCell66672188").hidden=false;
             } catch(err) {
               console.log("no videos");
               document.getElementById("fsCell66672188").hidden=true;
             }
             }
           }
           })
} catch(err) {
console.log(error);
}
}
})
}

$(document).ready(function() {
 $("#field66764231").change(function() {
   var VIN = document.getElementById("field66402009").value;
   var url = "api";
   $.ajax({
     url: url,
     type: "POST",
     data: {
       'VIN': VIN
     },
     contentType: "application/x-www-form-urlencoded",
     crossDomain: true,
     dataType: "json",
     headers: {
       'Access-Control-Allow-Origin': true
     },
     success: function(data) {
       try {
         if (document.getElementById("field66764231").value != "Please select and option") {
           var number = data.query_responses['Request-Sample'].us_market_data.us_styles.length;
           var style = document.getElementById("field66764231").value;
           console.log(number);
           for (var i = 0; i < number; i++) {
             var string = i.toString();
             if (data.query_responses['Request-Sample'].us_market_data.us_styles[string].name.toUpperCase()==style) {
               var choice = i;
             }
           }
           console.log(choice);
           choice = choice.toString();
           var specs = data.query_responses['Request-Sample'].us_market_data.us_styles[choice].standard_specifications;
           console.log(specs);
           var length = specs.length;
           console.log(length);
           for (i = 0; i < length; i++) {
             var titles = specs[i];
             console.log(titles);
             if (titles.specification_category == "Weights and Capacities") {
               var spec_values = titles.specification_values;
               var array = spec_values.length;
               console.log(array);
               for (i = 0; i < array; i++) {
                 var id = spec_values[i];
                 if (id.specification_name == "Curb Weight") {
                   var weight = id.specification_value;
                   console.log(weight);
                   var fee = get_reg(weight);
                   document.getElementById("field66765320").disabled = false;
                  if(!document.getElementById("field66765320").value) {
                    document.getElementById("field66765320").value=fee;
                    var subtract=0;
                    console.log(subtract);
                  } else{
                    var subtract=document.getElementById("field66765320").value;
                    console.log(Number(subtract));
                    document.getElementById("field66765320").value=fee;
                  }
                  var total = document.getElementById("field66777864").value
                  total=Number(total)+Number(fee)-subtract;
                  console.log(total);
                  document.getElementById("field66777864").value=total;
                   document.getElementById("field66402021").disabled = false;
                   document.getElementById("field66402021").value = weight;
                   break;
                 }
               }
               break;

             }
           }
         }
       } catch(err) {
         console.log("error");
       }
     }
   })
 })
});


$(document).ready(function() {
$("#field66402011").change( function () {
  document.getElementById("field66765401").disabled = false;
if (document.getElementById("field66402011").value != "Trailer" && document.getElementById("field66402011").value != "Other") {
  document.getElementById("field66765401").value="Motor Vehicle";
  console.log('motor vehicle');
} else if (document.getElementById("field66402011").value == "Trailer") {
    document.getElementById("field66765401").value="Trailer";
    console.log('trailer');
} else {
}
}
)
})

$(document).ready(function() {
$("#field66401969").change( function () {
      console.log("flag");
      /*var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
      console.log(isSafari);*/
      document.getElementById("fsCell66672188").hidden=true;
     document.getElementById("field66777864").value=75.00;
      document.getElementById("fsRow3123304-138").childNodes[1].classList.add("box");
      document.getElementById("fsRow3123304-138").childNodes[3].classList.add("box");
      document.getElementById("fsRow3123304-138").childNodes[5].classList.add("box");
      document.getElementById("fsRow3123304-139").childNodes[1].classList.add("box");
      document.getElementById("fsRow3123304-139").childNodes[3].classList.add("box");
})
})

$(document).ready(function() {
$("#field66401971").change( function () {
      console.log("flag");
      if (document.getElementById("field66401971_2").checked) {
       document.getElementById("field66777198").value=0.00;
     }
})
})
$(document).ready(function() {
$("#field66765353").change( function () {
      console.log("flag");
      var zip;
      if (document.getElementById('field66401992-zip').value) {
      zip = document.getElementById('field66401992-zip').value;
      }
      if (document.getElementById("field66401998-zip").value) {
      zip = document.getElementById("field66401998-zip").value;
      }
      var rate=tax_rate(zip);
      document.getElementById('field66808197').value=rate;
      console.log(rate);
      var tax = this.value*rate;
      if (tax>725.00) {
        tax=725.00;
      }
      console.log(tax);
      if(!document.getElementById("field66777198").value) {
       document.getElementById("field66777198").value=tax;
       var subtract=0;
     } else{
       var subtract=document.getElementById("field66777198").value;
       console.log(Number(subtract));
       document.getElementById("field66777198").value=tax;
     }
      var total =document.getElementById("field66777864").value;
      total=Number(total)+Number(tax)-subtract;
      console.log(total);
      document.getElementById("field66777864").value=total;
})
})

$(document).ready(function() {
$("#field66765464_2").change( function () {
  if(this.checked) {
    document.getElementById("field66765463").value="None";
  }
})
})

$(document).ready(function() {
$("#field66765464_1").change( function () {
  if(this.checked) {
    document.getElementById("field66765463").value="";
  }
})
})

$(document).ready(function() {
$("#field66765441_2").change( function () {
  if(this.checked) {
    document.getElementById("field66765463").value="None";
  }
})
})
$(document).ready(function() {
$("#field66765441_1").change( function () {
  if(this.checked) {
    document.getElementById("field66765463").value="";
  }
})
})

function get_reg(weight) {
  var fee;
  if (weight>0 && weight<=1650) {
    fee=26.00;
  } else if (weight>1651 && weight<=1750) {
    fee=27.50;
  } else if (weight>1751 && weight<=1850) {
    fee=29.00;
  } else if (weight>1851 && weight<=1950) {
    fee=31.00;
  } else if (weight>1951 && weight<=2050) {
    fee=32.50;
  } else if (weight>2051 && weight<=2150) {
    fee=34.00;
  } else if (weight>2151 && weight<=2250) {
    fee=35.50;
  } else if (weight>2251 && weight<=2350) {
    fee=37.50;
  } else if (weight>2351 && weight<=2450) {
    fee=39.00;
  } else if (weight>2451 && weight<=2550) {
    fee=40.50;
  } else if (weight>2551 && weight<=2650) {
    fee=42.00;
  } else if (weight>2651 && weight<=2750) {
    fee=43.50;
  } else if (weight>2751 && weight<=2850) {
    fee=45.50;
  } else if (weight>2851 && weight<=2950) {
    fee=47.00;
  } else if (weight>2951 && weight<=3050) {
    fee=48.50;
  } else if (weight>3051 && weight<=3150) {
    fee=50.00;
  } else if (weight>3151 && weight<=3250) {
    fee=52.00;
  } else if (weight>3251 && weight<=3350) {
    fee=53.50;
  } else if (weight>3351 && weight<=3450) {
    fee=55.00;
  } else if (weight>3451 && weight<=3550) {
    fee=56.50;
  } else if (weight>3551 && weight<=3650) {
    fee=59.00;
  } else if (weight>3651 && weight<=3750) {
    fee=61.50;
  } else if (weight>3751 && weight<=3850) {
    fee=64.00;
  } else if (weight>3851 && weight<=3950) {
    fee=66.50;
  } else if (weight>3951 && weight<=4050) {
    fee=69.00;
  } else if (weight>4051 && weight<=4150) {
    fee=71.00;
  } else if (weight>4151 && weight<=4250) {
    fee=73.50;
  } else if (weight>4251 && weight<=4350) {
    fee=76.00;
  } else if (weight>4351 && weight<=4450) {
    fee=78.50;
  } else if (weight>4451 && weight<=4550) {
    fee=81.00;
  } else if (weight>4551 && weight<=4650) {
    fee=83.50;
  } else if (weight>4651 && weight<=4750) {
    fee=85.50;
  } else if (weight>4751 && weight<=4850) {
    fee=88.00;
  } else if (weight>4851 && weight<=4950) {
    fee=90.50;
  } else if (weight>4951 && weight<=5050) {
    fee=93.00;
  } else if (weight>5051 && weight<=5150) {
    fee=95.50;
  } else if (weight>5151 && weight<=5250) {
    fee=98.00;
  } else if (weight>5251 && weight<=5350) {
    fee=100.50;
  } else if (weight>5351 && weight<=5450) {
    fee=102.50;
  } else if (weight>5451 && weight<=5550) {
    fee=105.00;
  }  else if (weight>5551 && weight<=5650) {
    fee=107.50;
  }  else if (weight>5651 && weight<=5750) {
    fee=110.00;
  }  else if (weight>5751 && weight<=5850) {
    fee=112.50;
  }  else if (weight>5851 && weight<=5950) {
    fee=115.00;
  }  else if (weight>5951 && weight<=6050) {
    fee=117.00;
  }  else if (weight>6051 && weight<=6150) {
    fee=119.50;
  }  else if (weight>6151 && weight<=6250) {
    fee=122.00;
  }  else if (weight>6251 && weight<=6350) {
    fee=124.50;
  }  else if (weight>6351 && weight<=6450) {
    fee=127.00;
  }  else if (weight>6451 && weight<=6550) {
    fee=129.50;
  }  else if (weight>6551 && weight<=6650) {
    fee=131.50;
  }  else if (weight>6651 && weight<=6750) {
    fee=134.00;
  }  else if (weight>6751 && weight<=6850) {
    fee=136.50;
  }  else if (weight>6851 && weight<=6950) {
    fee=139.00;
  }  else if (weight>=6951) {
    fee=140.00;
  } else {
  }
  return fee;
}
$(document).ready(function() {
 $("#field66402018").on("mouseout", function() {
   document.getElementById("field66427573").type = "text";
   document.getElementById("label66427573").style.visibility = "visible";
   if (document.getElementById("field66402018").value == "Electric") {
     document.getElementById("field66427573").type = "hidden";
     document.getElementById("label66427573").style.visibility = "hidden";
   }
 })
 $("#field66402011").on("mouseover", function() {
   if (document.getElementById("field66402018").value == "Electric") {
     document.getElementById("field66427573").type = "hidden";
     document.getElementById("label66427573").style.visibility = "hidden";
     document.getElementById("electric").innerHTML = "";
   } else {
     document.getElementById("field66427573").type = "text";
     document.getElementById("label66427573").style.visibility = "visible";
   }
 })
 $("#field66402017").on("mouseover", function() {
   if (document.getElementById("field66402018").value == "Electric") {
     document.getElementById("field66427573").type = "hidden";
     document.getElementById("label66427573").style.visibility = "hidden";
     document.getElementById("electric").innerHTML = "";
   } else {
     document.getElementById("field66427573").type = "text";
     document.getElementById("label66427573").style.visibility = "visible";
   }
 })
});

$(document).ready(function() {
 $("#field66401992-state").change(function() {
   console.log("flag");
   if (document.getElementById("field66401997_2").checked || document.getElementById("field66401992-state").value == "NY" || document.getElementById("field66401992-state").value == "") {
     console.log("error2");
     document.getElementById("state_error").innerHTML = "";
     document.getElementById("state_final").innerHTML = "";
   }
   if (document.getElementById("field66401997_1").checked && document.getElementById("field66401992-state").value != "NY" && document.getElementById("field66401992-state").value != "") {
     console.log("error1");
     document.getElementById("state_error").innerHTML = `You have to live in NY to fill register a vehicle. You must check "No" and enter your physical address`;
   }
 })

$('input[type=radio][id=field66402020_2]').change(function() {
  var time;
  clearTimeout(time);
  wto = setTimeout(function() {
  console.log("laden");
  document.getElementById("field66402021").disabled = false;
},2000);
})

$('input[type=radio][name=field66765464]').change(function() {
  console.log("nepotism?");
  if (document.getElementById('field66765464_1').checked) {
  document.getElementById("field66793330").value="Yes";
  console.log("yes nepotism");
} else if (document.getElementById('field66765464_2').checked) {
  document.getElementById("field66793330").value="No";
  console.log("no nepotism");
}
})

$('input[type=radio][name=field66765441]').change(function() {
  console.log("nepotism?");
  if (document.getElementById('field66765441_1').checked) {
  document.getElementById("field66793330").value="Yes";
  console.log("yes nepotism");
} else if (document.getElementById('field66765441_2').checked) {
  document.getElementById("field66793330").value="No";
  console.log("no nepotism");
}
})

$('input[type=radio][name=field66401997]').change(function() {
  console.log("flaggy");
  if (document.getElementById("field66401997_2").checked || document.getElementById("field66401992-state").value == "NY" || document.getElementById("field66401992-state").value == "") {
    console.log("error2");
    document.getElementById("state_error").innerHTML = "";
    document.getElementById("state_final").innerHTML = "";
  }
  if (document.getElementById("field66401997_1").checked && document.getElementById("field66401992-state").value != "NY" && document.getElementById("field66401992-state").value != "") {
    console.log("error1");
    document.getElementById("state_error").innerHTML = `Yoreu have to live in NY to fill register a vehicle. You must check "No" and enter your physical address`;
  }
}
)
$("#field66401998-state").change(function() {
  console.log("flag");
  if (document.getElementById("field66401997_2").checked && document.getElementById("field66401998-state").value != "NY" && document.getElementById("field66401998-state").value != "") {
    console.log("error2");
    document.getElementById("state_final").innerHTML = "This address must be in New York.";
  } else {
    document.getElementById("state_final").innerHTML = "";
  }
})
})

function tax_rate(zipcode) {
  var url="https://api.taxjar.com/v2/rates/"+zipcode;
  var number;
$.ajax({
  url: url,
  type: "GET",
  async: false,
  headers: {
    "Authorization": `Token token="96445d401e8b752708705a353b9e0490"`
  },
  contentType: "application/x-www-form-urlencoded",
  success: function(data) {
    console.log(data);
    var rate=data.rate.combined_rate;
    console.log(rate);
    number= Number(rate);
    console.log(number);
  }
})
return number;
}

var placeSearch;

$(document).ready(function() {
 $("#field66401998-address") .on('input click',function() {
initAutocomplete_physical();
}
)
}
)
$(document).ready(function() {
 $("#field66401982-address").on('input click',function() {
initAutocomplete_owner();
}
)
}
)
$(document).ready(function() {
 $("#field66402046-address").on('input click',function() {
initAutocomplete_seller();
}
)
}
)
$(document).ready(function() {
 $("#field66401992-address").on('input click',function() {
initAutocomplete();
}
)
}
)
var componentForm = {
 street_number: 'short_name',
 route: 'long_name',
 locality: 'long_name',
 administrative_area_level_1: 'short_name',
  administrative_area_level_2: 'short_name',
 country: 'long_name',
 postal_code: 'short_name'
};

function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
         var autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('field66401992-address')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed',   function () {
                fillInAddress(autocomplete);
            });
      }
      function initAutocomplete_physical() {
              // Create the autocomplete object, restricting the search to geographical
              // location types.
            var autocomplete = new google.maps.places.Autocomplete(
                  /** @type {!HTMLInputElement} */(document.getElementById('field66401998-address')),
                  {types: ['geocode']});

              // When the user selects an address from the dropdown, populate the address
              // fields in the form.
              autocomplete.addListener('place_changed',   function () {
                      fillInAddress_physical(autocomplete);
                  });
            }
            function initAutocomplete_owner() {
                    // Create the autocomplete object, restricting the search to geographical
                    // location types.
                    var autocomplete = new google.maps.places.Autocomplete(
                        /** @type {!HTMLInputElement} */(document.getElementById('field66401982-address')),
                        {types: ['geocode']});

                    // When the user selects an address from the dropdown, populate the address
                    // fields in the form.
                    autocomplete.addListener('place_changed',   function () {
                            fillInAddress_owner(autocomplete);
                        });
                  }
                  function initAutocomplete_seller() {
                          // Create the autocomplete object, restricting the search to geographical
                          // location types.
                          var autocomplete = new google.maps.places.Autocomplete(
                              /** @type {!HTMLInputElement} */(document.getElementById('field66402046-address')),
                              {types: ['geocode']});

                          // When the user selects an address from the dropdown, populate the address
                          // fields in the form.
                          autocomplete.addListener('place_changed',   function () {
                                  fillInAddress_seller(autocomplete);
                              });
                        }
            function fillInAddress(autocomplete) {
              var place = autocomplete.getPlace();
            console.log(place);
            document.getElementById('field66401992-address').id = 'street_number';
            document.getElementById('field66401992-address2').id = 'route';
            document.getElementById('field66401992-city').id = 'locality';
             document.getElementById('field66401992-state').id = 'administrative_area_level_1';
               document.getElementById('field66498604').id = 'administrative_area_level_2';
               document.getElementById('field66401992-zip').id = 'postal_code';
             // Get the place details from the autocomplete object.
                       for (var component in componentForm) {
                         document.getElementById(component).value = '';
                         document.getElementById(component).disabled = false;
                       }

                       // Get each component of the address from the place details
                       // and fill the corresponding field on the form.
                       for (var i = 0; i < place.address_components.length; i++) {
                         var addressType = place.address_components[i].types[0];
                         console.log(addressType);

                         if (componentForm[addressType] || addressType=="sublocality_level_1") {
                           if (addressType=="route" && place.address_components[0].types[0]=="street_number") {
                             var val1 = place.address_components[i][componentForm[addressType]];
                             var val2 = place.address_components[0][componentForm["street_number"]];
                             var val3=val2+" "+val1;
                             console.log(val3);
                             document.getElementById("street_number").value = val3;
                           } else if (addressType=="route" && place.address_components[0].types[0]!="street_number") {
                             var val = place.address_components[i][componentForm[addressType]];
                             console.log(val);
                             console.log("No!!!")
                             document.getElementById("street_number").value = val;
                           } else if (addressType=="administrative_area_level_2") {
                             var val = place.address_components[i][componentForm[addressType]];
                             var lastIndex = val.lastIndexOf(" ");
                            val = val.substring(0, lastIndex);
                            document.getElementById(addressType).value = val;
                          } else if (addressType=="sublocality_level_1") {
                            console.log("sublocality");
                            var val = place.address_components[i]["long_name"];
                            document.getElementById("locality").value = val;
                          } else {
                           var val = place.address_components[i][componentForm[addressType]];
                           document.getElementById(addressType).value = val;
                         }
                         }
                       }
                     document.getElementById('street_number').id = 'field66401992-address';
                     document.getElementById('route').id = 'field66401992-address2';
                     document.getElementById('locality').id = 'field66401992-city';
                      document.getElementById('administrative_area_level_1').id = 'field66401992-state';
                        document.getElementById('administrative_area_level_2').id = 'field66498604';
                        document.getElementById('postal_code').id = 'field66401992-zip';
                          $("#field66401992-state").trigger('change');
                   }
function fillInAddress_physical(autocomplete) {
  var place = autocomplete.getPlace();
console.log(place);
document.getElementById('field66401998-address').id = 'street_number';
document.getElementById('field66401998-address2').id = 'route';
document.getElementById('field66401998-city').id = 'locality';
 document.getElementById('field66401998-state').id = 'administrative_area_level_1';
   document.getElementById('field66818042').id = 'administrative_area_level_2';
   document.getElementById('field66401998-zip').id = 'postal_code';
 // Get the place details from the autocomplete object.
           for (var component in componentForm) {
             document.getElementById(component).value = '';
             document.getElementById(component).disabled = false;
           }

           // Get each component of the address from the place details
           // and fill the corresponding field on the form.
           for (var i = 0; i < place.address_components.length; i++) {
             var addressType = place.address_components[i].types[0];
             console.log(addressType);
             if (componentForm[addressType] || addressType=="sublocality_level_1") {
               if (addressType=="route" && place.address_components[0].types[0]=="street_number") {
                 var val1 = place.address_components[i][componentForm[addressType]];
                 var val2 = place.address_components[0][componentForm["street_number"]];
                 var val3=val2+" "+val1;
                 console.log(val3);
                 document.getElementById("street_number").value = val3;
               } else if (addressType=="route" && place.address_components[0].types[0]!="street_number") {
                 var val = place.address_components[i][componentForm[addressType]];
                 console.log(val);
                 console.log("No!!!")
                 document.getElementById("street_number").value = val;
               } else if (addressType=="administrative_area_level_2") {
                 var val = place.address_components[i][componentForm[addressType]];
                 var lastIndex = val.lastIndexOf(" ");
                val = val.substring(0, lastIndex);
                document.getElementById(addressType).value = val;
              } else if (addressType=="sublocality_level_1") {
                console.log("sublocality");
                var val = place.address_components[i]["long_name"];
                document.getElementById("locality").value = val;
              } else {
               var val = place.address_components[i][componentForm[addressType]];
               document.getElementById(addressType).value = val;
             }
             }
           }
         document.getElementById('street_number').id = 'field66401998-address';
         document.getElementById('route').id = 'field66401998-address2';
         document.getElementById('locality').id = 'field66401998-city';
          document.getElementById('administrative_area_level_1').id = 'field66401998-state';
            document.getElementById('administrative_area_level_2').id = 'field66818042';
            document.getElementById('postal_code').id = 'field66401998-zip';
              $("#field66401998-state").trigger('change');
       }
       function fillInAddress_owner(autocomplete) {
         var place = autocomplete.getPlace();
       console.log(place);
       document.getElementById('field66401982-address').id = 'street_number';
       document.getElementById('field66401982-address2').id = 'route';
       document.getElementById('field66401982-city').id = 'locality';
        document.getElementById('field66401982-state').id = 'administrative_area_level_1';
          document.getElementById('field66401983').id = 'administrative_area_level_2';
          document.getElementById('field66401982-zip').id = 'postal_code';
        // Get the place details from the autocomplete object.
                  for (var component in componentForm) {
                    document.getElementById(component).value = '';
                    document.getElementById(component).disabled = false;
                  }

                  // Get each component of the address from the place details
                  // and fill the corresponding field on the form.
                  for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    console.log(addressType);
                    if (componentForm[addressType] || addressType=="sublocality_level_1") {
                      if (addressType=="route" && place.address_components[0].types[0]=="street_number") {
                        var val1 = place.address_components[i][componentForm[addressType]];
                        var val2 = place.address_components[0][componentForm["street_number"]];
                        var val3=val2+" "+val1;
                        console.log(val3);
                        document.getElementById("street_number").value = val3;
                      } else if (addressType=="route" && place.address_components[0].types[0]!="street_number") {
                        var val = place.address_components[i][componentForm[addressType]];
                        console.log(val);
                        console.log("No!!!")
                        document.getElementById("street_number").value = val;
                      } else if (addressType=="administrative_area_level_2") {
                        var val = place.address_components[i][componentForm[addressType]];
                        var lastIndex = val.lastIndexOf(" ");
                       val = val.substring(0, lastIndex);
                       document.getElementById(addressType).value = val;
                     } else if (addressType=="sublocality_level_1") {
                       console.log("sublocality");
                       var val = place.address_components[i]["long_name"];
                       document.getElementById("locality").value = val;
                     } else {
                      var val = place.address_components[i][componentForm[addressType]];
                      document.getElementById(addressType).value = val;
                    }
                    }
                  }
                document.getElementById('street_number').id = 'field66401982-address';
                document.getElementById('route').id = 'field66401982-address2';
                document.getElementById('locality').id = 'field66401982-city';
                 document.getElementById('administrative_area_level_1').id = 'field66401982-state';
                   document.getElementById('administrative_area_level_2').id = 'field66401983';
                   document.getElementById('postal_code').id = 'field66401982-zip';
              }
              function fillInAddress_seller(autocomplete) {
                var place = autocomplete.getPlace();
              console.log(place);
              document.getElementById('field66402046-address').id = 'street_number';
              document.getElementById('field66402046-address2').id = 'route';
              document.getElementById('field66402046-city').id = 'locality';
               document.getElementById('field66402046-state').id = 'administrative_area_level_1';
                 document.getElementById('field66402047').id = 'administrative_area_level_2';
                 document.getElementById('field66402046-zip').id = 'postal_code';
               // Get the place details from the autocomplete object.
                         for (var component in componentForm) {
                           document.getElementById(component).value = '';
                           document.getElementById(component).disabled = false;
                         }

                         // Get each component of the address from the place details
                         // and fill the corresponding field on the form.
                         for (var i = 0; i < place.address_components.length; i++) {
                           var addressType = place.address_components[i].types[0];
                           console.log(addressType);
                           if (componentForm[addressType] || addressType=="sublocality_level_1") {
                             if (addressType=="route" && place.address_components[0].types[0]=="street_number") {
                               var val1 = place.address_components[i][componentForm[addressType]];
                               var val2 = place.address_components[0][componentForm["street_number"]];
                               var val3=val2+" "+val1;
                               console.log(val3);
                               document.getElementById("street_number").value = val3;
                             } else if (addressType=="route" && place.address_components[0].types[0]!="street_number") {
                               var val = place.address_components[i][componentForm[addressType]];
                               console.log(val);
                               console.log("No!!!")
                               document.getElementById("street_number").value = val;
                             } else if (addressType=="administrative_area_level_2") {
                               var val = place.address_components[i][componentForm[addressType]];
                               var lastIndex = val.lastIndexOf(" ");
                              val = val.substring(0, lastIndex);
                              document.getElementById(addressType).value = val;
                            } else if (addressType=="sublocality_level_1") {
                              console.log("sublocality");
                              var val = place.address_components[i]["long_name"];
                              document.getElementById("locality").value = val;
                            } else {
                             var val = place.address_components[i][componentForm[addressType]];
                             document.getElementById(addressType).value = val;
                           }
                           }
                         }

                       document.getElementById('street_number').id = 'field66402046-address';
                       document.getElementById('route').id = 'field66402046-address2';
                       document.getElementById('locality').id = 'field66402046-city';
                        document.getElementById('administrative_area_level_1').id = 'field66402046-state';
                          document.getElementById('administrative_area_level_2').id = 'field66402047';
                          document.getElementById('postal_code').id = 'field66402046-zip';
                     }


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
     var geolocation = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };
     var circle = new google.maps.Circle({
       center: geolocation,
       radius: position.coords.accuracy
     });
     autocomplete.setBounds(circle.getBounds());
   });
 }
}
/*$(document).ready(function() {
    $('#imageFile').change(function(evt) {
      document.getElementById("label66402009").className = "loading8";
      document.getElementById("verification").innerHTML = "";
      document.getElementById("verification").classList.remove("fsValidationError");
      var files = evt.target.files;
      var file = files[0];
      var img = document.createElement("img");
      img.src = e.target.result;

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var MAX_WIDTH = 1080;
      var MAX_HEIGHT = 720;
      var width = img.width;
      var height = img.height;

      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
      } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      if (file) {
  var formData = new FormData();
    formData.append("ifile", file);
                      url="http://www.recognition.ws/vinocr/v1?accesscode=26284d01-bdb9-497e-9c30-3b2587a1385d";
                      $.ajax({
                             url: url,
                             type: "POST",
                             data: formData,
                             contentType: false,
                             processData: false,
                             success: function(data) {
                               try{
                               console.log(data);
                               console.log(typeof data);
                              data = data.substring(data.indexOf(">") + 1);
                              console.log(data);
                              data = data.substring(data.indexOf(">") + 1);
                              console.log(data);
                              data = data.substring(data.indexOf(">") + 1);
                              console.log(data);
                              var VIN= data.substr(0, data.indexOf('<'));
                              console.log(VIN);
                               document.getElementById("field66402009").value=VIN;
                               $("#field66402009").trigger('input');
                             } catch {
                               document.getElementById("verification").innerHTML = "Couldn't see the numbers. Try again or input manually.";
                               document.getElementById("verification").classList.add("fsValidationError");
                               document.getElementById("label66402009").classList.remove("loading8");
                             }
                             }
                           })
               }
             })
           })*/
$(document).ready(function() {
             $('#imageFile').change(function(evt) {
               document.getElementById("verification").innerHTML = "";
               document.getElementById("verification").classList.remove("fsValidationError");

                 var files = evt.target.files;
                 var file = files[0];

                 if (file) {
                     var reader = new FileReader();
                     reader.onload = function(e) {
                         $("#preview").css("display", "none");
                         document.getElementById('preview').src = e.target.result;
                     };
                     reader.readAsDataURL(file);
                 }

              console.log("flag");
              document.getElementById("label66402009").className = "loading8";
              setTimeout(function(){ ResizeImage();}, 3000);
             });
         });

         function ResizeImage() {
             if (window.File && window.FileReader && window.FileList && window.Blob) {
                 var filesToUploads = document.getElementById('imageFile').files;
                 var file = filesToUploads[0];
                 if (file) {

                     var reader = new FileReader();
                     // Set the image once loaded into file reader
                     reader.onload = function(e) {

                         var img = document.createElement("img");
                         img.src = e.target.result;

                         var canvas = document.createElement("canvas");
                         var ctx = canvas.getContext("2d");
                         ctx.drawImage(img, 0, 0);

                         var MAX_WIDTH = 1080;
                         var MAX_HEIGHT = 720;
                         var width = img.width;
                         var height = img.height;

                         if (width > height) {
                             if (width > MAX_WIDTH) {
                                 height *= MAX_WIDTH / width;
                                 width = MAX_WIDTH;
                             }
                         } else {
                             if (height > MAX_HEIGHT) {
                                 width *= MAX_HEIGHT / height;
                                 height = MAX_HEIGHT;
                             }
                         }
                         canvas.width = width;
                         canvas.height = height;
                         var ctx = canvas.getContext("2d");
                         ctx.drawImage(img, 0, 0, width, height);

                         str = canvas.toDataURL(file.type);
                         console.log(str);
                         var src = str.substr(str.indexOf(",") + 1);
                         var url = "api2";
                         try {
                         $.ajax({
                                url: url,
                                type: "POST",
                                data: {
                                  'SRC': src
                                },
                                contentType: "application/x-www-form-urlencoded",
                                crossDomain: true,
                                dataType: "json",
                                headers: {
                                  'Access-Control-Allow-Origin': true
                                },
                                success: function(data) {
                                  try{
                                  console.log(data.responses[0]);
                                  var text=data.responses[0].textAnnotations[0].description;
                                  console.log(text);
    //text = text.replace(/\s+/g, '');
    var text2=text;
var val = text2.replace(/\D/g,' ');
val = val.replace(/ +(?= )/g,'');
    console.log(val);
    var split = val.split(" ");
    console.log(split);
    for (i=0;i<split.length;i++) {
      console.log("flag");
      if (split[i].length >5) {
        var long_num=split[i];
        var six = long_num.substring(split[i].length-6, split[i].length);
      }
    }
    console.log(six);
src = text.replace(/\s+/g, '');
console.log(src);
    var n = src.indexOf(six);
    console.log(n);
    var value =n-11;
    var get = src.substring(value, n);
    console.log(get);
                                  document.getElementById("field66402009").value=get+six;
                                  console.log(get+six);
                                  $("#field66402009").trigger('input');
                                } catch(err) {
                                  document.getElementById("verification").innerHTML = "Couldn't see the numbers. Try again or input manually.";
                                  document.getElementById("verification").classList.add("fsValidationError");
                                  document.getElementById("label66402009").classList.remove("loading8");
                                }
                                }
                              })
                            }
                            catch(err) {
                               document.getElementById("verification").innerHTML = "Couldn't see the numbers. Try again or input manually.";
                               document.getElementById("verification").classList.add("fsValidationError");
                               document.getElementById("label66402009").classList.remove("loading8");
                            }
                     }
                     reader.readAsDataURL(file);

                 }

             } else {
                 alert('The File APIs are not fully supported in this browser.');
             }
         }
function get_use_tax(weight, county) {
  console.log("use_tax");
  var use_tax;
  if (county=="Albany"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Albany"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Allegany"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Allegany"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Broome"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Broome"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Cattaraugus"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Cattaraugus"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Chautauqua"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Chautauqua"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Chemung"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Chemung"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Bronx") {
    use_tax=80.00;
  } else if (county=="Kings") {
    use_tax=80.00;
  } else if (county=="New York") {
    use_tax=80.00;
  } else if (county=="Queens") {
    use_tax=80.00;
  } else if (county=="Richmond") {
    use_tax=80.00;
  } else if (county=="Clinton"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Clinton"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Cortland"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Cortland"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Dutchess"&&weight<=3500) {
    use_tax=60.00;
  } else if (county=="Dutchess"&& weight>=3501) {
    use_tax=70.00;
  } else if (county=="Erie"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Erie"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Franklin"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Franklin"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Genesee"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Genesee"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Livingston"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Livingston"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Madison"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Madison"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Monroe"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Monroe"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Montgomery"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Montgomery"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Nassau") {
    use_tax=80.00;
  } else if (county=="Niagara"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Niagara"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Oneida"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Oneida"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Onondaga"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Onondaga"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Orange") {
    use_tax=50.00;
  } else if (county=="Orleans"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Orleans"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Oswego"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Oswego"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Putnam"&&weight<=3500) {
    use_tax=60.00;
  } else if (county=="Putnam"&& weight>=3501) {
    use_tax=70.00;
  } else if (county=="Rensselear"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Rensselear"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Rockland"&&weight<=3500) {
    use_tax=60.00;
  } else if (county=="Rockland"&& weight>=3501) {
    use_tax=70.00;
  } else if (county=="Schenectady"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Schenectady"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Schuyler"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Schuyler"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Steuben"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Steuben"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Suffolk"&&weight<=3500) {
    use_tax=80.00;
  } else if (county=="Suffolk"&& weight>=3501) {
    use_tax=110.00;
  } else if (county=="Sullivan"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Sullivan"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Tioga"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Tioga"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Tompkins"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Tompkins"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Ulster"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Ulster"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Warren"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Warren"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Washington"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Washington"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Westchester"&&weight<=3500) {
    use_tax=80.00;
  } else if (county=="Westchester"&& weight>=3501) {
    use_tax=110.00;
  } else if (county=="Wyoming"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Wyoming"&& weight>=3501) {
    use_tax=20.00;
  } else if (county=="Yates"&&weight<=3500) {
    use_tax=10.00;
  } else if (county=="Yates"&& weight>=3501) {
    use_tax=20.00;
  } else {
    use_tax=15.00;
  }
  return use_tax;
}
function get_master_number() {
  var master;
  var type = document.getElementById("field66401969").options[document.getElementById("field66401969").selectedIndex].value;
  console.log(type);
  if (type!="Register a Vehicle") {
    master = 0;
  } else {
    if (document.getElementById("field66401972_2").checked) {
        if (document.getElementById("field66402029_2").checked) {
          master=2;
        } else {
          master=1;
        }
    } else if (document.getElementById("field66401973_2").checked) {
            master=3;
    }
  }
  return master;
}
         $(document).ready(function() {
         $('#fsForm3123304').submit(function() {
           $( '<p class="fsLabel">Please wait while PDF loads</p> <br><p style="height:110px" class="submit_image"><br>' ).insertBefore( "#fsPreviousButton3123304" );
           var weight = document.getElementById("field66402021").value;
           var county;
           if (document.getElementById("field66498604").value) {
             county=document.getElementById("field66498604").value;
             document.getElementById("field66818584").value=county;
           } else if (document.getElementById("field66818042").value){
             county=document.getElementById("field66818042").value;
             document.getElementById("field66818584").value=county;
           }
           console.log(weight);
           console.log(county);
           var use_tax = get_use_tax(weight, county);
           console.log(use_tax);
           document.getElementById("field66817881").value=use_tax;
           var total=document.getElementById("field66777864").value;
             total=Number(total)+use_tax;
             document.getElementById("field66777864").value=total;
console.log("reached1");
           if (!document.getElementById("fsRow3123304-84").classList.contains("fsHidden") && document.getElementById("field66402028_2").checked) {
             document.getElementById("field66815620").value="No";
           }
           document.getElementById("field66402028_1").disabled=false;
           document.getElementById("field66402028_2").disabled=false;
           console.log("reached2");
  if(document.getElementById("field66793330").value=="Yes") {
    console.log("Yes");
    document.getElementById("field66808197").value="";
    var sales = document.getElementById("field66777198").value;
    var total=document.getElementById("field66777864").value;
    total=Number(total)-Number(sales);
    document.getElementById("field66777864").value=total;
    document.getElementById("field66777198").value="0";
  }
  console.log("reached3");
  var first_initial =document.getElementById('field66401988-first').value.charAt(0).toUpperCase();
  console.log(first_initial);
  var last_initial=document.getElementById('field66401988-last').value.charAt(0).toUpperCase();
  console.log(last_initial);
  document.getElementById("field66870835").value=first_initial;
  document.getElementById("field66905420").value=last_initial;
  document.getElementById("field66876720").value="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.formstack.com/admin/submission/view/";
  console.log("begin");
  document.getElementById("field66876721").value="/13937274?page=1";
  console.log("end");
  var master = get_master_number();
  document.getElementById("field66905422").value=master;
})
})
