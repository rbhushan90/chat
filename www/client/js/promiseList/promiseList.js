angular.module('starter').directive('pxPromiseList', function () {
  console.log("promise list directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/promiseList/promiseList.html';
    },
    controllerAs: 'PromiseList',
    controller: PromiseList
  }
});


function PromiseList($scope, $rootScope, $state, $ionicHistory, $ionicModal, $ionicPopup, $ionicListDelegate) {
  var list = [
    {
      id : 1,
      title : "I promise to raise funds for Shelter UK",
      dueDate : "2 March 2016",
      area : "Health",
      status : "Enshrined",
      value : "Routine"
    },
    {
      id : 2,
      title : "I will go to the Gym twice a week",
      dueDate : "11 March 2016",
      area : "Health",
      status : "Pending",
      value : "Good Stuff"
    },
    {
      id : 3,
      title : "I promise to practice Tennis for an hour a day to prepare for my next Competition",
      dueDate : "4 April 2016",
      area : "Family",
      status : "Pending Acknowledgement",
      value : "Good Stuff"
    },
    {
      id : 4,
      title : "I must send Cinnamon for Dog Circus Training",
      dueDate : "4 April 2016",
      area : "Family",
      status : "Acknowledged",
      value : "Ermm"
    },
    {
      id : 5,
      title : "I will complete my 1000-piece Jigsaw Puzzle",
      dueDate : "1 March 2016",
      area : "Routine",
      status : "Overdue",
      value : "Ermm"
    }
  ];

  PromiseList = this;
  PromiseList.list = list;

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      $ionicHistory.clearHistory();
      console.log("ionic view enter...PROMISE");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');
      console.log("back=", $ionicHistory.backView() );

  });

  // A confirm dialog
 PromiseList.revoke = function(item) {
  $ionicListDelegate.closeOptionButtons();

   var confirmPopup = $ionicPopup.confirm({
     title: 'Revoke Promise',
     template: 'Are you sure you want to delete this Promise?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('ok - revoke this promise : ', item.id);
     } else {
       console.log('cancel - do not revoke promise');
     }
   });
 };

 PromiseList.openShare = function (item) {
   $ionicListDelegate.closeOptionButtons();

   modal = "<px-tag-modal action='share' promise-id='" + item.id + "'></px-tag-modal>";
   $rootScope.modal = $ionicModal.fromTemplate(modal);
   $rootScope.modal.show();
 };

 PromiseList.openRequest = function (item) {
   $ionicListDelegate.closeOptionButtons();

   modal = "<px-tag-modal action='request' promise-id='" + item.id + "'></px-tag-modal>";
   $rootScope.modal = $ionicModal.fromTemplate(modal);
   $rootScope.modal.show();
 };

 PromiseList.openDone = function (item) {
    $ionicListDelegate.closeOptionButtons();

   modal = "<px-promise-done-modal promise-id='" + item.id + "'></px-promise-done-modal>";
   $rootScope.modal = $ionicModal.fromTemplate(modal);
   $rootScope.modal.show();
 };

 PromiseList.notDone = function (item) {
    $ionicListDelegate.closeOptionButtons();

   modal = "<px-promise-not-done-modal promise-id='" + item.id + "'></px-promise-not-done-modal>";
   $rootScope.modal = $ionicModal.fromTemplate(modal);
   $rootScope.modal.show();
 };

 PromiseList.openChat = function (item) {
   $ionicListDelegate.closeOptionButtons();
    console.log("open chat promiseId=" + Promise.promiseId);

   //  $state.go('tab.chat', {'promiseId':Promise.promiseId});
   $state.go('chat', {'promiseId':item.id});
 };

 PromiseList.complete = function(item) {
  $ionicListDelegate.closeOptionButtons();

   var confirmPopup = $ionicPopup.confirm({
     title: 'Complete Promise',
     template: 'Mark this Promise as Completed'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('ok - complete this promise : ', item.id);
     } else {
       console.log('cancel - do not complete promise');
     }
   });
 };
}
