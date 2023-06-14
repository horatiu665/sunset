var sunset01 = 0;

var _azimuth = -0.1;
var _horizonY = 0.7;
var _gameEndFactor = 1.5;
var _is_dead = false;

var clampSunset = 2;

const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => ((a - x) / (y - x));
const lerp = (x, y, a) => x * (1 - a) + y * a;