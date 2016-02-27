angular.module('starter').directive('pxPromiseHome', function () {
  console.log("promiseHome directive");
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
      console.log("open promise list");
      $state.go("tab.promiselist");
  };

  this.openWatchList = function () {
      console.log("open watch list");
      $state.go("tab.watchlist");
  };


  this.comingSoon = function() {
      $rootScope.modal = $ionicModal.fromTemplate("<px-test-modal></px-test-modal>");
      $rootScope.modal.show();
  };

}
