angular.module('starter').directive('pxTinderModal', function () {
  console.log("tinder directive");
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      promiseId: "@"
    },
    templateUrl: function() {
        return 'client/js/tinder/tinderModal.html';
    },
    controllerAs: 'Tinder',
    controller: Tinder
  }
});


function Tinder($scope, $rootScope, $state, TDCardDelegate, $timeout, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, $ionicHistory, $ionicActionSheet) {

    Tinder = this;

    console.log("Tinder, current Promise = ", Tinder.promiseId);

    Tinder.status = $rootScope.tinderItem.status;
    Tinder.type = $rootScope.tinderItem.type;

    var cardTypes = [
        {
  			  name: $rootScope.tinderItem.name,
  			  image: $rootScope.tinderItem.image,
          title : $rootScope.tinderItem.title,
          dueDate : $rootScope.tinderItem.dueDate,
          area : $rootScope.tinderItem.area,
          status : $rootScope.tinderItem.status,
          type : $rootScope.tinderItem.type,
          value : $rootScope.tinderItem.value,
  			}
    ];

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
         $ionicHistory.clearHistory();
    });


      Tinder.cards = {
        master: Array.prototype.slice.call(cardTypes, 0),
        active: Array.prototype.slice.call(cardTypes, 0),
        discards: [],
        liked: [],
        disliked: []
      }

      Tinder.cardDestroyed = function(index) {
        Tinder.cards.active.splice(index, 1);
      };


      Tinder.addCard = function() {
        var newCard = cardTypes[0];
        Tinder.cards.active.push(angular.extend({}, newCard));
      }

      Tinder.refreshCards = function() {
        console.log("refresh cards");
        // Set $scope.cards to null so that directive reloads
        Tinder.cards.active = null;

        Tinder.cards.discards = [];
        Tinder.cards.liked = [];
        Tinder.cards.disliked = [];

        $timeout(function() {
          Tinder.cards.active = Array.prototype.slice.call(Tinder.cards.master, 0);
        });
      }

      $scope.$on('removeCard', function(event, element, card) {
        var discarded = Tinder.cards.master.splice(Tinder.cards.master.indexOf(card), 1);
        Tinder.cards.discards.push(discarded);
      });

      Tinder.cardSwipedLeft = function(index) {
        console.log('LEFT SWIPE');
        Tinder.hideModal();
        var card = Tinder.cards.active[index];
        Tinder.cards.disliked.push(card);
      };

      Tinder.cardSwipedRight = function(index) {
        console.log('RIGHT SWIPE');
        Tinder.hideModal();
        var card = Tinder.cards.active[index];
        Tinder.cards.liked.push(card);
      };


      Tinder.hideModal = function()  {
        $rootScope.modal.hide();
      }
      Tinder.counter = function(id)  {
        console.log("counter offer id=", id);
        Tinder.hideModal();
      }


      Tinder.showActions = function() {

        // Show the action sheet

        var hideSheet = $ionicActionSheet.show({
          titleText: '<font color="red">Note : options will depend on status of Promise.</font>Dont take this example literally.List to be confirmed',
          buttons: [
            { text: 'Chat' },
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
            Tinder.revoke();
            return true;
          },

          buttonClicked: function(index) {
            console.log("button clicked index=" + index);
            console.log("Text = " + this.buttons[index].text);

            switch (index) {
              case 0 : Tinder.openChat();break;
              case 1 : Tinder.openDone();break;
              case 2 : Tinder.complete();break;
              default : misc(index);break;
            }
            return true;
          }
        });
      }

      Tinder.openChat = function () {
/*
        console.log("open chat promiseId=" + Tinder.promiseId);
        Tinder.hideModal();
        //  $state.go('tab.chat', {'promiseId':Promise.promiseId});
        $state.go('chat', {'promiseId':Tinder.promiseId});
*/
        var alertPopup = $ionicPopup.alert({
          title: 'Coming Soon',
          template: 'Work in Progress'
        });

        alertPopup.then(function(res) {
          console.log('popup shown');
        });
      };


      Tinder.openDone = function () {
        pushModal($rootScope.modal);  // push the current Modal into Stack

        modal = "<px-promise-done-modal promise-id='" + Promise.promiseId + "'></px-promise-done-modal>";
        $rootScope.modal = $ionicModal.fromTemplate(modal);
        $rootScope.modal.show();
      };


      Tinder.revoke = function(item) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Revoke Promise',
          template: 'Are you sure you want to delete this Promise?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('ok - revoke this promise : ');
          } else {
            console.log('cancel - do not revoke promise');
          }
        });
      };

      Tinder.complete = function(item) {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Complete Promise',
          template: 'Mark this Promise as Completed'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('ok - complete this promise');
          } else {
            console.log('cancel - do not complete promise');
          }
        });
      };
}
