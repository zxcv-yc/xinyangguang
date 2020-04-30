var app = getApp();

Page({
    data: {
        hid: "",
        hidden: !0,
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无评论"
        } ]
    },
    onLoad: function(a) {
        this.getShangjiapinglun();
    },
    getShangjiapinglun: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Shangjiapinglun",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                n.setData({
                    list: a.data.data
                });
            }
        });
    },
    showClick: function(a) {
        this.setData({
            hid: a.currentTarget.dataset.hid,
            hidden: !1,
            focus: !0
        });
    },
    inputClick: function(a) {
        this.setData({
            values: a.detail.value
        });
    },
    faClick: function() {
        var n = this, a = n.data.values, t = n.data.hid;
        console.log(a, t), n.setData({
            hidden: !0
        }), app.util.request({
            url: "entry/wxapp/Shangjiahuifu",
            data: {
                content: a,
                hid: t
            },
            success: function(a) {
                n.getShangjiapinglun();
            }
        });
    },
    onShareAppMessage: function() {}
});