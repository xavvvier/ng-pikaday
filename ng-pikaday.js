'use strict';
angular.module('Pikaday', [])
  .directive('pikaday', function () {
  return {
    restrict: 'A',
    require:'?ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var Modernizr = Modernizr;
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
      if (hasTouch && hasNativeDate) {
          var inputDate = angular.element('<input type="date"/>');
          elem.parent().append(inputDate);
          inputDate.bind('change', function (event) {
              var value = inputDate.val();
              elem.val(value||'');
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
                      inputDate.val(newValue);
                  } else {
                      inputDate.val('');
                  }
              }
          });
      } else {
          var modelName = attrs.ngModel;
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
