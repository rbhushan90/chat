angular.module('starter').directive('pxContactusModal', function () {
  console.log("contact us");
  return {
    restrict: 'E',
    templateUrl: function() {
        return 'client/js/contactUs/ContactUsModal.html';
    },
    controllerAs: 'ContactUs',
    controller: ContactUs
  }
});


function ContactUs($scope, $rootScope) {
  console.log("contact us controller");

  ContactUs = this;

  ContactUs.save = function() {
    console.log("contact us...");
    ContactUs.hideModal();
  }
  ContactUs.hideModal = function () {
      $rootScope.modal.hide();
  };

}
