// open in Modal mode
angular.module('starter').directive('pxChatModal', function () {
  //console.log("chatModal directive");
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

var initChat=false;

function Chat ($scope,$rootScope,$ionicActionSheet, $ionicModal, $stateParams, $state,
                     $timeout, $ionicScrollDelegate, ChatFactory, FirebaseAuth) {

  // console.log("Chat ctrl");

  Chat = this;

  if ( FirebaseAuth.isAuthenticated() && initChat==false) {
    ChatFactory.setupNewMessageListener(newMessageReceivedCallback);
    ChatFactory.setupRoomInviteListener(roomInviteCallback, roomInviteResponseCallback);
    initChat = true;
  }


  $scope.$on('modal.shown', function(event, modal) {
      console.log('Shown Modal ' + modal.modalId + ' is shown! promiseId = '  + Chat.promiseId);

      if ( FirebaseAuth.isAuthenticated() ) {
        console.log("is Authenticated, ok...");
        Chat.warn = "";
      } else {
        Chat.warn = "You are not Authenticated, please log in";
      }
      if ( modal.modalId=="CHAT") {
          ChatFactory.enterPromiseChat(Chat.promiseId);
          Chat.roomId = ChatFactory.getPromiseRoomId(Chat.promiseId);
      }
  });


  $scope.$on('modal.hidden', function(event, modal) {
       console.log('Hidden Modal ' + modal.modalId + ' is hidden!');
       if ( modal.modalId=="CHAT") {
         // chat modal closed
       }
       if (peekModal()) {
         console.log("there's a modal is the stack, show it");
         $rootScope.modal = popModal();
         $rootScope.modal.show();
       }
  });

  Chat.logEventListener = function() {
    ChatFactory.logEventListeners();
  }


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



  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  ////////////


  Chat.sendMessage = function() {
    console.log("CHAT sendMessage......");

    /* do validation. I think this is a Meteor library / underscore
    if (_.isEmpty(Chat.data.message)) {
      return;
    }
    */

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

  Chat.acceptInvite = function(invite) {
    console.log("acceptInvite", invite);
    ChatFactory.acceptInviteToChat(invite, roomInviteResponseCallback);
  }

  Chat.declineInvite = function(invite) {
    console.log("declineInvite", invite);
    ChatFactory.declineInviteToChat(invite, roomInviteResponseCallback);
  }

  function newMessageReceivedCallback(roomId, message) {
     usersCurrentRoom =   Chat.roomId;
      console.log("[NEW MESSAGE] User's current room:" + usersCurrentRoom + "  message for room:" + roomId);

      if ( usersCurrentRoom != roomId) {
        console.log("NOT for this room, new message,  roomId=" + roomId + " msg=",  message);
        return;
      }

      var userId = message.userId;
      if (!this._user || !this._user.muted || !this._user.muted[userId]) {
        if ( usersCurrentRoom == roomId)
        $timeout(function() {
          Chat.list.push (message);
        }, 300);

        console.log("NEW MESSAGE --> roomId=" + roomId + " msg=",  message);
      }
  }


  function roomInviteCallback(invite) {
    console.log("NEW INVITE !! roomInviteCallback : ", invite);
    $timeout(function() {
      Chat.invitations.push(invite);
    }, 300);
  }

  function roomInviteResponseCallback(resp) {
    console.log("INVITE response !! roomInviteResponseCallback : ", resp);
  }


}
