angular.module('starter').directive('pxNotifications', function () {
  console.log("notifications directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/notifications/notifications.html';
    },
    controllerAs: 'Notifications',
    controller: Notifications
  }
});


function Notifications($scope, $rootScope, $ionicModal,$ionicHistory) {
  console.log("Notifications ctrl");

  var list = [
    { name: 'Tony Jarvis sent you a Promise'},
    { name: 'Sally McDonald sent you a Request'},
    { name: 'Jack Blake sent you a Promise'},
    { name: 'Simon Brown sent you a Promise'},
  ];

  Notifications = this;
  Notifications.list = list;

  Notifications.hideModal = function () {
      $rootScope.modal.hide();
  };

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    console.log("ionic view enter");
     $ionicHistory.clearHistory();
  });
}
