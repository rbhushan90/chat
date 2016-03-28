angular.module('starter').directive('pxWatchList', function () {
  console.log("watch list directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/watchList/watchList.html';
    },
    controllerAs: 'WatchList',
    controller: WatchList
  }
});


function WatchList($scope, $rootScope, $ionicHistory,  $ionicListDelegate, $ionicPopup, $ionicModal) {

  var list = [
    {
      id : 1,
      title : "I will lose 10Kgs",
      dueDate : "2 March 2016",
      area : "Health",
      status : "Pending",
      value : "Routine",
      type: 'request',
      name: 'Adam Jones',
      image: 'img/adam.jpg'
    },
    {
      id : 2,
      title : "I will alter Michael's Jacket",
      dueDate : "11 March 2016",
      area : "Family",
      status : "Enshrined",
      value : "Good Stuff",
      type: 'request',
      name: 'Ben Smith',
      image: 'img/ben.png'
    },
    {
      id : 3,
      title : "I will run the London Marathon",
      dueDate : "4 April 2016",
      area : "Health",
      status : "Pending Acknowledgement",
      value : "Good Stuff",
      type: 'request',
      name: 'Max McMillian',
      image: 'img/max.png'
    },
    {
      id : 4,
      title : "I will pass my Exams",
      dueDate : "20 June 2016",
      area : "Career",
      status : "Pending",
      value : "Good Stuff",
      type: 'request',
      name: 'Mike Sanders',
      image: 'img/mike.png'
    }
  ];

  WatchList = this;
  WatchList.list = list;

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      $ionicHistory.clearHistory();
  });

  // A confirm dialog
 WatchList.ackComplete = function(item,$event) {
  $ionicListDelegate.closeOptionButtons();
  stopFurtherClicks($event);

   var confirmPopup = $ionicPopup.confirm({
     title: 'Acknowledge Complete',
     template: 'Do you want to proceed ?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('ok - Ack this promise : ', item.id);
     } else {
       console.log('cancel - do not ack promise');
     }
   });
 };


   WatchList.openTinder = function (item) {
     console.log("type=", item.type);
     $rootScope.tinderItem = item;

     modal = "<px-tinder-modal promise-id='" + Promise.promiseId + "'></px-tinder-modal>";
     $rootScope.modal = $ionicModal.fromTemplate(modal);
     $rootScope.modal.show();

   };

   WatchList.chat = function(item, $event) {
    stopFurtherClicks($event);

     var alertPopup = $ionicPopup.alert({
       title: 'Coming Soon',
       template: 'Work in Progress'
     });

     alertPopup.then(function(res) {
       console.log('popup shown');
     });
 }
}
