'use strict';

angular.module('itemsapi').directive('onEnter',function() {
  var linkFn = function(scope,element,attrs) {
    element.bind("keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.onEnter);
        });
        event.preventDefault();
      }
    });
  };
  return {
    link:linkFn
  };
});

angular.module('directive.loading', []).directive('loading',   ['$http' ,function ($http) {
  return {
    restrict: 'A',
    link: function (scope, elm, attrs)
    {
      scope.isLoading = function () {
        return $http.pendingRequests.length > 0;
      };
      scope.$watch(scope.isLoading, function (v) {
        elm.hasClass('dialog-loader')
        var is_dialog = angular.element('.modal-content').css('display') == 'block' ? true : false;
        if (elm.hasClass('dialog-loader')) {
          if (v) {
            elm.show();
          } else {
            elm.hide();
          }
        } else if (elm.hasClass('general-loader')) {
          if (is_dialog) {
            elm.hide();
          } else {
            if (v) {
              elm.show();
            } else {
              elm.hide();
            }
          }
        }
      });
    }
  };
}]);
