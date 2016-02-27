var firebaseUrl = "https://dannybchat.firebaseio.com";

angular.module('starter').factory("Auth", Auth);

function Auth($firebaseAuth) {
  var usersRef = new Firebase(firebaseUrl);
  return $firebaseAuth(usersRef);
}
