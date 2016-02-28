
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

var loginCounter=0;

// login with Firebase via Auth
function Login ($scope, $rootScope,$ionicModal, $timeout, FirebaseAuth, ChatFactory) {
  console.log("login controller");



  Login = this;

  Login.hideModal = function () {
        $rootScope.modal.hide();
  };


  Login.login = function() {
    loginCounter=0;
    console.log("login() loginCounter=" + loginCounter);

  //  FirebaseAuth.getAuth().onAuth(onAuthCallback);

    // authorise with "facebook"
    FirebaseAuth.getAuth().authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        Login.authData = authData;
        ChatFactory.setup(authData);
      }
    },
      {  scope: "email,user_likes,user_location,user_friends" }
    );
  };

  Login.logout = function() {
    console.log("logout....");
    ChatFactory.teardown();

    // to do : Need function() to clear out all SESSIONS on logout() !!
    // the rows in /users/{userId}/sessions is never deleted and  keeps  growing
    // Or, just don't keep SESSIONS info !
    // see: https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html

    FirebaseAuth.getAuth().unauth();
  }


  function handleError(err) {
    $log.error('login failed ', err);
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Error:' + err,
      okType: 'button-positive button-clear'
    });
  }
}
