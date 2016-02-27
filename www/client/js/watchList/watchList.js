angular.module('starter').directive('pxWatchList', function () {
  console.log("watch list directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/watchList/watchList.html';
    },
    controllerAs: 'WatchList',
    controller: WatchList
  }
});


function WatchList($scope, $rootScope) {
  this.data = {
    items: []
  };

  for (var i = 0; i < 8; i++) {
    this.data.items.push({
      id: i,
      label: "Watch Item " + i
    })
  }
}
