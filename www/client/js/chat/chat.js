angular.module('starter').directive('pxChat', function() {
  //console.log("chatModal directive");
  return {
    restrict: 'E',
    scope: {},
    /*
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

var initChat = false;
var baseRef = new Firebase('https://dannybchat.firebaseio.com/room-messages/-KCnAvchlvXeSa369X7A');

function Chat($scope, $rootScope, $ionicActionSheet, $stateParams, $state, $window,
  $timeout, $ionicScrollDelegate, ChatFactory, FirebaseAuth) {

  Chat = this;
  Chat.promiseId = $stateParams.promiseId;

  // window height : http://www.gajotres.net/ionic-framework-get-page-height-width/
  //Chat.dev_width = $window.innerWidth;
  //Chat.dev_height = $window.innerHeight;

  chatbox_height = $window.innerHeight - 100;  // minus the Tab bar and the 'send message' bar
  chatbox_height_style = "height:" + chatbox_height + "px";

  console.log("Calculated chat height=", chatbox_height_style);
  document.getElementById('myList').style = chatbox_height_style;


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

  if (FirebaseAuth.isAuthenticated() && initChat == false) {
    //  ChatFactory.setupNewMessageListener(newMessageReceivedCallback);
    //ChatFactory.setupRoomInviteListener(roomInviteCallback, roomInviteResponseCallback);

    lastSeqId = 1;
    count = 1;
    baseRef.orderByChild("seqId").limitToLast(1).on('child_added', function(snapshot) {
      console.log("latest =", snapshot.val());
      //console.log("adapter  =", Chat.adapter);
      Chat.adapter.append([snapshot.val()]); // pass in an Array !

      $timeout(function() {
        document.getElementById('myList').scrollTop += 200; // pixels !
      }, 50);
      console.log("myList=", document.getElementById('myList'));
    });

    initChat = true;
  };

  // Quirk !! see: https://forum.ionicframework.com/t/ionicview-events-not-firing/19825/8
   $scope.$parent.$on( "$ionicView.enter", function( scopes, states ) {
    console.log("-------> ionic view enter...CHATS");

    var authData = baseRef.getAuth();
    if (authData) {
      console.log("Authenticated user with uid:", authData.uid);
      ChatFactory.setup(authData);
    } else {
      alert("You are not logged in !!!!! ");
    }


    ChatFactory.enterPromiseChat(Chat.promiseId);
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

  Chat.backToPromise = function() {
      $state.go("tab.promise")
  }

  function newMessageReceivedCallback(roomId, message) {
    usersCurrentRoom = Chat.roomId;
    console.log("[NEW MESSAGE] User's current room:" + usersCurrentRoom + "  message for room:" + roomId);

    if (usersCurrentRoom != roomId) {
      console.log("NOT for this room, new message,  roomId=" + roomId + " msg=", message);
      return;
    }

    var userId = message.userId;
    if (!this._user || !this._user.muted || !this._user.muted[userId]) {
      if (usersCurrentRoom == roomId)
        $timeout(function() {
          Chat.list.push(message);
        }, 300);

      console.log("NEW MESSAGE --> roomId=" + roomId + " msg=", message);
    }
  }
}
