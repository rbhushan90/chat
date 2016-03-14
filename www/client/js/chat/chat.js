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

  var baseRef = new Firebase('https://dannybchat.firebaseio.com/room-messages/-KCnAvchlvXeSa369X7A');


    Chat.datasource = {};
    Chat.datasource.get = function(index, count, success) {
      console.log("DATASOURCE GET()  index=" + index + " count=" + count );

      if ( index<0) {
        console.log("index < 0, return");
        return success([]);
      }

      return $timeout(function() {
        result = [];
        baseRef.orderByChild("seqId").startAt(index).limitToFirst(count).once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key();
                var val = childSnapshot.val();

               //console.log("LOAD --> key: ", key + "  val=", val);
                result.push( val );
              });
              return success(result);
        }, function(error) {
          console.error(error);
        });

      }, 100);
    };



  if ( FirebaseAuth.isAuthenticated() && initChat==false) {
  //  ChatFactory.setupNewMessageListener(newMessageReceivedCallback);
    //ChatFactory.setupRoomInviteListener(roomInviteCallback, roomInviteResponseCallback);

    lastSeqId = 1;
    count=1;
    baseRef.orderByChild("seqId").limitToLast(1).on('child_added', function(snapshot) {
        console.log("latest =", snapshot.val() );
        //console.log("adapter  =", Chat.adapter);
       Chat.adapter.append([snapshot.val()]); // pass in an Array !

       $timeout(function() {
          document.getElementById('myList').scrollTop += 200; // pixels !
       }, 50);
        console.log("myList=",   document.getElementById('myList'));
    });

    initChat = true;
  };


  $scope.$on('modal.shown', function(event, modal) {
      console.log('Shown Modal ' + modal.modalId + ' is shown! promiseId = '  + Chat.promiseId);

      if ( FirebaseAuth.isAuthenticated() ) {
        Chat.warn = "";
      } else {
        Chat.warn = "You are not Authenticated, please log in";
      }

      if ( modal.modalId=="CHAT") {
          ChatFactory.enterPromiseChat(Chat.promiseId);
          Chat.roomId = ChatFactory.getPromiseRoomId(Chat.promiseId);

          //load from a starting point
          //Chat.adapter.reload(100);    // works first time, then stops working
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

  Chat.scroll = function() {
      console.log("scroll....myList=",   document.getElementById('myList').scrollTop);
      document.getElementById('myList').scrollTop += 9999; // pixels !
  }

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
      //  $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
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

    /* do validation. I think this is a Meteor library / underscore
    if (_.isEmpty(Chat.data.message)) {
      return;
    }
    */

    ChatFactory.sendMessage(Chat.roomId, Chat.data.message);

  //  $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

    delete Chat.data.message;
  }

  Chat.inputUp = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 216;
    }

    $timeout(function() {
      //$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }

  Chat.inputDown = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 0;
    }
  //  $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  Chat.closeKeyboard = function() {
    console.log("Close Keyboard..");
    // cordova.plugins.Keyboard.close();
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





}
