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
var follow = false;
// on keyboard press P
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 80) {
        follow = !follow;
        time = 0;
    }
});
//  #sun follow mouse cursor
document.addEventListener('mousemove', function (e) {
    if (!follow) return;
    var t = e.clientY / window.innerHeight;
    t = invlerp(azimuth, horizonY, t);

    SetSunset(t, e.clientX, e.clientY);

});

if (false) {
    var sunsetSlider = document.getElementById("sunset-slider").getElementsByTagName("input")[0];

    var sunset01 = 0;
    sunsetSlider.addEventListener("input", function () {
        sunset01 = sunsetSlider.value * 0.001;
        SetSunset(sunset01);
    });
}

function SetScale(sun, x, y, scale) {
    sun.style.left = x + "px";
    sun.style.top = y + "px";
    sun.style.transformOrigin = "center center";
    sun.style.transform = "scale(" + scale + ")";
};

console.log(azimuth + " " + horizonY);


function GetSunPosition(sunset01) {

    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var pos =
    {
        x: width * (0.33 + sunset01 * 0.5),
        y: height * (0 + sunset01 * 1)
    };
    return pos;
};

// example usage:
// [33, 15, 8, 0]
// [0, 0.5, 0.8, 1]
// PoorMansAnimationCurve([33, 15, 8, 0], [0, 0.5, 0.8, 1], 0.5) == 15;
const PoorMansAnimationCurve = (values, times, s01) => {
    for (var i = 0; i < values.length; i++) {
        var val = values[i];
        var time = times[i];
        var nextVal = values[(i + 1) % values.length]; // consider clamping
        var nextTime = times[(i + 1) % values.length];
        if (s01 >= time && s01 <= nextTime) {
            var v = lerp(val, nextVal, invlerp(time, nextTime, s01));
            return v;
        }
    }
    return values[0];
};

function SetSunset(sunset01) {
    sunset01 = Math.min(lerp(azimuth, horizonY, sunset01), clampSunset);

    // calc sun position first
    var sunPos = GetSunPosition(sunset01);
    var sunX = sunPos.x;
    var sunY = sunPos.y;

    var scale = (0.2 + 0.5 * sunset01);

    var sunWidth = sunHaloImg.width;
    var sunHeight = sunHaloImg.height;
    //sunWidth = sunWidth * scale;
    var y = sunY - sunHeight / 2;
    var x = sunX - sunWidth / 2;
    SetScale(sunHalo, x, y, scale);
    SetScale(sunDisk, x, y, scale);

    // anim curves (poor man's)
    var sunHueValues = [35, 15, 8, 0, 0];
    var sunHueTimes = [0, 0.5, 0.8, 1, 4];
    var sunSaturateValues = [0, 10,     20,     42,    70, 300];
    var sunSaturateTimes =  [0, 0.5,    0.8,    0.9,   1,   4];
    var haloOpacityTimes =  [0, 0.5, 0.8, 0.9,  1, 1.5,  4];
    var haloOpacityValues = [1, 0.9, 0.8, 0.6, 0.3, 0.1, 0];

    // sun halo
    {
        var s01 = sunset01 * 2;

        sunHaloImg.style.opacity = PoorMansAnimationCurve(haloOpacityValues, haloOpacityTimes, s01); //1.6 - sunset01 * 1.5;

        // blend hue between multiple keyframes
        var hue = PoorMansAnimationCurve(sunHueValues, sunHueTimes, s01);
        var saturate = PoorMansAnimationCurve(sunSaturateValues, sunSaturateTimes, s01);
        var brightness = 350 - Math.pow(Math.max(0.01, s01), 2) * 100;
        var blur = Math.max(0, s01 * 300);
        //var contrast = sunset01 * 100;

        document.documentElement.style.setProperty('--s-hue', hue + "deg");
        document.documentElement.style.setProperty('--s-saturate', saturate + "%");
        document.documentElement.style.setProperty('--s-brightness', brightness + "%");
        document.documentElement.style.setProperty('--s-blur', blur + "px");
        //document.documentElement.style.setProperty('--s-contrast', contrast + "%");
    }

    // sun disk
    {
        var s01 = sunset01 * 2;

        sunDiskImg.style.opacity = 0.5 + 1 * sunset01;

        var hue = PoorMansAnimationCurve(sunHueValues, sunHueTimes, s01);
        var saturate = PoorMansAnimationCurve(sunSaturateValues, sunSaturateTimes, s01);

        // var saturate = 0 + Math.max(0, s01 * 80);
        var brightness = 350 - Math.pow(Math.max(0.01, s01), 1.7) * 100;
        var blur = Math.max(0, s01 * 1);
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
        var s01 = sunset01 * 2;
        var hueLand = s01 * 25;
        var hueSky = s01 * 35;
        var saturateLand = 100 - Math.pow(sunset01, 2) * 20;
        var saturateSky = 100 + s01 * 50;
        // var brightness = 100 - Math.pow(s01, 2) * 30;
        var briLand = 100 - Math.pow(s01, 2) * 30;
        var briSky = 100 - Math.pow(s01, 2) * 23;
        var blur = 0; //s01 * 1;

        // set filter
        bgLand.style.filter = "hue-rotate(" + hueLand + "deg) saturate(" + saturateLand + "%) brightness(" + briLand + "%) blur(" + blur + "px)";
        bgSky.style.filter = "hue-rotate(" + hueSky + "deg) saturate(" + saturateSky + "%) brightness(" + briSky + "%) blur(" + blur + "px)";
    }

}




// init game
SetSunset(0, screen.width * 0.33, screen.height * 0);

// time in ms
var time = 0;
var dt = 1000 / 60;
var timeNormalized = 0;
var totalTimeS = 5;
setInterval(() => {
    if (!follow) {
        time += dt;
        timeNormalized = time / (totalTimeS * 1000);
        SetSunset(timeNormalized);

        if (timeNormalized > 1.3) {
            time = 0;
        }
    }
}, dt);



// do-sunset button
var doSunsetButton = document.getElementById("do-sunset");
doSunsetButton.addEventListener("click", function () {
    follow = false;
    time = 0;
});

// do-mouse-control button
var doMouseControlButton = document.getElementById("do-mouse-control");
doMouseControlButton.addEventListener("click", function () {
    follow = true;
});
