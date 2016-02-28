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


var menuGroups = {};
menuGroups['promiseMenu'] = getPromiseMenu();
menuGroups['profileMenu'] = getProfileMenu();
menuGroups['contactsMenu'] = getContactsMenu();

function SideMenu ($scope, $rootScope, $ionicModal, $ionicSideMenuDelegate, $timeout) {

  this.isSideMenuEnabled=true;

  this.data = {
    menuItems: [
      {"id":"0", "label":"Login", "modal":"<px-login-modal></px-login-modal>"},
      {"id":"1", "label":" Contacts", "modal":"<px-contacts-modal></px-contacts-modal>"},
      {"id":"2", "label":"Areas", "modal":"<px-areas-modal></px-areas-modal>"}
    ]
  };

  vm = this;
  $rootScope.$on('rootScope:broadcast:sideMenu', function (event, menuName) {
     console.log("New Submenu required =" + menuName); // 'Broadcast!'

     /*
     console.log(menuGroups[menuName]);

     // using 'vm' instead of 'this' (later wont work)
     vm.data = {
       menuItems: menuGroups[menuName]
     };
     */

  });


  this.openModal = function (modal) {
    console.log("open modal : " + modal);
    $rootScope.modal = $ionicModal.fromTemplate(modal);
    $rootScope.modal.show();
  };

  function closeSideMenu() {
       $ionicSideMenuDelegate.$getByHandle("sidemenuHandle").toggleLeft(false);
  }

}


//--------- Menu Links ----------

function getPromiseMenu() {
  return  [
      {"id":0, "label":"Promise Menu Item!!", "url":"#/login"},
      {"id":1, "label":"Hoot Hoot", "url":"#/promiselist"},
      {"id":4, "label":"Contacts", "url":"#/tab/contacts"}
    ];
}

function getProfileMenu() {
  return [
      {"id":0, "label":"Profile", "url":"#/tab/profile"},
      {"id":1, "label":"Showcase", "url":"#/tab/showcase"},
      {"id":1, "label":"Sync Contacts", "url":"#/tab/contacts"}
    ];
}

function getContactsMenu() {
  return [
      {"id":0, "label":"...back to Profile", "url":"#/tab/profile"},
      {"id":2, "label":"Send Invites", "url":"#/tab/contacts"},
      {"id":1, "label":"Hoot Hoot", "url":"#/promiselist"},
    ];
}
