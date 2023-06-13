// get bg svg
var bg = document.getElementById("bg");
if (bg != null) {
    var bgSvg = bg.getElementsByTagName("svg")[0];
    if (bgSvg != null) {
        // get gradient colors
        var grad1 = bgSvg.getElementsByTagName("linearGradient")[0];
        var stop1 = grad1.getElementsByTagName("stop")[0];
        var stop2 = grad1.getElementsByTagName("stop")[1];
        // get refs to color pickers
        var colorPicker = document.getElementById("color-picker-input");
        var colorPickerBottom = document.getElementById("color-picker-input-bottom");

        // set gradient colors to color picker
        colorPicker.addEventListener("input", function () {
            SetBgColor(colorPicker.value, stop1);
        }, false);

        colorPickerBottom.addEventListener("input", function () {
            SetBgColor(colorPickerBottom.value, stop2);
        }, false);

        // init the colors to color picker values
        function SetBgColor(color, stop) {
            stop.setAttribute("style", "stop-color:" + color + ";stop-opacity:1");
        }
        // init
        SetBgColor(colorPicker.value, stop1);
        SetBgColor(colorPickerBottom.value, stop2);
    }
}

// bg-land
var bgLand = document.getElementById("bg-land");
// bg-sky
var bgSky = document.getElementById("bg-sky");

var sunHalo = document.getElementById("sun-halo");
var sunHaloImg = sunHalo.getElementsByTagName("img")[0];
var sunDisk = document.getElementById("sun-disk");
var sunDiskImg = sunDisk.getElementsByTagName("img")[0];
var follow = true;
// on keyboard press P
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 80) {
        follow = !follow;
    }
});
//  #sun follow mouse cursor
document.addEventListener('mousemove', function (e) {
    if (!follow) return;
    var t = e.clientY / window.innerHeight;
    
    SetSunset(t, e.clientX, e.clientY);

});

var sunsetSlider = document.getElementById("sunset-slider").getElementsByTagName("input")[0];

var sunset01 = 0;
sunsetSlider.addEventListener("input", function () {
    sunset01 = sunsetSlider.value * 0.001;
    SetSunset(sunset01);
});

function SetPosition(sun, x, y) {
    sun.style.left = x + "px";
    sun.style.top = y + "px";
    sun.style.transformOrigin = "center center";
    
}

function SetScale(sun, x, y, scale) {
    sun.style.left = x + "px";
    sun.style.top = y + "px";
    sun.style.transformOrigin = "center center";
    sun.style.transform = "scale(" + scale + ")";
};

console.log(azimuth);

function SetSunset(sunset01, sunX, sunY) 
{
    var scale = (0.2 + 0.5 * sunset01);

    var sunWidth = sunHaloImg.width;
    var sunHeight = sunHaloImg.height;
    //sunWidth = sunWidth * scale;
    var y = sunY - sunHeight / 2;
    var x = sunX - sunWidth / 2;
    SetScale(sunHalo, x, y, scale);
    SetScale(sunDisk, x, y, scale);
    
    // sunset01 = Math.min(1, sunset01 * 1.5);
    sunset01 *= 1.5;

    // sun 
    {
        sunHaloImg.style.opacity = Math.min(1, Math.max(0, 1.3 - sunset01));
        
        var hue = 33 - sunset01 * 5;
        var saturate = 40 + sunset01 * 30;
        var brightness = 350 - Math.pow(sunset01, 2) * 100;
        var blur = sunset01 * 300;
        //var contrast = sunset01 * 100;

        document.documentElement.style.setProperty('--s-hue', hue + "deg");
        document.documentElement.style.setProperty('--s-saturate', saturate + "%");
        document.documentElement.style.setProperty('--s-brightness', brightness + "%");
        document.documentElement.style.setProperty('--s-blur', blur + "px");
        //document.documentElement.style.setProperty('--s-contrast', contrast + "%");
    }

    // sun disk
    {
        sunDiskImg.style.opacity = 1;

        var hue = 33 - sunset01 * 25;
        var saturate = 40 + sunset01 * 40;
        var brightness = 350 - Math.pow(sunset01, 2) * 100;
        var blur = sunset01 * 1;
        //var contrast = sunset01 * 100;

        document.documentElement.style.setProperty('--d-hue', hue + "deg");
        document.documentElement.style.setProperty('--d-saturate', saturate + "%");
        document.documentElement.style.setProperty('--d-brightness', brightness + "%");
        document.documentElement.style.setProperty('--d-blur', blur + "px");
        //document.documentElement.style.setProperty('--d-contrast', contrast + "%");
        // opacity
    }

    // land
    {
        var hue =  +sunset01 * 35;
        var saturate = 100 + sunset01 * 10;
        var brightness = 100 - Math.pow(sunset01, 2) * 30;
        var blur = 0; //sunset01 * 1;

        // set filter
        bgLand.style.filter = "hue-rotate(" + hue + "deg) saturate(" + saturate + "%) brightness(" + brightness + "%) blur(" + blur + "px)";
        bgSky.style.filter = "hue-rotate(" + hue + "deg) saturate(" + saturate + "%) brightness(" + brightness + "%) blur(" + blur + "px)";
    }

}

