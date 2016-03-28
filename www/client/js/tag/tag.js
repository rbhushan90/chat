
// open in Modal mode
angular.module('starter').directive('pxTagModal', function () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@",
      action: "@"
    },
    templateUrl: function() {
        return 'client/js/tag/tagModal.html';
    },
    controllerAs: 'Tag',
    controller: Tag
  }
});

function Tag($scope, $rootScope, $ionicModal, ChatFactory) {
  var contacts = [
    {
      uid: 'facebook:102211453505444',
      name: 'Ann Ann Ann',
      tagline: 'Hi, Promises welcomed!',
      image: 'img/adam.jpg'
    },
    {
      uid: 'facebook:10207221897619364',
      name: 'SS Smith',
      tagline: 'Hello Hello Hello',
      image: 'img/ben.png'
    },
    {
      uid: 'facebook:141031766284923',
      name: 'Bob Bob Bob',
      tagline: 'Happy to help anyone with their Promises!',
      image: 'img/max.png'
    },
    {
      uid : 'facebook:139737919748901',
      name: 'Adam Ant',
      tagline: 'Hello World',
      image: 'img/mike.png'
    },
    {
      uid: 'facebook:102211453505444',
      name: 'Ben Brown',
      tagline: 'Hi, Promises welcomed!',
      image: 'img/adam.jpg'
    },
    {
      uid: 'facebook:10207221897619364',
      name: 'Cath Wilson',
      tagline: 'Greetings',
      image: 'img/ben.png'
    },
    {
      uid: 'facebook:141031766284923',
      name: 'John James',
      tagline: 'Happy to help anyone with their Promises!',
      image: 'img/max.png'
    },
  ];

  Tag = this;
  Tag.list = contacts;

  console.log("...Tag.promiseId = "  + Tag.promiseId);
  console.log("...Tag.action = "  + Tag.action);

  if ( Tag.action=='share') {
    Tag.title = "Share Promise";
  } else {
    Tag.title = "Send Request";
  }

  Tag.hideModal = function()  {
    $rootScope.modal.hide();
  }

  Tag.createPrivateRoom = function() {
      ChatFactory.createPrivateRoom(Tag.promiseId);
  }

  // send Invite for Chatroom. If Room does not exist, create one first
  Tag.sendInvite = function()  {
    //console.log("invite " +item.name + " uid=" + item.uid);
    //ChatFactory.inviteUserToChat(item.uid, Tag.promiseId);
    Tag.hideModal();
  }

  $scope.$on('modal.hidden', function() {
    console.log("Tag / modal hidden......");

    if (peekModal()) {
      console.log("there's a modal is the stack, show it");
      $rootScope.modal = popModal();
      $rootScope.modal.show();
    }
  });
}
