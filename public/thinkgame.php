
<div id="think-parent">
    <div id="thinkgame" class="fixed above">
        <h2 id="think-text">Press the button to think about life.</h2>

        <button id="think">Press to think</button>

    </div>
    <div id="gameover" class="hide fixed above">
        <h2 id="gameover-text">Game Over</h2>

        <button id="restart">Restart</button>
    </div>
</div>

<style>
    <?php
        // include_once("css/thinkgame.css");
        echo file_get_contents("css/thinkgame.css");
    ?>
</style>

<script>
// think button
var think = document.getElementById("think");
think.addEventListener("click", function() {
    console.log("FCUJK");
    // pressed!
});


</script>