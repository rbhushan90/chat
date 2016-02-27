function showContactsActionSheet($ionicActionSheet) {
  // Show the action sheet

  var hideSheet = $ionicActionSheet.show({
    titleText: 'What would you like to do?',
    buttons: [
      { text: 'Send Invite' }
    ],
    cancelText: 'Cancel',
    cancel: function() {
      console.log('CANCELLED');
    },

    buttonClicked: function(index) {
      console.log("button clicked index=" + index);

      misc(index);return true;

      /*
      switch (index) {
        case 0 : syncContacts();break;
        default : misc(index);break;
      }
      return true;
      */
    }

  });
};

function misc(index) {
  console.log("misc was selected..");
}
