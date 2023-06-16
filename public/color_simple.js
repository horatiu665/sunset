
function hex2dec(hex) {
    return hex.replace('#', '').match(/.{2}/g).map(n => parseInt(n, 16));
}

function rgb2hex(r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    r = Math.min(r, 255);
    g = Math.min(g, 255);
    b = Math.min(b, 255);
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function rgb2cmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [c, m, y, k];
}

function cmyk2rgb(c, m, y, k) {
    let r = c * (1 - k) + k;
    let g = m * (1 - k) + k;
    let b = y * (1 - k) + k;
    r = (1 - r) * 255 + .5;
    g = (1 - g) * 255 + .5;
    b = (1 - b) * 255 + .5;
    return [r, g, b];
}


function mix_colors(hex1, hex2, mixAmount){ 
    var rgb1 = hex2dec(hex1);
    var rgb2 = hex2dec(hex2);
    var rgb3 = [];
    for (var i = 0; i < 3; i++) {
        rgb3[i] = Math.round(rgb1[i] * (1 - mixAmount) + rgb2[i] * mixAmount);
    }
    return rgb2hex(rgb3[0], rgb3[1], rgb3[2]);
}

// load colors :)
onColorsLoaded();