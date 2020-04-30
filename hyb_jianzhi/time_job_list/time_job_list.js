var app = getApp();

Page({
    data: {
        broadcast: [],
        pageWrapCount: [],
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无兼职"
        } ],
        page: 0,
        pagesize: 8,
        scrollTop: 0,
        scrollHeight: 0,
        title: ""
    },
    onLoad: function(a) {
        var t = this, e = a.title;
        t.setData({
            title: e
        }), wx.setNavigationBarTitle({
            title: e
        }), t.getHuandengpian(), t.getJianzhi_listdh(e);
    },
    getHuandengpian: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Huandengpian",
            success: function(a) {
                t.setData({
                    broadcast: a.data.data
                });
            }
        });
    },
    getJianzhi_listdh: function(a,refresh = false) {
        console.log(a);
        var e = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_listdh",
            data: {
                openid: wx.getStorageSync("openid"),
                city: wx.getStorageSync("city"),
                page: e.data.page,
                pagesize: e.data.pagesize,
                title: a
            },
            success: function(a) {
                console.log(a)
                "0" != a.data.data.length && 0 < e.data.page && wx.showToast({
                    title: "加载中...",
                    icon: "none",
                    duration: 500
                }), app.globalData.keArr = a.data.data;
                var t = e.data.page + 1;
                console.log(t), e.setData({
                    pageWrapCount: e.data.pageWrapCount.concat([ 1 ]),
                    page: t
                }), e.setData({
                    Jianzhi: a.data.data 
                });
            }
        });
    },
    sort: function(a, t) {
        for (var e = 0; e < a.length; e++) if (t - a[e].juli < 0) {
            var i = a.splice(e, 1);
            a.push(i[0]);
        }
    },
    timeJobDetailClick: function(a) {
        wx.navigateTo({
            url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + a.detail.id
        });
    },
    timeJobMore: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/time_job_more/time_job_more"
        });
    },
    onReachBottom: function() {
        this.getJianzhi_listdh(this.data.title);
    },
    scroll: function(a) {
        this.setData({
            scrollTop: a.detail.scrollTop
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
      this.setData({
        page: 0,
        pagesize: 8,
      })
      this.getJianzhi_listdh();
    },
    onShareAppMessage: function() {}
});