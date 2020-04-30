var app = getApp();

Page({
    data: {
        sex: 0,
        b_id: "",
        f_id: ""
    },
    onLoad: function(a) {
        var t = a.b_id, e = a.f_id, n = a.b_openid;
        this.setData({
            b_id: t,
            f_id: e
        }), this.getBaomingzhe(n);
    },
    getBaomingzhe: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Baomingzhe",
            data: {
                b_openid: a
            },
            success: function(a) {
                t.setData({
                    list: a.data.data
                });
            }
        });
    },
    Luyong: function(a) {
        var t = a.currentTarget.dataset.b_id;
        app.util.request({
            url: "entry/wxapp/Luyong",
            data: {
                b_id: t
            },
            success: function(a) {
                wx.navigateTo({
                    url: "/hyb_jianzhi/shop_apply/shop_apply?index=2"
                });
            }
        });
    },
    Buluyong: function(a) {
        var t = this, e = a.currentTarget.dataset.b_id;
        app.util.request({
            url: "entry/wxapp/Buluyong",
            data: {
                b_id: e
            },
            success: function(a) {
                t.getBaomingxq(t.data.f_id, t.data.state);
            }
        });
    },
    callPhone: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.phone
        });
    },
    onShareAppMessage: function() {}
});