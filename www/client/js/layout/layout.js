angular.module('starter').directive('pxLayout', function () {
  //console.log("layout directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/layout/layout.html';
    },
    controllerAs: 'Layout',
    controller: Layout
  }
});


function Layout($scope, $rootScope,  $state, $ionicHistory,  $timeout) {

  Layout = this;

  Layout.goBack = function() {
     $ionicHistory.goBack();
  }

  Layout.show = function() {
    //console.log("back=", $ionicHistory.backView() );
    if ( $ionicHistory.backView() != null ) {
      //console.log("has back");
      return true;
    }
    return false;
  }

};
