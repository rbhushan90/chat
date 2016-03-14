// open in Modal mode
angular.module('starter').directive('pxInvitesModal', function () {
  //console.log("chatModal directive");
  return {
    restrict: 'E',
    scope: {},
    templateUrl: function() {
        return 'client/js/chat/invites/invitesModal.html';
    },
    controllerAs: 'Invites',
    controller: Invites
  }
});

initInvites=false;

function Invites($scope,$rootScope,$ionicActionSheet, $ionicModal, $stateParams, $state,
                     $timeout, $ionicScrollDelegate, ChatFactory, FirebaseAuth) {

  console.log("Invites ctrl");

  Invites = this;
  Invites.invitations =[];

  if ( FirebaseAuth.isAuthenticated() && initInvites==false) {
    console.log("init invites.....");
    // get Alerts
  //  ChatFactory.setupRoomInviteListener(roomInviteCallback, roomInviteResponseCallback);

    // get list of Invites
    //ChatFactory.getRoomInvites(newInvitesCallback);
    initInvites = true;
  }

  ChatFactory.getRoomInvites(newInvitesCallback);

  $scope.$on('modal.shown', function(event, modal) {
      console.log('Shown Modal ' + modal.modalId + ' is shown!');

      if ( FirebaseAuth.isAuthenticated() ) {
        console.log("is Authenticated, ok...");
        Invites.warn = "";
      } else {
        Invites.warn = "You are not Authenticated, please log in";
      }
  });


  function newInvitesCallback(newInvite) {
    console.log("new invites callback------", newInvite);
    $timeout(function() {
      Invites.invitations = newInvite;
    }, 300);

  }


  Invites.hideModal = function () {
        $rootScope.modal.hide();
  };


  Invites.acceptInvite = function(invite) {
    console.log("acceptInvite", invite);
    ChatFactory.acceptInviteToChat(invite, roomInviteResponseCallback);
  }

  Invites.declineInvite = function(invite) {
    console.log("declineInvite", invite);
    ChatFactory.declineInviteToChat(invite, roomInviteResponseCallback);
  }

  function roomInviteCallback(invite) {
    console.log("NEW INVITE !! roomInviteCallback : ", invite);
    $timeout(function() {
      Invites.invitations.push(invite);
    }, 300);
  }

  function roomInviteResponseCallback(resp) {
    console.log("INVITE response !! roomInviteResponseCallback : ", resp);
    if (resp != null && resp.status!= null) {
      if ( resp.status  =='accepted') {
        console.log("ACCEPTED! " + resp.fromUserName + " has accepted your invite");
      } else {
        console.log("DECLINED! " + resp.fromUserName + " has declined your invite");
        // at this point, delete the User from /room-metadata/{room}/authorizedUsers
      }
    }
  }


}
