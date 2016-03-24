// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
[
'ionic',
'firebase',
'ngAnimate',
'ionic.contrib.ui.tinderCards2',
'chart.js',
'ui.scroll',
'ui.scroll.jqlite'
])

.run(function($ionicPlatform, $rootScope, $state, FirebaseAuth) {


  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    console.log("toState = ", toState);
    if (toState.authenticate && !FirebaseAuth.isAuthenticated()){
    // User isn’t authenticated
      console.log("User not logged in.... redirect to login page");
      $state.transitionTo("login");
      event.preventDefault();
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})


/*
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
*/
angular.element(document).ready(onReady);

function onReady() {
  angular.bootstrap(document, ['starter']);
}
