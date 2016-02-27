angular.module('starter').directive('pxProfile', function () {
  console.log("profile directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/profile/profile.html';
    },
    controllerAs: 'Profile',
    controller: Profile
  }
});


function Profile($scope, $rootScope, $ionicModal,$ionicActionSheet) {
  console.log("profileCtrl");

  this.userName = "James";


  this.flip = function() {
   $scope.onOff =  !$scope.onOff;
   if  ($scope.onOff) {
      this.message = "This is the FRONT";
   } else {
     this.message = "This is the BACK";
   }
 }

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      console.log("ionic view enter...PROFILE");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'profileMenu');
  });


  this.openIntegritometerModal = function () {
    console.log("open integritometer modal");

    $ionicModal.fromTemplateUrl("client/js/integritometer/integritometerModal.html", {
      scope: $rootScope
    }).then(function (modal) {
      $rootScope.modal = modal;
      $rootScope.modal.show();
    });
  };


    this.showActions = function() {
      showProfileActionSheet($ionicActionSheet);
    }

}
