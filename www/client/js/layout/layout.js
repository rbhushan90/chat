angular.module('starter').directive('pxLayout', function () {
  console.log("layout directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/layout/layout.html';
    }
  }
});
