var app = getApp();

Page({
    data: {
        city: "",
        conB: "",
        content: "",
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无兼职"
        } ]
    },
    onLoad: function(t) {
        var a = t.city;
        this.setData({
            city: a
        }), this.getJianzhi_style();
    },
    getJianzhi_style: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_style",
            success: function(t) {
                a.setData({
                    positionArr1: t.data.data
                });
            }
        });
    },
    timeJobMore: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/time_job_more/time_job_more"
        });
    },
    searchBlur: function(t) {
        if (console.log(t.detail.value), "" != t.detail.value) {
            var a = t.detail.value;
            this.setData({
                conB: a
            });
        }
    },
    subClick: function(t) {
        var a = this, e = t.detail.value, i = t.detail.value.content;
        e.city = wx.getStorageSync("city"), e.openid = wx.getStorageSync("openid"), app.util.request({
            url: "entry/wxapp/Jianzhi_lists",
            data: e,
            success: function(t) {
                a.setData({
                    keArr: t.data.data,
                    conB: i
                });
            }
        });
    },
    sort: function(t, a) {
        for (var e = 0; e < t.length; e++) if (a - t[e].juli < 0) {
            var i = t.splice(e, 1);
            t.push(i[0]);
        }
    },
    hotClick: function(t) {
        var a = this, e = t.currentTarget.dataset.h_con, i = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Jianzhi_list",
            data: {
                con: e,
                city: i,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                a.setData({
                    keArr: t.data.data,
                    conB: e
                });
            }
        });
    },
    timeJobDetailClick: function(t) {
        var a = t.currentTarget.dataset.j_id;
        wx.navigateTo({
            url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + a
        });
    },
    returnClick: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/index/index"
        });
    },
    onShareAppMessage: function() {}
});