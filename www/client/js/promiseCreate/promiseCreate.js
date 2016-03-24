
// open in Modal mode
angular.module('starter').directive('pxPromiseCreateModal', function () {
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/promiseCreate/promiseCreateModal.html';
    },
    controllerAs: 'PromiseCreate',
    controller: PromiseCreate
  }
});

function PromiseCreate($scope, $rootScope, $ionicModal,  $ionicActionSheet) {

  PromiseCreate = this;

  PromiseCreate.hideModal = function()  {
    console.log("promise create - hide modal");
    $rootScope.modal.hide();
  }



  $scope.$on('modal.hidden', function() {
    console.log("Promise create / modal hidden......");

    if (peekModal()) {
      console.log("there's a modal is the stack, show it");
      $rootScope.modal = popModal();
      $rootScope.modal.show();
    }
  });

  PromiseCreate.save = function(item) {
    console.log("save promise....and hide modal");
    PromiseCreate.hideModal();
  }


}
