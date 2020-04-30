Component({
    properties: {
        a: {
            type: String,
            value: "111"
        }
    },
    data: {},
    methods: {
        timeJobMore: function() {
            this.triggerEvent("timeJobMore");
        }
    }
});