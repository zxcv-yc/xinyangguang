var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var i = a.id;
        this.getPianxinxixq(i);
    },
    getPianxinxixq: function(a) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Pianxinxixq",
            data: {
                id: a
            },
            success: function(a) {
                i.setData({
                    pianxinxi: a.data.data
                });
            }
        });
    },
    onShareAppMessage: function() {}
});