
<div id="think-parent">
    <div id="thinkgame" class="fixed above vertical">
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
var thinkText = document.getElementById("think-text");
think.addEventListener("click", function() {

    NextSentence();

});

// restart button
var restart = document.getElementById("restart");
restart.addEventListener("click", function() {
    
    StartGame();
});

function NextSentence() {
    // hide think button
    think.classList.add("hide-anim");
    think.classList.remove("show");

    // wait 3 sec
    setTimeout(function() {

        // change sentence to new
        thinkText.innerHTML = "Press the button to think about another life.";


        // show think button
        think.classList.add("show");
        think.classList.remove("hide-anim");

    }, 3000);

}

</script>