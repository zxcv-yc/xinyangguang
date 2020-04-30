Page({
    data: {
        data: [ {
            tiple: "教育背景",
            tip: "添加教育背景",
            val: ""
        }, {
            tiple: "工作经历",
            tip: "添加工作经历",
            val: ""
        }, {
            tiple: "校内实践",
            tip: "添加校内实践",
            val: ""
        }, {
            tiple: "荣誉奖励",
            tip: "添加荣誉奖励",
            val: ""
        } ]
    },
    dian: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.index;
        console.log(a);
        var n = this.data.data;
        n[t].val = "请添加", this.setData({
            data: n
        });
    },
    guan: function(a) {
        var t = a.currentTarget.dataset.index, n = this.data.data;
        "请添加" == n[t].val && (n[t].val = " ", this.setData({
            data: n
        }));
    },
    dongxi: function(a) {
        var t = a.currentTarget.dataset.index, n = this.data.data, o = a.detail.value;
        n[t].val = o, this.setData({
            data: n
        }), console.log(a);
    },
    tijiao: function() {
        var a = this.data.data;
        console.log(a);
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});