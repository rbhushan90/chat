
angular.module('starter').factory('ChatFactory',  ChatFactory);

var initChat=false;
var rooms = {};

rooms['Promise-1'] = '-KBbpgmqu-CLC98vkD1I';
rooms['Promise-2'] = '-KBbpolqKgHGlMFf94GS';
rooms['Promise-3'] = '-KBbpv5jy0yOgswedsXS';

function ChatFactory() {
  fbRef =  new Firebase(firebaseUrl);
  firechat = new Firechat(fbRef);

	return {
      setup: setup,
      teardown: teardown,
      getPromiseRoomId: getPromiseRoomId,
      setupNewMessageListener: setupNewMessageListener,
      enterPromiseChat:enterPromiseChat,

      eventListener: eventListener,
      cancelEventListener: cancelEventListener,
      logEventListeners: logEventListeners,
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


function enterPromiseChat(promiseId) {
  console.log("enterPromiseChat() promiseId= " + promiseId);
  // pass in a callback

  roomId = getPromiseRoomId(promiseId);
  firechat.enterRoom(roomId);
}

function enterRoomCallback() {
  console.log("enterRoomCallback...");
}


function sendMessage (roomId, text) {
  console.log("sendMessage()  roomId=" + roomId + " text="+text);

  firechat.sendMessage( roomId, text, 'default', messageSentCallback);
}

function messageSentCallback(e) {
    console.log("MessageSent callback e=", e);
}

function setup(authData) {

    console.log("INIT CHATS !!! should be done ONCE only uid="+authData.uid);

    firechat.setUser(authData.uid, authData.facebook.displayName, function(user) {
      console.log("setUser() callback : USER....", user);
    });

  //  eventListener("auth-required", firechatAuthRequiredCallback);
  //  eventListener("message-add", newMessageReceivedCallback);
  //  eventListener("room-invite", roomInviteReceivedCallback);

}

function setupNewMessageListener(newMessageReceivedCallback) {
  console.log("setupNewMessageListener()");
  eventListener("message-add", newMessageReceivedCallback);
}

function teardown() {
  initChat=false;
  cancelEventListener("message-add");
  cancelEventListener("room-invite");
  logEventListeners();
}

/* CRAP !
function getRoomId(promiseId,  uid, callback) {
  console.log("getRoomId promiseId=" + promiseId);


  usersRoomsUrl = firebaseUrl + "/users/" + uid + "/rooms";
  console.log("url= ", usersRoomsUrl);

  roomName = getRoomName(promiseId);

  ref = new Firebase(usersRoomsUrl);
  ref.once("value", function(snapshot) {
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
*/

 function getPromiseRoomId(promiseId) {
   roomName = getRoomName(promiseId);

   console.log("rooms = " ,rooms);

   roomId = rooms[roomName];

   console.log("got Room Id = " + roomId);
   return roomId;
 }

function getRoomName(promiseId) {
  roomName = "Promise-" + promiseId;

  console.log("room name=" + roomName);
  return roomName;
}

// CALLBACKS

// it could happen that we are logged into Firebase, but not into Firechat (via setUser() )
function firechatAuthRequiredCallback() {
  m = "============ LOST connection to firechat. Please re-login======";
  console.log(m);
  alert(m);
}

function roomInviteReceivedCallback(invite) {
  console.log("roomInviteReceived invite:");
  console.log(invite);
  $timeout(function() {
    Chat.invitations.push(invite);
  }, 300);
}
