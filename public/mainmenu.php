
<style>
    <?php
    echo file_get_contents("css/mainmenu.css");
    ?>
</style>

<div id="main-menu" class="hide mm-vertical fixed above">
    <!-- <img id="main-menu-icon" src="img/icon.png" alt="icon"> -->
    <h2>sunset</h2>
    <button id="play1" class="main-menu-button">3 minutes sunset</button>
    <button id="play2" class="main-menu-button">7 minutes sunset</button>
    <button id="play3" class="main-menu-button">15 minutes sunset</button>
    <div id="made-by">
        Made by <a href="https://horatiuromantic.com" target="_blank">@horatiuromantic</a> for <a href="https://itch.io/jam/castle-game-jam-2023" target="_blank">Castle Game Jam 2023</a>
    </div>
</div>
<script src="mainmenu.js"></script>
<script>

    var mainMenu = document.getElementById("main-menu");

    function SetMainMenuVisibility(visible) {
        if (visible) {
            mainMenu.classList.remove("hide");
            mainMenu.classList.add("mm-vertical");
        } else {
            mainMenu.classList.add("hide");
            mainMenu.classList.remove("mm-vertical");
        }
    }

    var play1 = document.getElementById("play1");
    var play2 = document.getElementById("play2");
    var play3 = document.getElementById("play3");

    play1.addEventListener("click", function () {
        StartGame(3);
        SetMainMenuVisibility(false);
        // play sounds...
        PlayAudio();

    });

    play2.addEventListener("click", function () {
        StartGame(7);
        SetMainMenuVisibility(false);
        PlayAudio();

    });

    play3.addEventListener("click", function () {
        StartGame(15);
        SetMainMenuVisibility(false);
        PlayAudio();

    });

</script>