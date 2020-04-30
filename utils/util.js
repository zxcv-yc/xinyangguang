var formatTime = function(t) {
    var r = t.getFullYear(), e = t.getMonth() + 1, m = t.getDate(), o = t.getHours(), a = t.getMinutes(), u = t.getSeconds();
    return [ r, e, m ].map(formatNumber).join("/") + " " + [ o, a, u ].map(formatNumber).join(":");
}, formatNumber = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: formatTime,
    formatNumber: formatNumber
};