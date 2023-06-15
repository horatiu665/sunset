
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
    });

    play2.addEventListener("click", function () {
        StartGame(7);
        SetMainMenuVisibility(false);
    });

    play3.addEventListener("click", function () {
        StartGame(15);
        SetMainMenuVisibility(false);
    });

</script>