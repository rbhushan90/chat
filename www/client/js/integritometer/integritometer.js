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


function Integritometer($scope, $rootScope) {
  console.log("Integritometer ctrl");

  this.labels =["Career", "Health", "Finance", "Family", "Friends", "Leisure", "Love", "Misc"];
  this.data = [
   [65, 59, 90, 81, 56, 55, 40],
   [28, 48, 40, 19, 96, 27, 100]
  ];


  this.hideModal = function () {
        $rootScope.modal.hide();
  };

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      console.log("ionic view enter...Integritometer");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'contactsMenu');
  });
}
