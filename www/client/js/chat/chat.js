angular.module('starter').directive('pxChat', function() {
  //console.log("chatModal directive");
  return {
    restrict: 'E',
    /*
    scope: {},

        bindToController: {
          promiseId: "@"
        },
    */
    templateUrl: function() {
      return 'client/js/chat/chat.html';
    },
    controllerAs: 'Chat',
    controller: Chat
  }
});

var baseRef = new Firebase('https://dannybchat.firebaseio.com/room-messages/-KCnAvchlvXeSa369X7A');

function Chat($scope, $rootScope, $stateParams, $state, $window,
  $timeout, ChatFactory, FirebaseAuth) {


  Chat = this;
  Chat.promiseId = $stateParams.promiseId;
  initChatHeight();


  Chat.datasource = {};
  Chat.datasource.get = function(index, count, success) {
    console.log("datasource get()  index=" + index + " count=" + count);

    if (index < -10) {
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
          result.push(val);
        });
        return success(result);
      }, function(error) {
        console.error(error);
      });

    }, 100);
  };



  $scope.$on( "$ionicView.leave", function( scopes, states ) {
       console.log("ionicView leave - unsubscribe from notifications of new messages");
       //baseRef.off("child_added", newMessage);
       ChatFactory.leavePromiseChat(Chat.promiseId);
       ChatFactory.cancelEventListener("message-add");
  });


   $scope.$on( "$ionicView.enter", function( scopes, states ) {
    console.log("-------> ionic view enter...CHATS");

    var authData = baseRef.getAuth();
    if (authData) {
      console.log("Authenticated user with uid:", authData.uid);
      ChatFactory.setup(authData, Chat.promiseId);
    } else {
      alert("You are not logged in !!!!! ");
    }

    // listen for new chat messages
    //baseRef.orderByChild("seqId").limitToLast(1).on('child_added', newMessage );

    ChatFactory.setupNewMessageListener(newMessageReceivedCallback);
    Chat.roomId = ChatFactory.getPromiseRoomId(Chat.promiseId);

    //load from a starting point

    baseRef.orderByChild("seqId").limitToLast(1).once("child_added").then(function(snapshot) {
      pos = snapshot.val().seqId
      console.log("LOAD latest chats starting from seqId: ", pos);

      $timeout(function() {
        Chat.adapter.reload(pos);
      }, 50);
    }, function(error) {
      // The Promise was rejected.
      console.error("getLatest() error : " + error);
    });
  });


  Chat.invitations = [];
  Chat.data = {}; // holds the new message that User types
  Chat.data.message = "";


  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  ////////////


  Chat.sendMessage = function() {
    if (Chat.data.message.length < 1) {
      console.log("Empty message");
      return;
    }

    ChatFactory.sendMessage(Chat.roomId, Chat.data.message);
    delete Chat.data.message;
  }

  Chat.inputUp = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 216;
    }
  }

  Chat.inputDown = function() {
    if (isIOS) {
      Chat.data.keyboardHeight = 0;
    }
  }

  Chat.closeKeyboard = function() {
    console.log("Close Keyboard..");
    // cordova.plugins.Keyboard.close();
  }


    Chat.logEventListener = function() {
      ChatFactory.logEventListeners();
    }

  function initChatHeight() {
    // window height : http://www.gajotres.net/ionic-framework-get-page-height-width/
    //Chat.dev_width = $window.innerWidth;
    //Chat.dev_height = $window.innerHeight;

    chatbox_height = $window.innerHeight - 100;  // minus the Tab bar and the 'send message' bar
    chatbox_height_style = "height:" + chatbox_height + "px";

    console.log("Calculated chat height=", chatbox_height_style);
    document.getElementById('myList').style = chatbox_height_style;
  }

  function newMessage(snapshot) {
    console.log("new Message, latest =", snapshot.val());
    //console.log("adapter  =", Chat.adapter);
    Chat.adapter.append([snapshot.val()]); // pass in an Array !

    $timeout(function() {
      document.getElementById('myList').scrollTop += 200; // pixels !
    }, 10);
    //console.log("myList=", document.getElementById('myList'));
  }

  function newMessageReceivedCallback(roomId, message) {
    console.log("NEW MESSAGE --> roomId=" + roomId + " msg=", message);

    usersCurrentRoom = Chat.roomId;
    console.log("[NEW MESSAGE] User's current room:" + usersCurrentRoom + "  message for room:" + roomId);

    if (usersCurrentRoom != roomId) {
      console.log("NOT for this room, new message,  roomId=" + roomId + " msg=", message);
      return;
    }

    var userId = message.userId;
    if (!this._user || !this._user.muted || !this._user.muted[userId]) {
      if (usersCurrentRoom == roomId)
      Chat.adapter.append([message]); // pass in an Array !

      $timeout(function() {
        document.getElementById('myList').scrollTop += 200; // pixels !
      }, 10);

    }
  }

}
