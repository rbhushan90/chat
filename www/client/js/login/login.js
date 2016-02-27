angular.module('starter').directive('pxLogin', function () {
  console.log("login directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/login/login.html';
    },
    controllerAs: 'Login',
    controller: Login
  }
});
// open in Modal mode
angular.module('starter').directive('pxLoginModal', function () {
  console.log("loginModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/login/loginModal.html';
    },
    controllerAs: 'Login',
    controller: Login
  }
});



// login with Firebase via Auth
function Login ($scope, $rootScope,$ionicModal, $timeout, Auth, ChatFactory) {
  console.log("login controller");

  Login = this;

  Login.hideModal = function () {
        $rootScope.modal.hide();
  };


  Login.login = function() {
    console.log("login()");

    // authorise with "facebook"
    Auth.$authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    },
      {  scope: "email,user_likes,user_location,user_friends" }
    );
  };

  Login.logout = function() {
    console.log("logout");
    Auth.$unauth();
  }


  // event
  Auth.$onAuth(function(authData) {
    console.log("onAuth()");
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log(authData);
      console.log("uid: " + authData.uid + " name : " + authData.facebook.displayName);

      ChatFactory.resumeChatSession(authData);
    }

    Login.authData = authData; // This will display the user's name in our view
  });



  function handleError(err) {
    $log.error('login failed ', err);
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Error:' + err,
      okType: 'button-positive button-clear'
    });
  }
}
