<canvas id="canvas-bg-land" class="bg-canvas">
    
</canvas>

<canvas id="canvas-bg-sky" class="bg-canvas">
    
</canvas>

<img id="bg-land" class="fit-screen" src="img/bg/sunset_sq_land.png" />
<img id="bg-sky" class="fit-screen" src="img/bg/sunset_sq_sky.png" />

<style>
.bg-canvas {
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
}

#canvas-bg-land {
    z-index: 10;
}

#canvas-bg-sky {
    z-index: 0;
}
</style>

<script>
var c_land = document.getElementById("canvas-bg-land");
c_land.width = document.body.clientWidth; //document.width is obsolete
c_land.height = document.body.clientHeight; //document.height is obsolete
canvasW = c_land.width;
canvasH = c_land.height;

var ctx = c_land.getContext("2d");
// img
var img_land = document.getElementById("bg-land");
var img_sky = document.getElementById("bg-sky");
// img width and height ratio
var ratio = img_land.width / img_land.height;
var imgW = img_land.width;
var imgH = img_land.height;
// fit img to canvas
if (canvasW / canvasH > ratio) {
    // canvas wider than img
    imgW = canvasW;
    imgH = imgW / ratio;
} else {
    // canvas taller than img
    imgH = canvasH;
    imgW = imgH * ratio;
}
ctx.drawImage(img_land, 0, 0, imgW, imgH);

// destroy img elem
img_land.parentNode.removeChild(img);
img_sky.parentNode.removeChild(img);
</script>