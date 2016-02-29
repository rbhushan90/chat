
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
      uid: 'facebook:102211453505444',
      name: 'Ann Ann Ann',
      image: 'img/adam.jpg'
    },
    {
      uid: 'facebook:10207221897619364',
      name: 'SS Smith',
      image: 'img/ben.png'
    },
    {
      uid: 'facebook:141031766284923',
      name: 'Bob Bob Bob',
      image: 'img/max.png'
    },
    {
      uid : 'facebook:139737919748901',
      name: 'Cat Cat Cat',
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
    console.log("invite " +item.name + " uid=" + item.uid);
    ChatFactory.inviteUserToChat(item.uid, Share.promiseId);
  }

}
