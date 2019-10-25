AutoForm.addInputType("bootstrap-datetimepicker", {
    template: "afBootstrapDateTimePicker",
    valueIn: function (val, atts) {
        // datetimepicker expects the date to represent local time,
        // so we need to adjust it if there's a timezoneId specified
        var timezoneId = atts.timezoneId;
        if (typeof timezoneId === "string") {
            if (typeof moment.tz !== "function") {
                throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
            }
            if (val instanceof Date) {
                return moment(AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, timezoneId), "YYYY-MM-DD[T]HH:mm:ss.SSS").toDate();
            }
        }

        return val;
    },
    valueOut: function () {
        var m = this.data("datetimepicker") ? this.data("datetimepicker").date() : moment();
        if (!m) {
            return m;
        }
        var timezoneId = this.attr("data-timezone-id");
        // default is local, but if there's a timezoneId, we use that
        if (typeof timezoneId === "string") {
            if (typeof moment.tz !== "function") {
                throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
            }
            m = moment.tz(AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(m.toDate()), timezoneId);
        }
        return m.toDate();
    },
    valueConverters: {
        "string": function (val) {
            return (val instanceof Date) ? val.toString() : val;
        },
        "stringArray": function (val) {
            if (val instanceof Date) {
                return [val.toString()];
            }
            return val;
        },
        "number": function (val) {
            return (val instanceof Date) ? val.getTime() : val;
        },
        "numberArray": function (val) {
            if (val instanceof Date) {
                return [val.getTime()];
            }
            return val;
        },
        "dateArray": function (val) {
            if (val instanceof Date) {
                return [val];
            }
            return val;
        }
    },
    contextAdjust: function (context) {
        if (context.atts.timezoneId) {
            context.atts["data-timezone-id"] = context.atts.timezoneId;
        }
        delete context.atts.timezoneId;
        return context;
    }
});