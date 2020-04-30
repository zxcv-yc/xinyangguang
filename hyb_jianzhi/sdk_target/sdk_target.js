var app = getApp(), conf = {
    pageHomeBack: "/pages/index/index"
};

Page({
    data: {
        isBackcg: !1
    },
    onLoad: function(a) {
        if (void 0 !== a && a.apId && a.pathTg) if (wx.navigateToMiniProgram) {
            var i = {}, e = decodeURIComponent(a.pathTg), o = "";
            if (-1 != e.indexOf("?")) {
                o = e.split("?")[1].split("&");
                for (var t = 0; t < o.length; t++) -1 != o[t].indexOf("=") && (i[o[t].split("=")[0]] = o[t].split("=")[1]);
            }
            wx.navigateToMiniProgram({
                appId: a.apId,
                path: e.split("?")[0],
                extraData: i,
                fail: function() {
                    wx.redirectTo({
                        url: conf.pageHomeBack,
                        fail: function(a) {
                            wx.switchTab({
                                url: conf.pageHomeBack
                            });
                        }
                    });
                }
            });
        } else wx.redirectTo({
            url: conf.pageHomeBack,
            fail: function(a) {
                wx.switchTab({
                    url: conf.pageHomeBack
                });
            }
        });
    },
    onShow: function() {
        this.data.isBackcg && wx.redirectTo({
            url: conf.pageHomeBack,
            fail: function(a) {
                wx.switchTab({
                    url: conf.pageHomeBack
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            isBackcg: !0
        });
    }
});