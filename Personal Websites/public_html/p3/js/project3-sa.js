/* The function below is the same as the first in the project3-area.js and project3-volume.js and is based off of the framework created by Dr.Marques. It is also comprised of a set of if else statements that activate when a certain option is clicked on.*/
function createSecondaryMenu() {
    elName = document.getElementById("sa1");
    if (elName.value === "cube") {
        newElement = document.getElementById("sec-menu");
        /* The code has to be in the same string and not spaced out on different lines to work correctly*/
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/cube.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var cube = function(surfacearea) {
            document.getElementById("result").innerHTML =
                "Surface Area" + " " + "= <br/>" + " " + surfacearea + " " + "units" + " " + "squared";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            cube((6) * (a * a));
            /*The below code is used to make sure that the input is a positive number*/
            var input1 = document.getElementById("a").value
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        /* The below code is used to make the button with id="reset" make the page blank*/
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value === "rec-prism") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><p>b=</p><input type="text" id="b"/><p>c=</p><input type="text" id="c"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/rec-prism.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var recprism = function(surfacearea) {
            document.getElementById("result").innerHTML =
                "Surface Area" + " " + "= <br/>" + " " + surfacearea + " " + "units" + " " + "squared";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            var b = document.getElementById("b").value;
            var c = document.getElementById("c").value;
            recprism((2 * a * b) + (2 * b * c) + (2 * a * c));
            var input1 = document.getElementById("a").value;
            var input2 = document.getElementById("b").value;
            var input3 = document.getElementById("c").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value === "prism") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>b (area of base)=</p><input type="text" id="b1"/><p>b (perimeter of base)=</p><input type="text" id="b2"/><p>L=</p><input type="text" id="l"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/irr-prism.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var irrprism = function(volume) {
            document.getElementById("result").innerHTML =
                "Surface Area" + " " + "= <br/>" + " " + volume + " " + "units" + " " + "squared";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("b1").value;
            var b = document.getElementById("b2").value;
            var c = document.getElementById("l").value;
            irrprism((b * c) + (2 * a));
            var input1 = document.getElementById("b1").value;
            var input2 = document.getElementById("b2").value;
            var input3 = document.getElementById("l").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value === "sphere") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/sphere.jpg" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        /* In the below code I used two parameters for convenience in showing the answer with the pi multiplied out and in terms of pi*/
        var sphere = function(surfacearea1, surfacearea2) {
            document.getElementById("result").innerHTML =
                "Surface Area" + " " + "= <br/>" + " " + surfacearea1 + " " + "units" + " " + "squared" + " " + "or <br/>" + " " + surfacearea2 + "\u03c0" + " " + "units" + " " + "squared";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            sphere(4 * 3.1415 * (a * a), 4 * (a * a));
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
    } else if (elName.value === "cylinder") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/cylinder.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var cylinder = function(surfacearea1, surfacearea2) {
            document.getElementById("result").innerHTML =
                "Surface Area" + " " + "= <br/>" + " " + surfacearea1 + " " + "units" + " " + "squared" + " " + "or <br/>" + " " + surfacearea2 + "\u03c0" + " " + "units" + " " + "squared";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            var b = document.getElementById("h").value;
            cylinder(2 * 3.1415 * (a * a) + (2 * 3.1415 * a * b), (2 * ((a * a) + (a * b))));
            var input1 = document.getElementById("r").value;
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
    }
}