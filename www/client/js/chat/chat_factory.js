
angular.module('starter').factory('ChatFactory',  ChatFactory);

var initChat=false;
var rooms = {};

// hardcoded - temp only.  Meteor should store the Room keys
rooms['Promise-1'] = '-KCnAvchlvXeSa369X7A';
rooms['Promise-2'] = '-KChc4XW1mqQmZkhxp_8';
rooms['Promise-3'] = '-KChc9phm0NpDt82_2gV';

function ChatFactory() {

  _options = {};
  _options.numMaxMessages = 50;  // get one new message at a time

  fbRef =  new Firebase(firebaseUrl);
  firechat = new Firechat(fbRef, _options);

	return {
      setup: setup,
      getPromiseRoomId: getPromiseRoomId,
      setupNewMessageListener: setupNewMessageListener,
      setupRoomInviteListener: setupRoomInviteListener,
      eventListener: eventListener,
      cancelEventListener: cancelEventListener,
      logEventListeners: logEventListeners,
      createPrivateRoom : createPrivateRoom,
      leavePromiseChat : leavePromiseChat,
      inviteUserToChat : inviteUserToChat,
      acceptInviteToChat : acceptInviteToChat,
      declineInviteToChat: declineInviteToChat,
      getRoomInvites: getRoomInvites,
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
  // CHECK THAT USER IS AUTHEN !!

  roomName = getRoomName(promiseId);
  console.log("PromiseId=" + promiseId + " room name = " + roomName);
  firechat.createRoom(roomName, "private", createPrivateRoomCallback);
  logEventListeners();
}

function createPrivateRoomCallback(roomId) {
  console.log("Room created roomId="+roomId);
}


function inviteUserToChat(userId, promiseId) {
  console.log("inviteUserToChat() userId=" + userId + " promiseId= " + promiseId);
  roomId = getPromiseRoomId(promiseId);
  firechat.inviteUser(userId, roomId);
}



function leavePromiseChat(promiseId) {
  console.log("leavePromiseChat() promiseId= " + promiseId);
  // pass in a callback

  roomId = getPromiseRoomId(promiseId);
  firechat.leaveRoom(roomId);
}


function enterRoomCallback() {
  console.log("----> enterRoomCallback...");
}


function sendMessage (roomId, text) {
  console.log("sendMessage()  roomId=" + roomId + " text="+text);

  firechat.sendMessage( roomId, text, 'default', messageSentCallback);
}

function messageSentCallback(e) {
    console.log("MessageSent callback e=", e);
}

function setup(authData, promiseId) {
    console.log("INIT CHATS !!! setup="+authData.uid);

    // enter the room after setUser
    firechat.setUser(authData.uid, authData.facebook.displayName, function(user) {
      console.log("setUser() callback : USER....", user);
      roomId = getPromiseRoomId(promiseId);
      firechat.enterRoom(roomId);
    });


  //  eventListener("room-invite", roomInviteReceivedCallback);
}

function setupNewMessageListener(newMessageReceivedCallback) {
  console.log("setupNewMessageListener()");
  eventListener("message-add", newMessageReceivedCallback);
}


function setupRoomInviteListener(roomInviteCallback, roomInviteResponseCallback) {
  console.log("setupRoomInviteListener()");
  eventListener("room-invite", roomInviteCallback);
  eventListener("room-invite-response", roomInviteResponseCallback);  // Strange! CB yourself only !! not the person who invited you.

}

function acceptInviteToChat(invite, cb) {
  console.log("acceptInviteToChat", invite);
  firechat.acceptInvite(invite.id, cb);
}


function declineInviteToChat(invite, cb) {
  console.log("rejectInviteToChat", invite);
  firechat.declineInvite(invite.id, cb);
}

function declineInviteCallback(c) {
  console.log("DECLINED ...c: ", c);
}


 function getPromiseRoomId(promiseId) {
   roomName = getRoomName(promiseId);

   roomId = rooms[roomName];

   console.log("got Room Id = " + roomId);
   return roomId;
 }

function getRoomName(promiseId) {
  roomName = "Promise-" + promiseId;

  console.log("room name=" + roomName);
  return roomName;
}

function getRoomInvites(cb) {
//https://dannybchat.firebaseio.com/users/facebook%3A141031766284923/invites

  uid = fbRef.getAuth().uid;

  console.log("---Get ALL Invites --- uid=" + uid);
  var url="https://dannybchat.firebaseio.com/users/" + uid + "/invites";
  var ref =  new Firebase(url);
/*
  ref.on("child_added", function(snapshot) {
       console.log('INVITE = ', snapshot.val());
       cb(snapshot.val());
  });
*/

ref.once("value", function(snapshot) {
    var tmp = [];
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key();
      var childData = childSnapshot.val();
      console.log("data = ", childData);
      tmp.push(childData);
      //console.log(key + " : ");
      //console.log("  status:" + childData.status);
      //console.log("  updatedDate:" + childData.updatedDate);
    });
    console.log("after.......... ")
    cb(tmp);
});

}

// CALLBACKS

// it could happen that we are logged into Firebase, but not into Firechat (via setUser() )
function firechatAuthRequiredCallback() {
  m = "============ LOST connection to firechat. Please re-login======";
  console.log(m);
  alert(m);
}
