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


function Promise($scope, $rootScope, $state, $stateParams, $ionicModal, $ionicHistory, $ionicActionSheet, ChatFactory) {
  //console.log("promise controller");

  Promise = this;


  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    console.log("ionic view enter...PROMISE");
    console.log("back=", $ionicHistory.backView() );

    Promise.promiseId = $stateParams.promiseId;

    //broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');

    //console.log("promise id = " + Promise.promiseId);
  });

  this.logEventListener = function() {
    ChatFactory.logEventListeners();
  }

  this.showActions = function() {
    showPromiseActionSheet($rootScope, $ionicActionSheet);
  }

  this.backToList = function() {
    $state.go("tab.promiselist");
  }

  this.openChatModal = function () {
      console.log("open chat modal promiseId=" + Promise.promiseId);

      $state.go('tab.chat', {'promiseId':Promise.promiseId});
  };

  this.openShareModal = function () {
    console.log("open modal");

    modal = "<px-share-modal promise-id='" + Promise.promiseId + "'></px-share-modal>";
    $rootScope.modal = $ionicModal.fromTemplate(modal);
    $rootScope.modal.show();
  };

  this.openInvitesModal = function () {
      console.log("open invites modal");

      modal = "<px-invites-modal></px-invites-modal>";
      $rootScope.modal = $ionicModal.fromTemplate(modal, {"modalId":"INVITES"});
      $rootScope.modal.show();
  };


}
