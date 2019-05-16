Template.afBootstrapDateTimePicker.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control datetimepicker-input");
        atts['data-target'] = "#" + atts.id;
        delete atts.dateTimePickerOptions;
        return atts;
    }
});

Template.afBootstrapDateTimePicker.rendered = function () {
    var $input = this.$('input');

    var data = this.data;
    var opts = data.atts.dateTimePickerOptions || {
        allowInputToggle: true
    };

    if (opts.allowInputToggle !== false) {
        opts.allowInputToggle = true;
    }

    // To be able to properly detect a cleared field, the defaultDate,
    // which is "" by default, must be null instead. Otherwise we get
    // the current datetime when we call getDate() on an empty field.
    if (!opts.defaultDate || opts.defaultDate === "") {
        opts.defaultDate = null;
    }

    // instanciate datetimepicker
    $input.datetimepicker(opts);

    // set and reactively update values
    this.autorun(function () {
        var data = Template.currentData();
        var dtp = $input.data("datetimepicker");
        // set field value
        if (data.value instanceof Date) {
            $input.datetimepicker('date', data.value)
        } else {
            $input.datetimepicker('date', null); // clear
        }

        // set start date if there's a min in the schema
        if (data.min instanceof Date) {
            dtp.setMinDate(data.min);
        }

        // set end date if there's a max in the schema
        if (data.max instanceof Date) {
            dtp.setMaxDate(data.max);
        }
    });

};

Template.afBootstrapDateTimePicker.destroyed = function () {
    this.$('input').datetimepicker("destroy");
};