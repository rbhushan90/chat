angular.module('starter').directive('pxIntegritometer', function () {
  console.log("integritometer directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/integritometer/integritometer.html';
    },
    controllerAs: 'Integritometer',
    controller: Integritometer
  }
});


function Integritometer($scope, $rootScope, $ionicHistory) {
  console.log("Integritometer ctrl");

  Integritometer = this;
  Integritometer.labels =["Career", "Health", "Finance", "Family", "Friends", "Leisure", "Love", "Misc"];
  Integritometer.data = [
   [65, 70, 90, 81, 56, 55, 40],
   [28, 8, 40, 19, 96, 27, 100]
  ];


  Integritometer.hideModal = function () {
        $rootScope.modal.hide();
  };

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
     $ionicHistory.clearHistory();
      console.log("ionic view enter...Integritometer");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'contactsMenu');
  });
}
