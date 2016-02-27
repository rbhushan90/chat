angular.module('starter').directive('pxClearTabHistory', function () {
  console.log("tabs directive");

  return {
    restrict: 'A',
    controllerAs: 'itClearTabHistory',
    controller: itClearTabHistory
  }

  /*
  return {
    link: function(scope, element, attributes){
     console.log("TAB title = " + attributes.title);
     //console.log("--attributes--");
     //console.log(attributes);
    }
  }
  */
});


function itClearTabHistory($scope, $rootScope, $state, $ionicTabsDelegate,$ionicHistory) {
  console.log("tabs controller...");


  $scope.clearHistory = function() {
    console.log("TabsCtrl  - clear Tab history. Otherwise, when you click a Tab, you get the last View that was displayed there");
    $ionicHistory.clearHistory();
  }
}
