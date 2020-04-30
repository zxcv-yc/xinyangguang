Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500,
            imgUrls: [ "../resource/images/swiper_item.png", "../resource/images/swiper_item.png" ]
        },
        footer: {
            footdex: 0,
            txtcolor: "#A2A2A2",
            seltxt: "#EC6464",
            background: "#fff",
            list: [ {
                url: "/pages/recommend/recommend",
                icons: "/pages/images/footer_home.png",
                selIcon: "/pages//images/footer_home_hover.png",
                text: "首页"
            }, {
                url: "/pages/clue/clue",
                icons: "/pages/images/footer_lover.png",
                selIcon: "/pages/images/footer_lover_hover.png",
                text: "线索"
            }, {
                url: "/pages/service/service",
                icons: "/pages/images/footer_date.png",
                selIcon: "/pages/images/footer_date_hover.png",
                text: "服务中心"
            }, {
                url: "/pages/my/my",
                icons: "/pages/images/footer_my.png",
                selIcon: "/pages/images/footer_my_hover.png",
                text: "我的"
            } ]
        }
    },
    swichNav: function(e) {
        var o = this.data.nav;
        o.currentTab = e.currentTarget.dataset.current, this.setData({
            nav: o
        });
    },
    onLoad: function(e) {
        if (null != e.index) {
            var o = this.data.footer;
            o.footdex = e.index, this.setData({
                footer: o
            });
        }
    },
    onShareAppMessage: function() {}
});