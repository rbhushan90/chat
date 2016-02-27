
angular.module('starter').factory('ChatFactory',  ChatFactory);

function ChatFactory($firebaseArray) {
  fbRef =  new Firebase(firebaseUrl);
  firechat = new Firechat(fbRef);
  activeRoomId = null;

	return {
      openMyChats: openMyChats,
      getRoomId: getRoomId,
      closeMyChats : closeMyChats,
      eventListener: eventListener,
      cancelEventListener: cancelEventListener,
      createPrivateRoom : createPrivateRoom,
      inviteUser : inviteUser,
      enterPromiseChat : enterPromiseChat,
      sendMessage : sendMessage
	};
}

// Be careful, function names can clash in the GLOBAL space.
// eg. addEventListener() is a Firechat function.
// How to create functions under a namespace ?

function eventListener(eventName, cb) {
  console.log("add event listener e=" + eventName);
  firechat.on(eventName, cb);
}

function cancelEventListener(eventName) {
  console.log("cancelEventListener  e=" + eventName);
  delete firechat._events[eventName];
}

function logEventListeners() {
    console.log("events:");
    console.log(firechat._events);
}

function createPrivateRoom(promiseId) {
  roomName = getRoomName(promiseId);
  console.log("PromiseId=" + promiseId + " room name = " + roomName);
  firechat.createRoom(roomName, "public", createPrivateRoomCallback);
  logEventListeners();
}

function createPrivateRoomCallback(roomId) {
  console.log("Room created roomId="+roomId);
}


function inviteUser(userId, roomId) {
  console.log("inviteUser() userId=" + userId + " roomId= " + roomId);
  firechat.inviteUser(userId, roomId);
}


function enterPromiseChat(promiseId,uid) {
  console.log("enterPromiseChat() promiseId= " + promiseId);
  // pass in a callback
  getRoomId( Chat.promiseId,uid, enterChatRoom);
}

function enterChatRoom(roomId) {
  console.log("enterChatRoom() ROOM ID CALLBACK id=" + roomId);
  firechat.enterRoom(roomId);
}

function enterRoomCallback() {
  console.log("enterRoomCallback...");
}


function sendMessage (roomId, text) {
  console.log("sendMessage() text="+text + " roomId=" + roomId);

  logEventListeners();
  firechat.sendMessage(roomId, text, 'default', messageSentCallback);
}

function messageSentCallback() {
    console.log("messageSent callback");
}

function openMyChats(authData) {

  console.log("INIT CHATS !!! .........");

  firechat.setUser(authData.uid, authData.facebook.displayName, function(user) {
    console.log("setUser() callback : USER....", user);
    //console.log(user);
  });

}

function closeMyChats() {
  cancelEventListener("message-add");
  cancelEventListener("room-invite");
  logEventListeners();
}


function getRoomName(promiseId) {
  roomName = "Promise-" + promiseId;

  console.log("room name=" + roomName);
  return roomName;
}

function getRoomId(promiseId,  uid, callback) {
  console.log("getRoomId promiseId=" + promiseId);


  usersRoomsUrl = firebaseUrl + "/users/" + uid + "/rooms";
  console.log("roomsRef=" + usersRoomsUrl);

  roomName = getRoomName(promiseId);

  ref = new Firebase(usersRoomsUrl);
  ref.once("value", function(snapshot) {
      console.log("got value?");
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        console.log(key + " : ");
        console.log("  Roomd Id:" + childData.id);
        console.log("  Room Name:" + childData.name);

        if ( roomName == childData.name) {
          console.log("==> ROOM FOUND !!!!  " + childData.name);
          callback( childData.id); //roomId
        }
      });
  })
}

// CALLBACKS


function roomInviteReceivedCallback(invite) {
  console.log("roomInviteReceived invite:");
  console.log(invite);
  $timeout(function() {
    Chat.invitations.push(invite);
  }, 300);
}
