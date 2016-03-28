angular.module('starter').directive('pxShowcaseModal', function () {
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/showcase/showcaseModal.html';
    },
    controllerAs: 'Showcase',
    controller: Showcase
  }
});


function Showcase($scope, $rootScope) {
  var list = [
    {
      name: 'This will look more exciting !',
      image: 'img/shot0.png',
      color: 'blue'
    },
    {
      name: 'Follow these Steps...',
      image: 'img/shot1.png',
      color: 'yellow'
    },
    {
      name: 'Send your Promise to Friends...',
      image: 'img/shot2.png',
      color: 'pink'
    },
    {
      name: 'Blah, Blah, Blah',
      image: 'img/shot3.png',
      color: 'green'
    },
    {
      name: 'Thank you for watching!',
      image: 'img/shot4.png',
      color: 'green'
    }
  ];

  Showcase = this;

  Showcase.list = list;
  Showcase.hideModal = function () {
      $rootScope.modal.hide();
  };

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');
  });
}
