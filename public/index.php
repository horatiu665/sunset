<?php
// if we are running on localhost, use this. else use "1.0" and update by hand.
if ($_SERVER['HTTP_HOST'] == "localhost") {
    // if (true) {
    $css_version = "t" . time();
} else {
    $css_version = "1.2";
}
?>
<html>

<head>
    <title>Sunset Game</title>
    <?php
    // write a link to the css/style.css and add the css_version
    echo "<link rel='stylesheet' type='text/css' href='css/style.css?v=$css_version'>";
    ?>

    <!-- favicon -->
    <link rel="icon" href="img/icon.png" type="image/png">
    <meta name="description" content="A quiet introspective game about reflection at Sunset">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- more meta stuff -->
    <meta property=’og:title’ content='Sunset Game'/>
    <meta property=’og:description’ content="A quiet introspective game about reflection at Sunset"/>
    <meta property="og:type" content='website'/>
    <meta property=’og:url’ content='https://www.horatiuromantic.com/sunset/'/>
    <meta property=’og:image’ content='https://www.horatiuromantic.com/sunset/img/sunset_itch.png'/>
    <meta property="og:image:type" content="image/png">
    <meta property='og:image:width' content='630' />
    <meta property='og:image:height' content='500' />

    <meta name="twitter:site" content="Sunset Game">
    <meta name="twitter:title" content="Sunset Game">
    <meta name="twitter:description" content="A quiet introspective game about reflection at Sunset">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image:src" content="https://www.horatiuromantic.com/sunset/img/sunset_itch.png"/>    
    <meta name="theme-color" content="#71a9ff">

    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Diphylleia&family=EB+Garamond&display=swap" rel="stylesheet">

    <!-- include defines.js -->
    <script src="defines.js"></script>
</head>

<body>

    <div id="bg" class="bg-container">
        <?php
        //include "bg_svg.php";
        include "bg_png.php";
        //include "bg_canvas.php";
        ?>
    </div>

    <div class="fixed">
        <canvas id="lensflare-canvas" class="fixed"></canvas>
    </div>

    <div class="hide fixed sun-parent">
        <div id="sun-halo" class="sun">
            <img src="img/sunr.png" alt="sun">
        </div>

    </div>
    <div class="hide fixed sun-parent">
        <div id="sun-disk" class="sun">
            <img src="img/sundisk.png" alt="sun">
            <!-- circle with #ff1309 color -->
            <!-- <svg width="100%" height="100%">
                <circle cx="50%" cy="50%" r="50%" fill="#ff1309" />
            </svg> -->
        </div>
    </div>

    <div id="debug" class="hide fixed above">
        <button id="do-restart-sunset">Restart Sunset</button>
        <button id="do-mouse-control">Mouse Controls</button>

        <button id="accelerate">Accelerate</button>
        <button id="cheat-next-sentence">Next Sentence</button>

        <p id="debug-sunset">sunset: 0</p>

        <p id="debug-sound">sound: 0</p>
        <!-- <div id="sunset-slider">
            <input type="range" min="0" max="1000" value="0" class="slider" id="sunset-slider-input">
            <label for="sunset-slider-input">Sunset</label>
        </div> -->

        <!-- color picker top -->
        <!-- <div id="color-picker">
            <input type="color" id="color-picker-input" value="#a87c9c">
        </div> -->
        <!-- color picker bottom -->
        <!-- <div id="color-picker-bottom">
            <input type="color" id="color-picker-input-bottom" value="#4d6e91">
        </div> -->

        <!-- slider -->
        <div id="sliders" class="hide">
            <div id="slider">
                <input type="range" min="0" max="360" value="180" class="slider" id="myRange">
                <label for="myRange">hue</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="1000" value="100" class="slider" id="myRange">
                <label for="myRange">sat</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="4060" value="100" class="slider" id="myRange">
                <label for="myRange">bri</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="1000" value="0" class="slider" id="myRange">
                <label for="myRange">blur</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="1460" value="0" class="slider" id="myRange">
                <label for="myRange">invert</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="860" value="0" class="slider" id="myRange">
                <label for="myRange">sepia</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
                <label for="myRange">grayscale</label>
            </div>
            <div id="slider">
                <input type="range" min="0" max="660" value="100" class="slider" id="myRange">
                <label for="myRange">contrast</label>
            </div>
        </div>
    </div>


    <script>
        var colorsJsLoaded = false;
        // show all sun parents
        function onColorsLoaded() {
            colorsJsLoaded = true;
        }

    </script>

    <script src="think_sentences.js"></script>

    <?php
    include_once("thinkgame.php");
    ?>

    <!-- sounds -->
    <audio id="audio-birds" loop>
        <source src="audio/birds by the water.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <audio id="audio-night" loop>
        <source src="audio/night.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <script src="sound.js"></script>

    <!-- <script src="TweenMax.min.js"></script> -->
    <script src="lensflare2.js"></script>
    <!-- on load colorsjs, do a function -->
    <!-- <script src="https://colorjs.io/dist/color.global.js" onload="onColorsLoaded()"></script> -->
    <script src="color_simple.js"></script>
    <script src="game.js"></script>

    <!-- main menu -->
    <?php
    include_once("mainmenu.php");
    ?>
</body>

</html>