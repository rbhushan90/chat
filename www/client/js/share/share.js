
// open in Modal mode
angular.module('starter').directive('pxShareModal', function () {
  console.log("shareModal directive");
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/share/shareModal.html';
    },
    controllerAs: 'Share',
    controller: Share
  }
});

function Share($scope, $rootScope, $ionicModal, ChatFactory) {
  console.log("Share ctrl");
  var contacts = [
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

  Share = this;
  Share.list = contacts;

  console.log("...Share.promiseId = "  + Share.promiseId);

  Share.hideModal = function()  {
    $rootScope.modal.hide();
  }

  Share.createPrivateRoom = function() {
      ChatFactory.createPrivateRoom(Share.promiseId);
  }

  // send Invite for Chatroom. If Room does not exist, create one first
  Share.invite = function(item)  {
    console.log("invite " +item.name);
  }

}
