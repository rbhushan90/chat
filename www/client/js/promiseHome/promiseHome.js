angular.module('starter').directive('pxPromiseHome', function () {
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/promiseHome/promiseHome.html';
    },
    controllerAs: 'PromiseHome',
    controller: PromiseHome
  }
});


function PromiseHome($scope, $rootScope, $state, $ionicModal, $ionicActionSheet) {

  PromiseHome = this;

  this.openPromiseList = function () {
    $state.go("tab.promiselist");
  };

  this.openWatchList = function () {
      $state.go("tab.watchlist");
  };


}
