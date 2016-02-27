angular.module('starter').directive('pxShowcase', function () {
  console.log("showcase directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/showcase/showcase.html';
    },
    controllerAs: 'Showcase',
    controller: Showcase
  }
});


function Showcase($scope, $rootScope) {
  console.log("Showcase ctrl");
  var contacts = [
    {
      name: 'To create a new Promise...',
      image: 'img/list1.jpg',
      color: 'blue'
    },
    {
      name: 'Follow these Steps...',
      image: 'img/list2.jpg',
      color: 'yellow'
    },
    {
      name: 'Swipe to the Right...',
      image: 'img/list3.jpg',
      color: 'pink'
    },
    {
      name: 'Blah, Blah, Blah',
      image: 'img/list4.jpg',
      color: 'green'
    }
  ];

  this.list = contacts;


  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');
  });
}
