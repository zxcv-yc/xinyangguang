Component({
    properties: {
        footdex: {
            type: String,
            value: 0
        },
        footer: {
            type: Object,
            value: {
                txtcolor: "#A2A2A2",
                seltxt: "#2c2c2c",
                background: "#fff",
                list: [ {
                    url: "/hyb_jianzhi/index/index",
                    icons: "/hyb_jianzhi/images/footer_index.png",
                    selIcon: "/hyb_jianzhi/images/footer_index_hover.png",
                    text: "首页"
                }, {
                    url: "/hyb_jianzhi/time_job_more/time_job_more",
                    icons: "/hyb_jianzhi/images/footer_time_job.png",
                    selIcon: "/hyb_jianzhi/images/footer_time_job_hover.png",
                    text: "全部"
                }, 
                // {
                //     url: "/hyb_jianzhi/shop_release/shop_release?typs=发布",
                //     icons: "/hyb_jianzhi/images/footer_fubu_hover.png",
                //     selIcon: "/hyb_jianzhi/images/footer_fubu2_hover.png",
                //     text: "岗位发布"
                // }, {
                //     url: "/hyb_jianzhi/shop/shop",
                //     icons: "/hyb_jianzhi/images/footer_ruzhu_hjhr.png",
                //     selIcon: "/hyb_jianzhi/images/footer_ruzhu2_hjhr.png",
                //     text: "商家中心"
                // }, 
                {
                    url: "/hyb_jianzhi/my/my",
                    icons: "/hyb_jianzhi/images/footer_my.png",
                    selIcon: "/hyb_jianzhi/images/footer_my_hover.png",
                    text: "个人中心"
                } ]
            }
        }
    },
    data: {},
    xinxi: function() {
        wx.getSystemInfo({
            success: function(e) {
                console.log(e);
            }
        });
    },
    methods: {}
});