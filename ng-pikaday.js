'use strict';
angular.module('Pikaday', [])
  .directive('pikaday', function () {
      var WireFormat = "YYYY-MM-DD";
      var DateFormat ='YYYY-MM-DD';
  return {
    restrict: 'A',
    require:'?ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var hasTouch = Modernizr.touch,
        hasNativeDate = Modernizr.inputtypes.date;
      if (hasTouch && hasNativeDate) {
          var inputDate = angular.element('<input type="date"/>');
          elem.parent().append(inputDate);
          inputDate.bind('change', function (event) {
              var value = inputDate.val();
              var date = '';
              if (value) {
                 date=moment(value, WireFormat).format(DateFormat);
              }
              elem.val(date);
              if (ngModel) {
                  scope.$apply(function () {
                      ngModel.$setViewValue(date);
                  });
              }
          });
          var modelName = attrs.ngModel;
          scope.$watch(modelName, function (newValue, oldValue) {
              if (newValue || oldValue) {
                  if (newValue) {
                      var date = moment(newValue, DateFormat).format(WireFormat);
                      inputDate.val(date);
                  } else {
                      inputDate.val('');
                  }
              }
          });
      } else {
          var picker = new Pikaday({
            field: elem[0],
            bound: attrs.bound !== 'false',
            position: attrs.position || '',
            format: attrs.format || DateFormat, // Requires Moment.js for custom formatting
            defaultDate: new Date(attrs.defaultDate),
            setDefaultDate: attrs.setDefaultDate === 'true',
            firstDay: attrs.firstDay ? parseInt(attrs.firstDay) : 0,
            minDate: new Date(attrs.minDate),
            maxDate: new Date(attrs.maxDate),
            yearRange: attrs.yearRange ? JSON.parse(attrs.yearRange) : 10, // Accepts int (10) or 2 elem array ([1992, 1998]) as strings
            yearSuffix: attrs.yearSuffix || '',
            showMonthAfterYear: attrs.showMonthAfterYear === 'true',

            onSelect: function () {
                if (ngModel) {
                    ngModel.$setViewValue(picker.toString());
                }
            }
          });
          var modelName = attrs.ngModel;
          scope.$watch(modelName, function (newValue, oldValue) {
              if (newValue || oldValue) {
                  if (newValue) {
                      var m=moment(newValue, DateFormat);
                      if (newValue.length==10 && m.isValid()) {
                          var date = m.toDate();
                          picker.setDate(date, true);
                      }
                  } else {
                      picker.setDate(null,true);
                  }
              }
          });
          scope.$on('$destroy', function () {
            picker.destroy();
          });
      }
    }
  };
});
