
<div id="think-parent">
    <div id="thinkgame" class="hide fixed above vertical">
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
    think.classList.add("slow-hide");
    think.classList.remove("slow-show");

    // wait 3 sec
    var delay1 = 2000;
    setTimeout(function() {

        thinkText.classList.remove("slow-show");
        thinkText.classList.add("slow-hide");

        var delay2 = 2000;
        setTimeout(() => {
                
            // change sentence to new
            thinkText.innerHTML = GetNextSentence();

            thinkText.classList.remove("slow-hide");
            thinkText.classList.add("slow-show");

            var delay3 = 2000;
            setTimeout(() => {
                // show think button
                think.classList.remove("slow-hide");
                think.classList.add("slow-show");
                
                var delay4 = 1000;
                setTimeout(() => {
                    think.classList.remove("slow-show");

                }, delay4);
            
            }, delay3);
            
        }, delay2);

    }, delay1);

}

function GetNextSentence() {
    return "BLABLA" + Math.random();
}

</script>