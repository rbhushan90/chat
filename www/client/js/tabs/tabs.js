angular.module('starter').directive('pxClearTabHistory', function () {
  console.log("tabs directive");

  return {
    restrict: 'A',
    controllerAs: 'Tab',
    controller: Tab
  }

});


function Tab($scope, $rootScope, $state, $ionicTabsDelegate,$ionicHistory) {
  console.log("tabs controller...");

  Tab = this;

  Tab.clearHistory = function() {
    console.log("TabsCtrl  - clear Tab history. Otherwise, when you click a Tab, you get the last View that was displayed there");
    $ionicHistory.clearHistory();
  }
}
