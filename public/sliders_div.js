
if (false) {
    // sliders div
    var slidersDiv = document.getElementById("sliders");
    // array of inputs children of slidersDiv
    var inputs = slidersDiv.getElementsByTagName("input");
    // array of labels children of slidersDiv
    var labels = slidersDiv.getElementsByTagName("label");
    //filter: hue-rotate(var(--hue)) saturate(var(--saturate)) brightness(var(--brightness)) blur(var(--blur))
    //drop-shadow(var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-color)) 
    //invert(var(--invert)) sepia(var(--sepia)) grayscale(var(--grayscale)) contrast(var(--contrast))
    inputs[0].setAttribute("var_name", "Hue");
    inputs[0].addEventListener("input", function () {
        var hue = inputs[0].value;
        // set --hue variable
        document.documentElement.style.setProperty('--hue', hue + "deg");
        labels[0].innerHTML = "Hue: " + hue;
    });
    inputs[1].setAttribute("var_name", "Saturate");
    inputs[1].addEventListener("input", function () {
        var saturate = inputs[1].value;
        document.documentElement.style.setProperty('--saturate', saturate + "%");
        labels[1].innerHTML = "Saturate: " + saturate + "%";
    });
    inputs[2].setAttribute("var_name", "Brightness");
    inputs[2].addEventListener("input", function () {
        var brightness = inputs[2].value;
        document.documentElement.style.setProperty('--brightness', brightness + "%");
        labels[2].innerHTML = "Brightness: " + brightness + "%";
    });
    inputs[3].setAttribute("var_name", "Blur");
    inputs[3].addEventListener("input", function () {
        var blur = inputs[3].value;
        document.documentElement.style.setProperty('--blur', blur + "px");
        labels[3].innerHTML = "Blur: " + blur + "px";
    });
    inputs[4].setAttribute("var_name", "Invert");
    inputs[4].addEventListener("input", function () {
        var invert = inputs[4].value;
        document.documentElement.style.setProperty('--invert', invert + "%");
        labels[4].innerHTML = "Invert: " + invert + "%";
    });
    inputs[5].setAttribute("var_name", "Sepia");
    inputs[5].addEventListener("input", function () {
        var sepia = inputs[5].value;
        document.documentElement.style.setProperty('--sepia', sepia + "%");
        labels[5].innerHTML = "Sepia: " + sepia + "%";
    });
    inputs[6].setAttribute("var_name", "Grayscale");
    inputs[6].addEventListener("input", function () {
        var grayscale = inputs[6].value;
        document.documentElement.style.setProperty('--grayscale', grayscale + "%");
        labels[6].innerHTML = "Grayscale: " + grayscale + "%";
    });
    inputs[7].setAttribute("var_name", "Contrast");
    inputs[7].addEventListener("input", function () {
        var contrast = inputs[7].value;
        document.documentElement.style.setProperty('--contrast', contrast + "%");
        labels[7].innerHTML = "Contrast: " + contrast + "%";
    });
    // init all inputs
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var label = labels[i];
        var value = input.value;
        var name = input.getAttribute("var_name");
        // set label text
        label.innerHTML = name + ": " + value;
        // set -- variable
        //document.documentElement.style.setProperty('--' + name, value);
    }
}

