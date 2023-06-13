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

var lensflareCanvas = document.getElementById("lensflare-canvas");

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

    // if u press 'd' open debug
    if (e.keyCode == 68) {
        var debug = document.getElementById("debug");
        debug.classList.toggle("hide");
    }
});

// accelerate button
var accelerateButton = document.getElementById("accelerate");
// while pointer is pressed
accelerateButton.addEventListener("pointerdown", function () {
    accelerate = true;
});
// when pointer is released
accelerateButton.addEventListener("pointerup", function () {
    accelerate = false;
});



// on pointer down
document.addEventListener('pointerdown', function (e) {
    if (!follow) return;
    var t = e.clientY / window.innerHeight;
    t = invlerp(azimuth, horizonY, t);
    SetSunset(t, e.clientX, e.clientY);
    console.log(sunset01);
});

//  #sun follow mouse cursor
// document.addEventListener('mousemove', function (e) {
//     if (!follow) return;
//     var t = e.clientY / window.innerHeight;
//     t = invlerp(azimuth, horizonY, t);
//     SetSunset(t, e.clientX, e.clientY);
// });

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

const PoorMansAnimationCurveColor = (colors, times, s01) => {
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var time = times[i];
        var nextColor = colors[(i + 1) % colors.length]; // consider clamping
        var nextTime = times[(i + 1) % colors.length];
        if (s01 >= time && s01 <= nextTime) {
            var v = Color.mix(color, nextColor, invlerp(time, nextTime, s01));
            return v;
        }
    }
    return colors[0];
};

function SetSunset(newSunset01) {
    sunset01 = Math.min(lerp(azimuth, horizonY, newSunset01), clampSunset);

    // calc sun position first
    var sunPos = GetSunPosition(sunset01);
    var sunX = sunPos.x;
    var sunY = sunPos.y;

    var scale = (0.1 + 0.3 * sunset01);

    var sunWidth = sunHaloImg.width;
    var sunHeight = sunHaloImg.height;
    //sunWidth = sunWidth * scale;
    var y = sunY - sunHeight / 2;
    var x = sunX - sunWidth / 2;
    SetScale(sunHalo, x, y, scale);
    SetScale(sunDisk, x, y, scale);

    // think game
    {
        var textColors = [
            new Color("#fffdf5"),
            new Color("#fff2d9"),
            new Color("#ff8669"),
            new Color("#ff2e13"),
            new Color("#ff2e13"),
            new Color("#777777"),
            new Color("#000000"),
        ];
        var textTimes = [0, 0.47, 0.6, 0.73, 0.88, 1, 4];
        var textColor = PoorMansAnimationCurveColor(textColors, textTimes, sunset01);
        document.documentElement.style.setProperty('--text-color', textColor.toString({format: "hex"}));
        
        var skyColors = [
            new Color("#71a9ff"),
            new Color("#b26ed8"),
        ];
        // set --sunset-color-avg variable
        var sunsetColorAvg = Color.mix(skyColors[0], skyColors[1], sunset01);
        document.documentElement.style.setProperty('--sunset-color-avg', sunsetColorAvg.toString({format: "hex"}));
    }

    // anim curves (poor man's)
    var sunHueValues = [35, 15, 8, 0, 0];
    var sunHueTimes = [0, 0.5, 0.8, 1, 4];
    var sunSaturateValues = [0, 10,     20,     42,    70, 300];
    var sunSaturateTimes =  [0, 0.5,    0.8,    0.9,   1,   4];
    var haloOpacityTimes =  [0, 0.5, 0.8, 0.9,  1, 1.5,  4];
    var haloOpacityValues = [1, 0.9, 0.8, 0.6, 0.3, 0.1, 0];

    var flareOpacityTimes =  [0, 0.35, 0.55,  4];
    var flareOpacityValues = [0.8, 1, 0, 0];

    // lensflareCanvas
    var lensflareOpacity = 0;
    {
        lensflareOpacity = PoorMansAnimationCurve(flareOpacityValues, flareOpacityTimes, sunset01);
        lensflareCanvas.style.opacity = lensflareOpacity;

    }

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
        var blur = Math.max(0, s01 * 5);
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


    if (lensflareOpacity > 0) {
        // trigger custom 'sunset' event on document
        var sunsetEvent = new CustomEvent('sunset', { detail: {
                sunset01: sunset01,
                sunX: sunX,
                sunY: sunY
            }
        });
        document.dispatchEvent(sunsetEvent);
    } else {
        // trigger custom 'sunset' event on document
        var sunsetEvent = new CustomEvent('sunset', { detail: {
                sunset01: 0,
                sunX: 0,
                sunY: 0
            }
        });
        document.dispatchEvent(sunsetEvent);
    }
}



// init game
SetSunset(0, screen.width * 0.33, screen.height * 0);

// time in ms
var time = 0;
var accelerate = false;
var dt = 1000 / 60;
var timeNormalized = 0;
var totalTimeS = 50;
var gameUpdateInterval = null;
function StartGame() { 
    gameUpdateInterval = setInterval(() => {
        if (!follow) {
            time += dt;
            if (accelerate)
            {
                time += totalTimeS * 1000 / 60;
            }
            timeNormalized = time / (totalTimeS * 1000);
            SetSunset(timeNormalized);

            if (timeNormalized > 1.5) {
                clearInterval(gameUpdateInterval);
                gameUpdateInterval = null;
                OnGameOver();
            }
        }
    }, dt);
}

StartGame();

function OnGameOver() {
    if (true) {
        var gameOver = document.getElementById("gameover");
        gameOver.classList.remove("hide");
        gameOver.classList.add("show");

        var thinkgame = document.getElementById("thinkgame");
        gameOver.classList.add("hide");
        gameOver.classList.remove("show");


    }
    else {
        StartGame();
    }
}

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
