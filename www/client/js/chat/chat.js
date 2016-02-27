// open in Modal mode
angular.module('starter').directive('pxChatModal', function () {
  console.log("chatModal directive");
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/chat/chatModal.html';
    },
    controllerAs: 'Chat',
    controller: Chat
  }
});



function Chat ($scope,$rootScope,$ionicActionSheet, $ionicModal, $stateParams, $state,
                     $timeout, $ionicScrollDelegate, ChatFactory) {

  console.log("Chat ctrl");
  uid = "facebook:10207221897619364";

  Chat = this;

  ChatFactory.getRoomId(Chat.promiseId,uid, setChatRoomId);

  function setChatRoomId(roomId) {
    console.log("setChatRoomId = " + roomId);
    Chat.roomId = roomId;
  }

  $scope.$on('modal.shown', function(event, modal) {
      console.log('Shown Modal ' + modal.modalId + ' is shown!');
      console.log("is for promiseId = "  + Chat.promiseId);
      if ( modal.modalId=="CHAT") {
          ChatFactory.enterPromiseChat(Chat.promiseId, uid);

        //ChatFactory.enterPromiseRoom(roomId);

          // 1. get last 20 messages..
          // 2. set 'message-add' listeners
      }
  });



  $scope.$on('modal.hidden', function(event, modal) {
       console.log('Hidden Modal ' + modal.modalId + ' is hidden!');
       if ( modal.modalId=="CHAT") {
         ChatFactory.closeMyChats();
       }
  });




  // passed in via Directive
  console.log("...Chat.promiseId = "  + Chat.promiseId);

  Chat.list = [];
  Chat.invitations = [];
  Chat.data = {}; // holds the new message that User types
  Chat.data.message = "";



  // when new messags arrive, scroll to bottom

  $scope.$watchCollection("Chat.list", function(newValue, oldValue) {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
  });


  Chat.hideModal = function () {
        $rootScope.modal.hide();
  };

  Chat.counterOffer = function () {
      console.log("hide chat modal");

        $rootScope.modal.hide();
        pushModal($rootScope.modal);

        console.log("open counter-offer modal");
        modal = "<px-counteroffer-modal promise-id='" + Promise.promiseId + "'></px-counteroffer-modal>";
        $rootScope.modal = $ionicModal.fromTemplate(modal);
        $rootScope.modal.show();

  };

  $scope.$on('modal.hidden', function() {
    console.log("modal hidden......");

    if (peekModal()) {
      console.log("there's a modal is the stack, show it");
      $rootScope.modal = popModal();
      $rootScope.modal.show();
    }

  });


  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  ////////////


  Chat.inviteUser = function(roomId, roomName) {
    console.log("inviteUser() : " + roomName + " id = " + roomId);
    userId = "facebook:102211453505444";
    ChatFactory.inviteUser(userId, id);
  }




  Chat.sendMessage = function() {
    console.log("CHAT sendMessage......");


    /* do validation. I think this is a Meteor library / underscore
    if (_.isEmpty(Chat.data.message)) {
      return;
    }
    */

    console.log(">> roomId=" + Chat.roomId);
    ChatFactory.sendMessage(Chat.roomId, Chat.data.message);

    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

    delete Chat.data.message;
  }

  Chat.inputUp = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 216;
    }

    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }

  Chat.inputDown = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 0;
    }
    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  Chat.closeKeyboard = function() {
    console.log("Close Keyboard..");
    // cordova.plugins.Keyboard.close();
  }


}
