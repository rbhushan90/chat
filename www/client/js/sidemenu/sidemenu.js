angular.module('starter').directive('pxSideMenu', function () {
  //console.log("sidemenu directive");
  return {
      restrict: 'E',
      templateUrl: function() {
          return 'client/js/sidemenu/sidemenu.html';
      },
      controllerAs: 'SideMenu',
      controller: SideMenu,
      scope: {
        data: '='
      },
      bindToController : true
    }
});


function SideMenu ($scope, $rootScope, $state, $ionicModal, $ionicSideMenuDelegate, $timeout) {

  SideMenu = this;
  SideMenu.isSideMenuEnabled=true;

  SideMenu.data = {
    menuItems: [
      {"id":"0", "label": "Login", "type":"state", "dest":"login"},
      {"id":"1", "label":"Areas", "type":"modal", "dest":"<px-areas-modal></px-areas-modal>"},
      {"id":"2", "label":"Completed Promises", "type":"state", "dest":"tab.promiselist"},
      {"id":"3", "label":"Send Invites", "type":"modal", "dest":"<px-contacts-modal></px-contacts-modal>"},
      {"id":"4", "label":"Walkthrough",  "type":"modal", "dest":"<px-showcase-modal></px-showcase-modal>"},
      {"id":"5", "label":"Contact Us","type":"modal", "dest":"<px-contactus-modal></px-contactus-modal>"}
    ]
  };

  $rootScope.$on('rootScope:broadcast:sideMenu', function (event, menuName) {
     console.log("New Submenu required =" + menuName); // 'Broadcast!'
     if ( menuName=='loggedIn') {
       SideMenu.data.menuItems[0] =   {"id":"0", "label": "Logout", "type":"state", "dest":"login"};
       return;
     }
     if ( menuName=='loggedOut') {
       SideMenu.data.menuItems[0] =   {"id":"0", "label": "Login", "type":"state", "dest":"login"};
       return;
     }
  });

  // dest may be a directive or a 'state'
  SideMenu.openModal = function (item) {
    if ( item.type =="modal" ) {
      console.log("open modal : " + item.dest);
      $rootScope.modal = $ionicModal.fromTemplate(item.dest);
      $rootScope.modal.show();
    } else {
      console.log("$state.go = ", item.dest);
      $state.go(item.dest);
    }
  };

  // modal directives end with 'modal'. eg <px-area-modal></px-area-modal>
  function isModal(dest) {
    if (dest.indexOf("modal")) {
      return true;
    } else {
      return false;
    }  }

  function closeSideMenu() {
       $ionicSideMenuDelegate.$getByHandle("sidemenuHandle").toggleLeft(false);
  }

}
