<div id="think-parent">
    <div id="thinkgame" class="hide fixed above">
        <h2 id="think-text">Press the button to think about life.</h2>

        <button id="think" class="think-button">Press to think</button>
        <button id="think-faster" class="hide think-button">Think faster</button>

        <div id="author">

        </div>

    </div>
    <div id="gameover" class="hide above fixed">
        <div class="gradient-mask-top">
            <div class="gradient-mask-bottom">
                <div id="your-thoughts" class="vertical">
                    <div class="your-toughts-filler"></div>
                    <div id="your-thoughts-goes-here">
                    </div>
                    <button id="restart" class="gameover-button">
                        Think Again
                    </button>
                    <button id="share" class="gameover-button">
                        <img src="img/icon.png" alt="share" class="share-icon">
                        Share your thoughts
                    </button>
                    <div class="your-toughts-filler"></div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    <?php
    // include_once("css/thinkgame.css");
    echo file_get_contents("css/thinkgame.css");
    ?>
</style>

<script>
    var think = document.getElementById("think");
    var thinkFaster = document.getElementById("think-faster");
    var thinkText = document.getElementById("think-text");
    var author = document.getElementById("author");
    var yourThoughtsContainer = document.getElementById("your-thoughts-goes-here");

    var shareButton = document.getElementById("share");
    shareButton.addEventListener("click", function () {
        var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("I thought about life. What are you thinking about?") + "&url=" + encodeURIComponent("https://horatiuromantic.com/sunset") + "&hashtags=" + encodeURIComponent("sunsetgame");
        window.open(url, "_blank");
    });

    think.addEventListener("click", function () {
        NextSentence();
    });

    thinkFaster.addEventListener("click", function () {
        NextSentence("fast");
    });

    function SlowHide(comp) {
        comp.classList.add("slow-hide");
        comp.classList.remove("slow-show");
    }
    function SlowShow(comp, showAgainDelay = 0) {
        // show think button
        comp.classList.remove("slow-hide");
        comp.classList.add("slow-show");

        if (showAgainDelay > 0) {
            setTimeout(() => {
                comp.classList.remove("slow-show");

            }, showAgainDelay);
        }
    }

    // restart button
    var restart = document.getElementById("restart");
    restart.addEventListener("click", () => OnRestartButtonPress());

    function NextSentence(speed = "slow") {

        var ts = GetCurrentSentenceObj();

        // if it has "anim" number, we should multiply the delay by it
        var delay = 2000;
        if (speed == "slow") {
            document.documentElement.style.setProperty('--thinkgame-transition-duration', '1s');
        }
        if (speed == "fast") {
            delay = 330;
            document.documentElement.style.setProperty('--thinkgame-transition-duration', (delay / 1000) + 's');
        }

        // hide think button
        SlowHide(think);
        if (GetNumThoughts() >= _num_thinking_slow) {
            SlowHide(thinkFaster);
        }
        SlowHide(author);

        // wait 3 sec
        var delay1 = delay;
        setTimeout(function () {

            // hide think text
            SlowHide(thinkText);

            var delay2 = delay;
            setTimeout(() => {

                RecordThought(GetCurrentSentenceObj(), speed);

                // change sentence to new
                thinkText.innerHTML = GetNextSentence();
                authorText.innerHTML = GetAuthor();

                // show think text
                SlowShow(thinkText);
                SlowShow(author);

                var delay3 = delay;
                setTimeout(() => {
                    if (!_is_dead) {
                        var delay4 = delay / 2;
                        SlowShow(think, delay4);
                        if (GetNumThoughts() >= _num_thinking_slow) {
                            thinkFaster.classList.remove("hide");
                            SlowShow(thinkFaster, delay4);
                        }
                    }

                }, delay3);

            }, delay2);

        }, delay1);

    }

    function SetThinkSentence(sentence, auth) {
        thinkText.innerHTML = sentence;
        author.innerHTML = auth;

    }

    function RecordThought(tho, speed = "slow") {

        // clone tho
        var newTho = JSON.parse(JSON.stringify(tho));
        newTho.speed = speed;

        // add to youWereThinking array
        youWereThinking.push(newTho);

    }

    function SetYourThoughtsStraight() {
        // record final thought...?!?!
        RecordThought(GetCurrentSentenceObj(), "final");

        yourThoughtsContainer.innerHTML = "";
        for (var i = 0; i < youWereThinking.length; i++) {
            var tho = youWereThinking[i];

            var elementType = "h2";
            if (tho['speed'] == "fast")
                elementType = "h3";

            var thoughtElement = document.createElement(elementType);
            //thoughtElement.classList.add("your-thought");
            var sentence = "You thought about ";
            if (tho['speed'] == "fast")
                sentence = "You briefly thought about ";

            if (tho.hasOwnProperty("noprefix"))
                sentence = "";


            if (tho.hasOwnProperty("history"))
                sentence = tho['history'];
            else if (tho.hasOwnProperty("thinkabout"))
                sentence += tho['thinkabout'];
            else
                sentence += "life.";

            thoughtElement.innerHTML = sentence;
            yourThoughtsContainer.appendChild(thoughtElement);
        }
    }

    function ClearYourThoughts() {
        youWereThinking = [];

    }

    function GetCurrentSentenceObj() {
        return thinkSentences[curThinkSentenceIndex];
    }

    function GetAuthor() {
        var ts = GetCurrentSentenceObj();
        var author = "Horațiu";
        // if 'author' exists in ts
        if (ts.hasOwnProperty('author')) {
            // use it
            author = ts['author'];
        }
        return author;
    }

    function GetCurrentSentence() {
        console.log("YA");
        var ts = GetCurrentSentenceObj();
        var prefix = "Think about ";
        if (ts.hasOwnProperty("noprefix"))
            prefix = "";

        var sentence = "" + prefix;
        // if 'thinkabout' exists in ts
        if (ts.hasOwnProperty('thinkabout')) {
            // use it
            sentence += ts['thinkabout'];
        } else {
            sentence += "life.";
        }

        console.log(sentence);

        return sentence;
    }

    function RefreshThinkSentence() {
        thinkText.innerHTML = GetCurrentSentence();

    }

    function GetNextSentence() {
        console.log(thinkSentences);
        // advance index
        curThinkSentenceIndex = (curThinkSentenceIndex + 1) % thinkSentences.length;

        return GetCurrentSentence();

    }

</script>