/* The function below is the same as the first in the project3-area.js and is based off of the framework created by Dr.Marques. It is comprised of a set of if else statements that activate when a certain option is clicked on.*/
function createSecondaryMenu() {
    elName = document.getElementById("volume1");
    if (elName.value == "cube") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/cube.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var cube = function(volume) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            cube(a * a * a);
            /* The below code checks the input text to make sure that it is not negative, a character, or not filled out*/
            var input1 = document.getElementById("a").value
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0) {
                document.getElementById("result").innerHTML = "Make sure that each input is a positive number";
            } else {
                //do nothing
            }
        };
        /* The below code makes the screen clear if the button with id="reset" is pressed.*/
        document.getElementById("reset").onclick = function() {
            document.getElementById("sec-menu").innerHTML = "";
        };
    } else if (elName.value == "rec-prism") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>a=</p><input type="text" id="a"/><p>b=</p><input type="text" id="b"/><p>c=</p><input type="text" id="c"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/rec-prism.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var recprism = function(volume) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("a").value;
            var b = document.getElementById("b").value;
            var c = document.getElementById("c").value;
            recprism(a * b * c);
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
    } else if (elName.value == "irr-prism") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>b (area of base)=</p><input type="text" id="b"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/irr-prism.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var irrprism = function(volume) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("b").value;
            var b = document.getElementById("h").value;
            // Validate input before proceeding
            irrprism(a * b);
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
    } else if (elName.value == "cylinder") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate" ></input><p id="result"></p><img src="./images/cylinder.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var cylinder = function(volume1, volume2) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume1 + " " + "units" + " " + "cubed" + " " + "or <br/>" + " " + volume2 + "\u03c0" + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            var b = document.getElementById("h").value;
            cylinder((3.1415) * (a * a) * b, (a * a) * (b));
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
    } else if (elName.value == "pyramid") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>b (area of base)=</p><input type="text" id="b"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/pyramid.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var pyramid = function(volume1) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume1 + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("b").value;
            var b = document.getElementById("h").value;
            // Validate input before proceeding
            pyramid((1 / 3) * (a * b));
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
    } else if (elName.value == "cone") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><p>h=</p><input type="text" id="h"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/cone.gif" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var cone = function(volume1, volume2) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume1 + " " + "units" + " " + "cubed" + " " + "or <br/>" + " " + volume2 + "\u03c0" + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            var b = document.getElementById("h").value;
            // Validate input before proceeding
            cone((1 / 3) * (3.1415) * (a * a) * (b), (1 / 3) * (a * a) * (b));
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
    } else if (elName.value == "sphere") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r=</p><input type="text" id="r"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><br><br><img src="./images/sphere.jpg" align="middle"/><input type="button" id="reset" value="reset"/>';
        var sphere = function(volume1, volume2) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume1 + " " + "units" + " " + "cubed" + " " + "or <br/>" + " " + volume2 + "\u03c0" + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r").value;
            /* 3.1415 was used instead of using more decimal places to keep the answer a bit cleaner*/
            sphere((4 / 3) * (3.1415) * (a * a * a), (4 / 3) * (a * a * a));
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
    } else if (elName.value == "ellipsoid") {
        newElement = document.getElementById("sec-menu");
        newElement.innerHTML = '<p>r1=</p><input type="text" id="r1"/><p>r2=</p><input type="text" id="r2"/><p>r3=</p><input type="text" id="r3"/><br><br><input type="button" id="calculate" value="calculate"></input><p id="result"></p><img src="./images/ellipsoid.jpg" align="middle"/><br><br><input type="button" id="reset" value="reset"/>';
        var ellipsoid = function(volume1, volume2) {
            document.getElementById("result").innerHTML =
                "Volume" + " " + "= <br/>" + " " + volume1 + " " + "units" + " " + "cubed" + " " + "or <br/>" + " " + volume2 + "\u03c0" + " " + "units" + " " + "cubed";
        };

        document.getElementById("calculate").onclick = function() {
            var a = document.getElementById("r1").value;
            var b = document.getElementById("r2").value;
            var c = document.getElementById("r3").value;
            // Validate input before proceeding
            ellipsoid((4 / 3) * (3.1415) * (a * b * c), (4 / 3) * (a * b * c));
            var input1 = document.getElementById("r1").value;
            var input2 = document.getElementById("r2").value;
            var input3 = document.getElementById("r3").value;
            if (isNaN(input1) == true || input1 == null || input1 == "" || input1 <= 0 || isNaN(input2) == true || input2 == null || input2 == "" || input2 <= 0 || isNaN(input3) == true || input3 == null || input3 == "" || input3 <= 0) {
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