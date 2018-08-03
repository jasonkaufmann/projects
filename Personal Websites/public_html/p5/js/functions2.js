var upload = document.getElementById('upload');
var image = document.getElementById('image');
var filterAccess = document.getElementById('tempFilter');
var currentBrightness;
var currentContrast;
var currentBlur;
var currentSepia;
var currentHue;
var currentInvert;
var currentSaturate;
var currentOpacity;
var currentGrayscale;

var filterInUse;

function uploadImage(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            image.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

$("#upload").change(function(){
    uploadImage(this);
});

function setContrast(value)
{
    currentContrast = value;
    if(!filterInUse){
        applySliders();
    }
};

function setBrightness(value)
{
    currentBrightness = value;
    if(!filterInUse){
        applySliders2();
    }
};

function setBlur(value)
{
    currentBlur = value;
    if(!filterInUse){
        applySliders3();
    }
};
function setSepia(value)
{
    currentSepia = value;
    if(!filterInUse){
        applySliders4();
    }
};
function setHue(value)
{
    currentHue = value;
    if(!filterInUse){
        applySliders5();
    }
};
function setInvert(value)
{
    currentInvert = value;
    if(!filterInUse){
        applySliders6();
    }
};
function setSaturate(value)
{
    currentSaturate = value;
    if(!filterInUse){
        applySliders7();
    }
};
function setOpacity(value)
{
    currentOpacity = value;
    if(!filterInUse){
        applySliders8();
    }
};
function setGrayscale(value)
{
    currentGrayscale = value;
    if(!filterInUse){
        applySliders9();
    }
};

function applySliders()
{
    var filter = 'contrast(' + currentContrast + '%) ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders2()
{
    var filter = 'brightness(' + currentBrightness + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders3()
{
    var filter = 'blur(' + currentBlur + 'px) ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders4()
{
    var filter = 'sepia(' + currentSepia + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders5()
{
    var filter = 'hue-rotate(' + currentHue + 'deg) ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders6()
{
    var filter = 'invert(' + currentInvert + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders7()
{
    var filter = 'saturate(' + currentSaturate + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders8()
{
    var filter = 'opacity(' + currentOpacity + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};
function applySliders9()
{
    var filter = 'grayscale(' + currentGrayscale + ') ' ;
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyWillowFilter() 
{
    filterInUse = true;
    var filter = 'saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyXpro2Filter() 
{   
    filterInUse = true;
    var filter = 'contrast(1.3) brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-20deg)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyOriginalFilter() 
{
    filterInUse = true;
    var filter = '';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter;
};
function applyWaldenFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.35) contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyValenciaFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.15) saturate(1.5) contrast(0.9)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyToasterFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.4) saturate(2.5) hue-rotate(-30deg) contrast(0.67)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applySutroFilter() 
{
    filterInUse = true;
    var filter = 'brightness(0.75) contrast(1.3) sepia(0.5) hue-rotate(-25deg)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applySierraFilter() 
{
    filterInUse = true;
    var filter = 'contrast(0.8) saturate(1.2) sepia(0.15)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyRiseFilter() 
{
    filterInUse = true;
    var filter = ' saturate(1.4) sepia(0.25) hue-rotate(-15deg) contrast(0.8) brightness(1.1)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyWaldenFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.35) contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyNasvilleFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.4) saturate(1.5) contrast(0.9) brightness(1.1) hue-rotate(-15deg)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyMayfairFilter() 
{
    filterInUse = true;
    var filter = 'saturate(1.4) contrast(1.1)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyLofiFilter() 
{
    filterInUse = true;
    var filter = 'contrast(1.4) brightness(0.9) sepia(0.05)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyKelvinFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.4) saturate(2.4) brightness(1.3) contrast(1)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyInkwellFilter() 
{
    filterInUse = true;
    var filter = 'grayscale(1) brightness(1.2) contrast(1.05)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyHudsonFilter() 
{
    filterInUse = true;
    var filter = 'contrast(1.2) brightness(0.9) hue-rotate(-10deg)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyHefeFilter() 
{
    filterInUse = true;
    var filter = 'contrast(1.3) sepia(0.3) saturate(1.3) hue-rotate(-10deg) brightness(0.95)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyEarlybirdFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.4) saturate(1.6) contrast(1.1) brightness(0.9) hue-rotate(-10deg)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyBrannanFilter() 
{
    filterInUse = true;
    var filter = 'sepia(0.5) contrast(1.4)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function applyAmaroFilter() 
{
    filterInUse = true;
    var filter = 'hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.5)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function apply1977Filter() 
{
    filterInUse = true;
    var filter = 'sepia(0.5) hue-rotate(-30deg) saturate(1.2) contrast(0.8)';
    image.style.filter = filter;
    image.style.webkitFilter = filter;
    filterAccess.value = filter + ";";
};

function useSliders()
{
    filterInUse = false;
    applySliders();
    applySliders2();
    applySliders3();
    applySliders4();
    applySliders5();
    applySliders6();
    applySliders7();
    applySliders8();
    applySliders9();
};

function submit()
{
     // Read values from form
    var title = document.getElementById("title").value;
    //document.getElementById("debug").innerHTML = title;
    
    var text = document.getElementById("text").value;
    //document.getElementById("debug").innerHTML = text;
    
    // Save filtered image in a variable
    var filteredImage = image;
    // document.getElementById("debug").appendChild(filteredImage); 

    // Manipulate DOM:
    // 1. Clean up (remove) old stuff
    var parent = form.parentElement;
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
        
    // 2. Make room for new stuff: formatted title & text + filtered image
    parent.innerHTML = '<h2>' + title + '</h2><p>' + text + '</p>';
    parent.appendChild(filteredImage);   
};


