var firebaseUrl = "https://dannybchat.firebaseio.com";

angular.module('starter').factory("FirebaseAuth", FirebaseAuth);

/*
function Auth($firebaseAuth) {
  var usersRef = new Firebase(firebaseUrl);
  return $firebaseAuth(usersRef);
}
*/

function FirebaseAuth() {
   authRef = new Firebase(firebaseUrl);

	return {
      getAuth: function() {
        return authRef;
      }
	};
}
