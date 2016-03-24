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


//var baseRef = new Firebase('https://dannybchat.firebaseio.com/room-messages/-KCnAvchlvXeSa369X7A');
var baseRef = new Firebase('https://dannybchat.firebaseio.com/room-messages');


var firstNotification=true;


function Chat($scope, $rootScope, $stateParams, $state, $window,
  $timeout, ChatFactory, FirebaseAuth) {


  Chat = this;
  Chat.promiseId = $stateParams.promiseId;
  Chat.roomId = getPromiseRoomId(Chat.promiseId);
  initChatHeight();

  Chat.datasource = {};
  Chat.datasource.get = function(index, count, success) {
    console.log("datasource get()  index=" + index + " count=" + count + " Room = " + Chat.roomId);

    // when starting index is negative, count how many items we need to load from index 1
    if (index < 0) {
      var tmpCount = count;
      count =  index + tmpCount -1 ;  // load only n-items

      console.log("index < 0, load only the outstanding items we need, count=",count);
      if (count==0) {
        return success([]);
      }
    }

    return $timeout(function() {
      result = [];
      baseRef.child(Chat.roomId).orderByChild("seqId").startAt(index).limitToFirst(count).once('value').then(function(snapshot) {
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
       console.log("ionicView leave - unsubscribe new messages");
       teardownMessageListener();
  });


   $scope.$on( "$ionicView.enter", function( scopes, states ) {
    console.log("-------> ionic view enter...CHATS");
    firstNotification=true;

    var authData = baseRef.getAuth();
    if (authData) {
        setupMessageListener(authData);
    } else {
      alert("You are not logged in !!!!! ");
    }

  });

  Chat.invitations = [];
  Chat.data = {}; // holds the new message that User types
  Chat.data.message = "";

  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  ////////////

  Chat.sendMessage = function() {
    if (Chat.data.message.length < 1) {
      return;
    }

    firechat.sendMessage( Chat.roomId, Chat.data.message, 'default', messageSentCallback);
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

        chatbox_height = $window.innerHeight - 45 - 44;  // minus the Header and 'Send Message' bar
        chatbox_height_style = "height:" + chatbox_height + "px";

        console.log("Calculated chat height=", chatbox_height_style);
        document.getElementById('myList').style = chatbox_height_style;
    }


  function newMessageReceivedCallback(roomId, message) {
    console.log("NEW MESSAGE --> roomId=" + roomId + " msg=", message);

    // ignore the first 'new' message as we already have it  when we loaded the last n-items
    if (firstNotification) {
      console.log("first Notification - ignore that message");
      firstNotification=false;
      return;
    }

    usersCurrentRoom = Chat.roomId;

    var userId = message.userId;
    if (!this._user || !this._user.muted || !this._user.muted[userId]) {
      if (usersCurrentRoom == roomId)
      Chat.adapter.append([message]); // pass in an Array !

      $timeout(function() {
        document.getElementById('myList').scrollTop += 300; //pixels. scroll to bottom
      }, 10);
    }
  }

  // callback for new messages
  function setupMessageListener(authData) {
    console.log("Authenticated user with uid:", authData.uid);

    // enter the room after setUser
    firechat.setUser(authData.uid, authData.facebook.displayName, function(user) {
      console.log("setUser() callback : USER....", user);
      firechat.enterRoom(Chat.roomId);
      firechat.on("message-add", newMessageReceivedCallback);
    });

    //load latest chats from a starting point
    baseRef.child(Chat.roomId).orderByChild("seqId").limitToLast(1).once("child_added").then(function(snapshot) {
      pos = snapshot.val().seqId
      console.log("LOAD latest chats starting from seqId: ", pos);

      $timeout(function() {
        Chat.adapter.reload(pos);
      }, 50);
    }, function(error) {
      // The Promise was rejected.
      console.error("getLatest() error : " + error);
    });
  }


  function teardownMessageListener() {
    firechat.leaveRoom(Chat.roomId);
    delete firechat._events["message-add"];
  }

   function messageSentCallback(e) {
       console.log("Message Sent e=", e);
   }
}
