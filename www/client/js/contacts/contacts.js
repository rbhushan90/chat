angular.module('starter').directive('pxContacts', function () {
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

  Contacts = this;
  Contacts.list = list;

  Contacts.hideModal = function () {
        $rootScope.modal.hide();
  };

  Contacts.sendInvite = function() {
      console.log("send invite");
      Contacts.hideModal();
  }

  $scope.$on( "$ionicView.enter", function( scopes, states ) {
      broadcast($rootScope, 'rootScope:broadcast:sideMenu', 'contactsMenu');
  });
}
