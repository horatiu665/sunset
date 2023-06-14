<div id="think-parent">
    <div id="thinkgame" class="hide fixed above">
        <h2 id="think-text">Press the button to think about life.</h2>

        <button id="think">Press to think</button>

        <div id="author">

        </div>

    </div>
    <div id="gameover" class="hide above lower-corner-button">
        <div class="gradient-mask-top">
            <div class="gradient-mask-bottom">
                <div id="your-thoughts" class="fixed above">
                    <div class="your-toughts-filler"></div>
                    <div id="your-thoughts-goes-here">

                    </div>
                    <button id="restart">Restart</button>
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
    var thinkText = document.getElementById("think-text");
    var author = document.getElementById("author");
    var yourThoughtsContainer = document.getElementById("your-thoughts-goes-here");

    think.addEventListener("click", function () {
        NextSentence();
    });

    // restart button
    var restart = document.getElementById("restart");
    restart.addEventListener("click", () => OnRestartButtonPress());

    function NextSentence() {

        var ts = GetCurrentSentenceObj();

        // if it has "anim" number, we should multiply the delay by it
        var delay = 2000;
        if (ts.hasOwnProperty('anim')) {
            delay *= ts['anim'];
        }

        // hide think button
        think.classList.add("slow-hide");
        think.classList.remove("slow-show");
        author.classList.add("slow-hide");
        author.classList.remove("slow-show");

        // wait 3 sec
        var delay1 = delay;
        setTimeout(function () {

            // hide think text
            thinkText.classList.remove("slow-show");
            thinkText.classList.add("slow-hide");

            var delay2 = delay;
            setTimeout(() => {

                RecordThought(GetCurrentSentenceObj());

                // change sentence to new
                thinkText.innerHTML = GetNextSentence();
                authorText.innerHTML = GetAuthor();

                // show think text
                thinkText.classList.remove("slow-hide");
                thinkText.classList.add("slow-show");

                author.classList.remove("slow-hide");
                author.classList.add("slow-show");

                var delay3 = delay;
                setTimeout(() => {
                    if (!_is_dead) {
                        // show think button
                        think.classList.remove("slow-hide");
                        think.classList.add("slow-show");

                        var delay4 = 1000;
                        setTimeout(() => {
                            think.classList.remove("slow-show");

                        }, delay4);
                    }

                }, delay3);

            }, delay2);

        }, delay1);

    }

    function SetThinkSentence(sentence, auth) {
        thinkText.innerHTML = sentence;
        author.innerHTML = auth;

    }

    function RecordThought(tho) {

        // add to youWereThinking array
        youWereThinking.push(tho);

    }

    function SetYourThoughtsStraight() {
        // record final thought...?!?!
        RecordThought(GetCurrentSentenceObj());

        yourThoughtsContainer.innerHTML = "";
        for (var i = 0; i < youWereThinking.length; i++) {
            var tho = youWereThinking[i];
            var h2 = document.createElement("h2");
            //h2.classList.add("your-thought");
            var sentence = "You thought about ";
            if (tho.hasOwnProperty("noprefix"))
                sentence = "";
            if (tho.hasOwnProperty("thinkabout"))
                sentence += tho['thinkabout'];
            else
                sentence += "life.";

            if (tho.hasOwnProperty("history"))
                sentence = tho['history'];

            h2.innerHTML = sentence;
            yourThoughtsContainer.appendChild(h2);
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