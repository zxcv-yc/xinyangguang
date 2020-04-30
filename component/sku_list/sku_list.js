Component({
    properties: {
        keArr: {
            type: Array
        },
        none: {
            type: Array
        }
    },
    data: {},
    methods: {
        timeJobDetailClick: function(t) {
            if ("1" == t.currentTarget.dataset.gq) wx.showToast({
                title: "此职位已过期",
                image: "/hyb_jianzhi/images/errors.png"
            }); else {
                var e = {
                    id: t.currentTarget.dataset.j_id,
                    gq: t.currentTarget.dataset.gq
                };
                this.triggerEvent("detailBtn", e);
            }
        }
    }
});