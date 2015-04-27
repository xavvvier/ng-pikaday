'use strict';
angular.module('Pikaday', [])
  .directive('pikaday', function () {
  return {
    restrict: 'A',
    require:'?ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var Modernizr = window.Modernizr;
      var hasTouch = Modernizr && Modernizr.touch,
        hasNativeDate = Modernizr && Modernizr.inputtypes.date;
      var dateFromString = function(input){
         if(attrs.format){
            if(attrs.format.length==input.length){
               return moment(input, attrs.format).toDate();
            }
         }else if(input.length===15){
            return new Date(input);
         } 
         return null;
      };
      var modelName = attrs.ngModel;
      if (hasTouch && hasNativeDate) {
          var WireFormat = 'YYYY-MM-DD';
          var inputDate = angular.element('<input type="date" />');
          elem.parent().append(inputDate);
          elem.parent().addClass('mobile-date');
          inputDate.bind('change', function (event) {
              var value = inputDate.val();
              var date =moment(value, WireFormat).format(attrs.format);
              elem.val(date||'');
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
                      var wireFormattedDate= moment(newValue, attrs.format).format(WireFormat);
                      inputDate.val(wireFormattedDate);
                  } else {
                      inputDate.val('');
                  }
              }
          });
      } else {
          var defaultDate=dateFromString(scope[modelName]);
          var picker = new Pikaday({
            field: elem[0],
            bound: attrs.bound !== 'false',
            position: attrs.position || '',
            format: attrs.format,
            defaultDate: defaultDate,
            setDefaultDate: defaultDate!=null,
            firstDay: attrs.firstDay ? parseInt(attrs.firstDay) : 0,
            minDate: attrs.minDate && dateFromString(attrs.minDate),
            maxDate: attrs.maxDate && dateFromString(attrs.maxDate),
            yearRange: attrs.yearRange ? JSON.parse(attrs.yearRange) : 10,
            yearSuffix: attrs.yearSuffix || '',
            showMonthAfterYear: attrs.showMonthAfterYear === 'true',

            onSelect: function () {
                if (ngModel) {
                    ngModel.$setViewValue(picker.toString());
                }
            }
          });
          scope.$watch(modelName, function (newValue, oldValue) {
              if ((newValue || oldValue) && newValue !== oldValue) {
                  if (newValue) {
                      var date=dateFromString(newValue);
                      if (date) {
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
