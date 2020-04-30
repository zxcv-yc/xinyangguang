var app = getApp();

Component({
    properties: {
        none: {
            type: Array
        }
    },
    data: {
        keArr: []
    },
    methods: {
        setListData: function() {
            this.setData({
                keArr: app.globalData.keArr
            }), app.globalData.keArr = [];
        },
        detailClick: function(t) {
            var a = {
                id: t.detail.id
            };
            this.triggerEvent("detailBtn", a);
        }
    },
    ready: function() {
        this.setListData();
    }
});