/* The function below allows for the input, images, and (behind the scenes) the functions to be ready to appear or execute if called on. This framework was created with the assistance of Dr.Marques in an if else if manner to allow for the appearance and execution of only certain portions of the code */
function createSecondaryMenu() {
    elName = document.getElementById("area1");
    if (elName.value == "square") {
        newElement = document.getElementById("sec-menu");
        /* Keep all of the information that is in the newElement.innerHTML on the same lines (no enters) because it doesn't appear if it is organized into separate lines*/
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/square.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        /* The function below is based off of the framework given in temperature.js file if needed for reference */
        var square = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            square(a * a);
            /* The below code makes sure that the input is not a character, that there is an input, and that the number is positive*/
            var input1 = document.getElementById("a").value
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        /*The below code is used to reset the look of the page if the button with id="reset" is clicked on. I would like the button also reset the select to the top option, but my efforts have not created the desireable results so I might want to improve on that*/
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "rectangle") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><p>b=</p><input type="text" id="b"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/rectangle.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var rectangle = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            var b = document.getElementById("b").value;
            rectangle(a * b);
            var input1 = document.getElementById("a").value;
            var input2 = document.getElementById("b").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "parallelogram") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>b=</p><input type="text" id="b"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/parallelogram.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var parallelogram = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("b").value;
            var b = document.getElementById("h").value;
            parallelogram(a * b);
            var input1 = document.getElementById("b").value;
            var input2 = document.getElementById("h").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "trapezoid") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>h=</p><input type="text" id="h"/><p>b1=</p><input type="text" id="b1"/><p>b2=</p><input type="text" id="b2"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/trapezoid.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var trapezoid = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("h").value;
            var b = document.getElementById("b1").value;
            var c = document.getElementById("b2").value;
            /* The parseFloat() function had to be used because the addition symbol was concatenating the numbers instead of adding them*/
            trapezoid(
                (1 / 2) * (a) * ((parseFloat(b) + parseFloat(c))));
            var input1 = document.getElementById("h").value;
            var input2 = document.getElementById("b1").value;
            var input3 = document.getElementById("b2").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "circle") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/circle.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        /* Starting here I began using two parameters for all of the formulas that included pi in order to gice two anwers, one with the pi actually multiplied out and the other in terms of pi, for convenience*/
        var circle = function(area1, area2) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area1 + " " + "units" + " " + "squared" + " " + "or <br/>" + " " + area2 + "\u03c0" + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            /* Math.PI is just a property that gives the value of pi*/
            circle(
                (
                    (a * a) * Math.PI), (a * a));
            var input1 = document.getElementById("r").value
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "ellipse") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r1=</p><input type="text" id="r1"/><p>r2=</p><input type="text" id="r2"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/ellipse.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var ellipse = function(area1, area2) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area1 + " " + "units" + " " + "squared" + " " + "or <br/>" + " " + area2 + "\u03c0" + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r1").value;
            var b = document.getElementById("r2").value;
            var b = document.getElementById("r2").value;
            ellipse(
                (
                    (a * b) * Math.PI), (a * b));
            var input1 = document.getElementById("r1").value;
            var input2 = document.getElementById("r2").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "triangle1") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>b=</p><input type="text" id="b"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/triangle.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var triangle1 = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("b").value;
            var b = document.getElementById("h").value;
            triangle1(
                (a * b) * (1 / 2));
            var input1 = document.getElementById("b").value;
            var input2 = document.getElementById("h").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "triangle2") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/equi-tri.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var triangle2 = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            /* The 1.73205 is the squareroot of 3 in the equilateral triangle formula*/
            triangle2(
                (1.73205 / 4) * (a * a));
            var input1 = document.getElementById("a").value
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "r-polygon") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>n (number of sides)=</p><input type="text" id="n"/><p id="wrongInput"></p><p>s (length from center to corner)=</p><input type="text" id="p"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/r-polygon.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var polygon = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("n").value;
            var b = document.getElementById("p").value;
            polygon(
                (1 / 2) * (a) * (Math.sin(6.2832 / a)) * (b * b));
            var input1 = document.getElementById("n").value;
            var input2 = document.getElementById("p").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            }
            /* The below code makes sure that the input for the number of sides is an integer and greater than or equal to 3*/
            else if(function(input1) { return parseInt(input1) != input1 } || input1 <= 3) {
                document.getElementById("result").innerHTML = "Make sure that the number of sides is an integer greater than 3";
            }
            else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "triangle3") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><p>b=</p><input type="text" id="b"/><p>c=</p><input type="text" id="c"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/triangle3.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var triangle3 = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            var b = document.getElementById("b").value;
            var c = document.getElementById("c").value;
            var s = (
                (parseFloat(a) + parseFloat(b) + parseFloat(c)) / 2);
            triangle3(Math.sqrt(
                (s) * (s - a) * (s - b) * (s - c)));
            var input1 = document.getElementById("a").value;
            var input2 = document.getElementById("b").value;
            var input3 = document.getElementById("c").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
            /*The below code makes it so that the domain of the above formula (Heron's formula) is satisfied, making the values able to create a triangle*/
            if (parseFloat(a) + parseFloat(b) < parseFloat(c) || parseFloat(a) + parseFloat(c) < parseFloat(b) || parseFloat(b) + parseFloat(c) < parseFloat(a)) {
                document.getElementById("result").innerHTML = "Not a triangle if one side is bigger than the other two combined. Please revise input";
            } else {
                //do nothing
            };
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "triangle4") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><p>b=</p><input type="text" id="b"/><p>C (in degrees)=</p><input type="text" id="c"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/triangle4.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var triangle4 = function(area) {
            document.getElementById("result").innerHTML = "Area" + " " + "= <br/>" + " " + area + " " + "units" + " " + "squared";
        };
        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            var b = document.getElementById("b").value;
            var c = document.getElementById("c").value;
            /* This if else statement below tries to alert the user if the angle they enter is over 180 degrees, but still needs improvement to working correctly*/
            triangle4(
                (1 / 2) * (a) * (b) * (Math.sin(
                    (3.1415 / 180) * (c))));
            var input1 = document.getElementById("a").value;
            var input2 = document.getElementById("b").value;
            var input3 = document.getElementById("c").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
            /*The below code makes the angle input restristed to between 0 and 180, so a negative value is not reported, due to any value of sin(x) that is above 180 being negative*/
            if (c >= 180) {
                document.getElementById("result").innerHTML = "Angle too large. Make sure the angle (in degrees) is between 0 and 180.";
            } else {
                //do nothing
            };
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } 
    /* The last else statement is used so if the user clicks back to the first option in the select a blank page appears, except for the select*/
    else {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '';
    }
}