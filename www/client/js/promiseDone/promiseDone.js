
// open in Modal mode
angular.module('starter').directive('pxPromiseDoneModal', function () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/promiseDone/promiseDoneModal.html';
    },
    controllerAs: 'PromiseDone',
    controller: PromiseDone
  }
});

function PromiseDone($scope, $rootScope, $ionicModal) {

  PromiseDone = this;

  PromiseDone.hideModal = function()  {
    $rootScope.modal.hide();
  }

  PromiseDone.save = function()  {
    PromiseDone.hideModal();
  }

  PromiseDone.takePhoto = function()  {
    console.log("take photo");
  }

  PromiseDone.choosePhoto = function()  {
    console.log("choose photo");
  }

}
