angular.module('starter').directive('pxContacts', function () {
  console.log("contacts directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/contacts/contacts.html';
    },
    controllerAs: 'Contacts',
    controller: Contacts
  }
});
// open in Modal mode
angular.module('starter').directive('pxContactsModal', function () {
  console.log("contactsModal directive");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/contacts/contactsModal.html';
    },
    controllerAs: 'Contacts',
    controller: Contacts
  }
});

function Contacts($scope, $rootScope,$ionicActionSheet) {
  console.log("Contacts ctrl");
  var list = [
    {
      name: 'Adam Jones',
      image: 'img/adam.jpg'
    },
    {
      name: 'Ben Smith',
      image: 'img/ben.png'
    },
    {
      name: 'Max McMillian',
      image: 'img/max.png'
    },
    {
      name: 'Mike Sanders',
      image: 'img/mike.png'
    }
  ];

  this.list = list;

  this.hideModal = function () {
        $rootScope.modal.hide();
  };

  this.showActions = function() {
      showContactsActionSheet($ionicActionSheet);
  }

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      console.log("ionic view enter...CONTACTS");
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'contactsMenu');
  });
}
