var app = getApp();

Page({
    data: {
        b_id: ""
    },
    onLoad: function(n) {
        var t = n.b_id;
        this.setData({
            b_id: t
        });
    },
    subClick: function(n) {
        var t = n.detail.value;
        "" == t.pinglun ? wx.showToast({
            title: "评论不能为空",
            icon: "none"
        }) : app.util.request({
            url: "entry/wxapp/Pingjia",
            data: t,
            success: function(n) {
                wx.showToast({
                    title: "评价成功"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});