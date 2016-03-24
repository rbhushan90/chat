// open in Modal mode
angular.module('starter').directive('pxAreasModal', function () {
  console.log("areasModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/areas/areasModal.html';
    },
    controllerAs: 'Areas',
    controller: Areas
  }
});


function Areas($scope, $rootScope, $ionicModal) {
  console.log("Areas ctrl");

  var areas = [
    { id: 1, name: 'Career'},
    { id: 2, name: 'Health'},
    { id: 3, name: 'Finance'},
    { id: 4, name: 'Family'},
    { id: 5, name: 'Friends'},
    { id: 6, name: 'Leisure'},
    { id: 7, name: 'Love'},
    { id: 8, name: 'Misc'}
  ];

  this.list = areas;

  this.hideModal = function () {
      $rootScope.modal.hide();
  };
}
