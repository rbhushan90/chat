angular.module('starter').directive('pxPromise', function () {
  console.log("promise directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/promise/promise.html';
    },
    controllerAs: 'Promise',
    controller: Promise
  }
});


function Promise($scope, $rootScope, $state, $stateParams, $ionicPopup, $ionicModal, $ionicHistory, $ionicActionSheet, ChatFactory) {
  //console.log("promise controller");

  Promise = this;


  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    //console.log("ionic view enter...PROMISE");

    Promise.promiseId = $stateParams.promiseId;

    //broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');

    //console.log("promise id = " + Promise.promiseId);
  });

  Promise.logEventListener = function() {
    ChatFactory.logEventListeners();
  }


  Promise.openChat = function () {
      console.log("open chat promiseId=" + Promise.promiseId);

    //  $state.go('tab.chat', {'promiseId':Promise.promiseId});
    $state.go('chat', {'promiseId':Promise.promiseId});
  };


  Promise.openDone = function () {
    modal = "<px-promise-done-modal promise-id='" + Promise.promiseId + "'></px-promise-done-modal>";
    $rootScope.modal = $ionicModal.fromTemplate(modal);
    $rootScope.modal.show();
  };

  Promise.openCounter = function () {
    modal = "<px-promise-counter-modal promise-id='" + Promise.promiseId + "'></px-promise-counter-modal>";
    $rootScope.modal = $ionicModal.fromTemplate(modal);
    $rootScope.modal.show();
  };


  // A confirm dialog
  Promise.showConfirm = function() {

   var confirmPopup = $ionicPopup.confirm({
     title: 'Revoke Promise',
     template: 'Are you sure you want to delete this Promise?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('ok - revoke this promise : ', Promise.promiseId);
     } else {
       console.log('cancel - do not revoke promise');
     }
   });
  };

  Promise.showActions = function() {
    console.log("promiseActionSheet$ionicActionSheet");
    // Show the action sheet

    var hideSheet = $ionicActionSheet.show({
      titleText: '<font color="red">Note : options will depend on status of Promise.</font>List to be confirmed. Dont take this example literally',
      buttons: [
        { text: 'Chat' },
        { text: 'Edit/Save' },
        { text: 'Counter Offer' },
        { text: 'Done' },
        { text: 'Declare Complete' }
      ],
      destructiveText: '<i class="icon ion-ios-trash"></i>Revoke',

      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },

      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        console.log("revoke was selected");
        Promise.showConfirm();
        return true;
      },

      buttonClicked: function(index) {
        console.log("button clicked index=" + index);
        console.log("Text = " + this.buttons[index].text);

        switch (index) {
          case 0 : Promise.openChat();break;
          case 1 : save();break;
          case 2 : Promise.openCounter();break;
          case 3 : Promise.openDone();break;
          default : misc(index);break;
        }
        return true;
      }
    });
  }

  function save() {
    console.log("save..");
  }

}
