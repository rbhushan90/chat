// open in Modal mode
angular.module('starter').directive('pxCounterofferModal', function () {
  console.log("counter offer modal directive");
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/counteroffer/counterofferModal.html';
    },
    controllerAs: 'Counteroffer',
    controller: Counteroffer
  }
});


function Counteroffer($scope, $rootScope, $ionicModal) {
  console.log("Counteroffer ctrl");

  Counteroffer = this;

  console.log("...Counteroffer.promiseId = "  + Counteroffer.promiseId);

  Counteroffer.hideModal = function () {
      $rootScope.modal.hide();
  };

  Counteroffer.counter = function () {
    $rootScope.modal.hide();
    console.log("this is the counter offer");
  };
}
