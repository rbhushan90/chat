var firebaseUrl = "https://dannybchat.firebaseio.com";

angular.module('starter').factory("FirebaseAuth", FirebaseAuth);


function FirebaseAuth() {
   authRef = new Firebase(firebaseUrl);

	return {
      getAuth: function() {
        return authRef;
      },

      isAuthenticated : function() {
        authData = authRef.getAuth();
        if ( authData !=null ) {
          //console.log("USER is logged in....carry on user=" + authData.uid);
          return true;
        }
        else {
          console.log("USER NOT logged in....pls login");
          return false;
        }
      }
	};
}
