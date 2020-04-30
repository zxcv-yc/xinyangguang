var _Page;

function _defineProperty(e, n, o) {
    return n in e ? Object.defineProperty(e, n, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = o, e;
}

Page((_defineProperty(_Page = {
    data: {
        de_id: 0
    },
    saveClick: function(e) {},
    onLoad: function(e) {}
}, "saveClick", function() {
    var e = this.data.de_id;
    wx.reLaunch({
        url: "/hyb_jianzhi/apply/apply?index=" + 0
    });
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "onShow", function() {}), 
_defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {}), _Page));