
angular.module('starter').factory('ChatFactory',  ChatFactory);

function ChatFactory($firebaseArray) {
  fbRef =  new Firebase(firebaseUrl);
  firechat = new Firechat(fbRef);
  activeRoomId = null;

	return {
      createPrivateRoom : createPrivateRoom,
      getRoomId : getRoomId
      inviteUser : inviteUser,
      enterRoom : enterRoom,
      leaveRoom : leaveRoom,
      sendMessage : sendMessage,
      eventListener: eventListener,
      cancelEventListener: cancelEventListener,
      resumeChatSession: resumeChatSession,
      setActiveRoom: setActiveRoom, // the user can only be in one room at a time(accessed via Promise)
      getActiveRoom : getActiveRoom
	};
}

// Be careful, function names can clash in the GLOBAL space.
// eg. addEventListener() is a Firechat function.
// How to create functions under a namespace ?

function eventListener(eventName, cb) {
  console.log("add event listener e=" + eventName);
  firechat.on(eventName, cb);

  console.log("events:");
  console.log(firechat._events);
}

function cancelEventListener(eventName) {
  console.log("cancelEventListener  e=" + eventName);
  delete firechat._events[eventName];

  console.log("events:");
  console.log(firechat._events);
}

function createPrivateRoom(promiseId) {
  roomName = "Promise-" + promiseId;
  console.log("PromiseId=" + promiseId + " room name = " + roomName);
  firechat.createRoom(roomName, "public", createPrivateRoomCallback);
}

function createPrivateRoomCallback(roomId) {
  setActiveRoom(roomId);
}


function inviteUser(userId, roomId) {
  console.log("inviteUser() userId=" + userId + " roomId= " + roomId);
  firechat.inviteUser(userId, roomId);
}


function enterRoom(roomId) {
  console.log("enterRoom() roomId= " + roomId);
  firechat.enterRoom(roomId);
}

function leaveRoom(roomId) {
  console.log("leaveRoom() roomId= " + roomId);
  firechat.leaveRoom(roomId);
}

function sendMessage (roomId, text) {
  console.log("sendMessage() text="+text + " roomId=" + roomId);

  firechat.sendMessage(roomId, text, 'default', messageSentCallback);
}

function messageSentCallback() {
    console.log("messageSent callback");
}

function resumeChatSession(authData) {
  console.log("resume Chat Session");

  firechat.setUser(authData.uid, authData.facebook.displayName, function(user) {
    firechat.resumeSession();
  });
}

function  setActiveRoom(roomId) {
  console.log("setActiveRoom() = " + roomId);
  activeRoomId = roomId;
}

function getActiveRoom() {
  console.log("getActiveRoom() = " + activeRoomId);
  return activeRoomId;
}

function getRoomId(promiseId) {

}
