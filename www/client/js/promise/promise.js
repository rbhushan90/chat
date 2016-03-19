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
    //console.log("ionic view enter...PROMISE");

    Promise.promiseId = $stateParams.promiseId;

    //broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'promiseMenu');

    //console.log("promise id = " + Promise.promiseId);
  });

  Promise.logEventListener = function() {
    ChatFactory.logEventListeners();
  }

  Promise.showActions = function() {
    showPromiseActionSheet($rootScope, $ionicActionSheet);
  }

  Promise.openChat = function () {
      console.log("open chat promiseId=" + Promise.promiseId);

    //  $state.go('tab.chat', {'promiseId':Promise.promiseId});
    $state.go('chat', {'promiseId':Promise.promiseId});
  };

  Promise.openShare = function () {
    modal = "<px-share-modal promise-id='" + Promise.promiseId + "'></px-share-modal>";
    $rootScope.modal = $ionicModal.fromTemplate(modal);
    $rootScope.modal.show();
  };

  Promise.openInvitesModal = function () {

      modal = "<px-invites-modal></px-invites-modal>";
      $rootScope.modal = $ionicModal.fromTemplate(modal, {"modalId":"INVITES"});
      $rootScope.modal.show();
  };


}
