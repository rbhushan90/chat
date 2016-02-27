angular.module('starter').directive('pxTestModal', function () {
  console.log("testModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/testModal/testModal.html';
    },
    controllerAs: 'TestModal',
    controller: TestModal
  }
});

function TestModal($scope, $rootScope,$ionicActionSheet) {
  console.log("TestModal ctrl");
  var list = [
    {
      name: 'Adam Jones',
      image: 'img/adam.jpg'
    },
    {
      name: 'Ben Smith',
      image: 'img/ben.png'
    },
    {
      name: 'Max McMillian',
      image: 'img/max.png'
    },
    {
      name: 'Mike Sanders',
      image: 'img/mike.png'
    }
  ];

  this.list = list;

  this.hideModal = function () {
        $rootScope.modal.hide();
  };


}
