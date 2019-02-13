(function($, ko) {
    function RatingItemViewModel(parent, index, label) {
        var self = this;

        self.index = index;
        self.label = label;
        self.highlighted = ko.pureComputed(function() {
            return parent.selectedIndex() === -1 ?
                self.index < parent.value() : self.index <= parent.selectedIndex();
        });
    }

    function RatingWidgetViewModel(params, componentInfo) {
        var self = this;
        
        self.element = $(componentInfo.element);
        self.max = params.nax || 5;
        self.value = params.value || ko.observable(0);
        self.labels = params.labels || ['Bad','Poor','Average','Good','Great'];
        self.items = [];
        for (var i = 0; i < self.max; i++) {
            self.items.push(new RatingItemViewModel(self, i, self.labels[i] || ''));
        }

        self.selectedIndex = ko.observable(-1);
        $(self.element).on('mouseenter', '.rating-widget span', function() {
            var model = ko.dataFor(this);
            self.selectedIndex(model.index);
        }).on('mouseleave', '.rating-widget span', function() {
            self.selectedIndex(-1);
        }).on('click touchend', '.rating-widget span', function() {
            var model = ko.dataFor(this);
            self.value(model.index + 1);
        });
    }

    ko.components.register('rating-widget', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                return new RatingWidgetViewModel(params, componentInfo);
            }
        },
        template: 
            '<div class="rating-widget" data-bind="foreach: items">\
                <!-- ko if: highlighted -->\
                <span data-bind="attr: { title: label }">&#9733</span>\
                <!-- /ko -->\
                <!-- ko if: !highlighted() -->\
                <span data-bind="attr: { title: label }">&#9734</span>\
                <!-- /ko -->\
            </div>'
    });
})(jQuery, ko);