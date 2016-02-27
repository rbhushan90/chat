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

  $scope.$on('modal.shown', function(event, modal) {
      console.log('Shown Modal ' + modal.modalId + ' is shown!');
      console.log("is for promiseId = "  + Chat.promiseId);
      if ( modal.modalId=="CHAT") {
          Chat.enterRoom(Chat.promiseId);

          // 1. get last 20 messages..
          // 2. set 'message-add' listeners
          ChatFactory.eventListener("room-enter", roomInviteReceivedCallback);
          ChatFactory.cancelEventListener("room-enter");

      }
  });

  $scope.$on('modal.hidden', function(event, modal) {
       console.log('Hidden Modal ' + modal.modalId + ' is hidden!');
  });


  Chat = this;

  // passed in via Directive
  console.log("...Chat.promiseId = "  + Chat.promiseId);

  Chat.list = [];
  Chat.invitations = [];
  Chat.data = {}; // holds the new message that User types
  Chat.data.message = "";

  ChatFactory.eventListener("message-add", newMessageReceivedCallback);
  ChatFactory.eventListener("room-invite", roomInviteReceivedCallback);


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

  Chat.enterRoom = function(promiseId) {
    console.log("Enter room for promise = " + promiseId);

    Chat.roomId = ChatFactory.getActiveRoom();  //  should have map of promiseId / roomId ?
    ChatFactory.enterRoom(Chat.roomId);
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

  // CALLBACKS


  function roomInviteReceivedCallback(invite) {
    console.log("roomInviteReceived invite:");
    console.log(invite);
    $timeout(function() {
      Chat.invitations.push(invite);
    }, 300);
  }


  function newMessageReceivedCallback(roomId, message) {
    console.log("new message received :");
    console.log(message);
    var userId = message.userId;
    if (!this._user || !this._user.muted || !this._user.muted[userId]) {
      //  this.showMessage(roomId, message);
      Chat.list.push (message);
    }
  }


}
