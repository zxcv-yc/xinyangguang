var app = getApp();

Page({
    data: {
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无兼职"
        } ]
    },
    onLoad: function(n) {
        this.getUserscjianzhi();
    },
    getUserscjianzhi: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Userscjianzhi",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(n) {
                t.setData({
                    list: n.data.data
                });
            }
        });
    },
    getform: function(n) {
        console.log(n), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: n
            },
            success: function(n) {}
        });
    },
    link: function(n) {
        this.getform(n.detail.formId);
        var t = n.currentTarget.dataset.j_id;
        wx.navigateTo({
            url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + t
        });
    },
    timeJobMore: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/time_job_more/time_job_more"
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