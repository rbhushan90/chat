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
// open in Modal mode
angular.module('starter').directive('pxNotificationsModal', function () {
  console.log("notificationsModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/notifications/notificationsModal.html';
    },
    controllerAs: 'Notifications',
    controller: Notifications
  }
});


function Notifications($scope, $rootScope, $ionicModal) {
  console.log("Notifications ctrl");

  var list = [
    { name: 'Tony Jarvis sent you a Promise'},
    { name: 'Sally McDonald sent you a Promise'},
    { name: 'Jack Blake sent you a Promise'},
    { name: 'Simon Brown sent you a Promise'},
  ];

  this.list = list;

  this.hideModal = function () {
      $rootScope.modal.hide();
  };
}
