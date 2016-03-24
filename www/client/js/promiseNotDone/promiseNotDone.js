
// open in Modal mode
angular.module('starter').directive('pxPromiseNotDoneModal', function () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/promiseNotDone/promiseNotDoneModal.html';
    },
    controllerAs: 'PromiseNotDone',
    controller: PromiseNotDone
  }
});

function PromiseNotDone($scope, $rootScope, $ionicModal) {
console.log("promise not done controller");
  PromiseNotDone = this;

  PromiseNotDone.hideModal = function()  {
    $rootScope.modal.hide();
  }

  PromiseNotDone.save = function()  {
    PromiseNotDone.hideModal();
  }



}
