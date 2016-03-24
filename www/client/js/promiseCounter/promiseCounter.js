
// open in Modal mode
angular.module('starter').directive('pxPromiseCounterModal', function () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/promiseCounter/promiseCounterModal.html';
    },
    controllerAs: 'PromiseCounter',
    controller: PromiseCounter
  }
});

function PromiseCounter($scope, $rootScope, $ionicModal) {

  PromiseCounter = this;

  PromiseCounter.hideModal = function()  {
    $rootScope.modal.hide();
  }

  PromiseCounter.save = function()  {
    PromiseCounter.hideModal();
  }



}
