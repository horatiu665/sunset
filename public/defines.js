
var azimuth = -0.1;
var horizonY = 0.7;

var clampSunset = 2;

const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => ((a - x) / (y - x));
const lerp = (x, y, a) => x * (1 - a) + y * a;