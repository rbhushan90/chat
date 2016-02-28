angular.module('starter').directive('pxPromiseList', function () {
  console.log("promise list directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/promiseList/promiseList.html';
    },
    controllerAs: 'PromiseList',
    controller: PromiseList
  }
});


function PromiseList($scope, $rootScope) {
  this.data = {
    items: []
  };

  for (var i = 1; i <4; i++) {
    this.data.items.push({
      id: i,
      label: "Your Promise Item " + i
    })
  }
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      console.log("ionic view enter...PROMISE");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');

  });
}
