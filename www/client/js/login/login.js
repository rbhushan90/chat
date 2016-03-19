
// open in Modal mode
angular.module('starter').directive('pxLogin', function () {
  console.log("loginModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/login/login.html';
    },
    controllerAs: 'Login',
    controller: Login
  }
});


// login with Firebase via Auth
function Login ($scope, $rootScope, $state, $timeout, FirebaseAuth) {
  console.log("login controller");

  Login = this;

  Login.loginFacebook = function() {
    loginCounter=0;
    console.log("loginFacebook() loginCounter=" + loginCounter);

  //  FirebaseAuth.getAuth().onAuth(onAuthCallback);

    // authorise with "facebook"
    FirebaseAuth.getAuth().authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'loggedIn');
        Login.authData = authData;
        $timeout(function() {
            Login.userName = Login.authData.facebook.displayName;
        },50);
        $state.go('tab.promiselist');
      }
    },
      {  scope: "email,user_likes,user_location,user_friends" }
    );
  };

  Login.loginEmail = function() {
    console.log("login with Email");
  };

  Login.logout = function() {
    console.log("logout....");

    // to do : Need function() to clear out all SESSIONS on logout() !!
    // the rows in /users/{userId}/sessions is never deleted and  keeps  growing
    // Or, just don't keep SESSIONS info !
    // see: https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html

    FirebaseAuth.getAuth().unauth();
    broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'loggedOut');
    $timeout(function() {
      Login.userName = "";
    },100);
  }

  Login.register =function() {
    console.log("Register...");
  }

  Login.isLoggedIn =function() {
    return FirebaseAuth.isAuthenticated();
  }

  Login.isGuest = function() {
    return !FirebaseAuth.isAuthenticated();
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
