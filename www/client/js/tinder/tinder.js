angular.module('starter').directive('pxTinder', function () {
  console.log("tinder directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/tinder/tinder.html';
    },
    controllerAs: 'Tinder',
    controller: Tinder
  }
});


function Tinder($scope, TDCardDelegate, $timeout, $ionicSideMenuDelegate) {
      Tinder = this;

      var cardTypes = [
        {
  			  name: 'Ben Smith',
  			  image: 'img/ben.png',
          description: 'Kayak around the Isle of Wight'
  			},
  			{
  			  name: 'Adam Jones',
  			  image: 'img/adam.jpg',
          //image:'https://graph.facebook.com/101996786838334/picture?type=large',
  			  description: 'Raise Money for Charity'
  			},
  			{
  			  name: 'Max McMillian',
  			  image: 'img/max.png',
  			  description: 'Take Sabbathical to spend time with Mum'
  			},
  			{
  			  name: 'Mike Sanders',
  			  image: 'img/mike.png',
  			  description: 'Start a Company'
  			}
      ];

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
        var card = Tinder.cards.active[index];
        Tinder.cards.disliked.push(card);
      };
      Tinder.cardSwipedRight = function(index) {
        console.log('RIGHT SWIPE');
        var card = Tinder.cards.active[index];
        Tinder.cards.liked.push(card);
      };

      Tinder.flip = function(card) {
       Tinder.onOff =  !$Tinder.onOff;
       if  (Tinder.onOff) {
         card.image = "img/note_paper.jpg";
         card.name="In 2 Weeks";
         card.description = "here is more information about my project. When you laugh with people, you show them that you like them, you agree with them, or that you are in same group as them";
       } else {
         card.image = "img/ben.png";
         card.name="Ben Smith";
         card.description = "Kayak around the Isle of Wight";
      }
     }


}
