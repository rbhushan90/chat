angular.module('starter').directive('pxLayout', function () {
  //console.log("layout directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/layout/layout.html';
    },
    controllerAs: 'Layout',
    controller: Layout
  }
});

count=0;
function Layout($scope, $rootScope, $state, $ionicHistory, $ionicModal, FirebaseAuth) {

  Layout = this;

  Layout.goBack = function() {
     $ionicHistory.goBack();
  }

  Layout.show = function() {
    //console.log("back=", $ionicHistory.backView() );
    if ( $ionicHistory.backView() != null && Layout.isLoggedIn() ) {
      //console.log("has back");
      return true;
    }
    return false;
  }


  Layout.createPromise = function () {
    console.log("in Layout.js  - create promise");
      modal = "<px-promise-create-modal></px-promise-create-modal>";
      $rootScope.modal = $ionicModal.fromTemplate(modal);
      $rootScope.modal.show();
  };

  Layout.contacts = function () {
      //$state.go('tab.contacts');
      $rootScope.modal = $ionicModal.fromTemplate("<px-contacts-modal></px-contacts-modal>");
      $rootScope.modal.show();
  };

  Layout.isLoggedIn =function() {
    return FirebaseAuth.isAuthenticated();
  }
};
