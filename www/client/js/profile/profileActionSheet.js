function showProfileActionSheet($ionicActionSheet) {
  // Show the action sheet

  var hideSheet = $ionicActionSheet.show({
    titleText: 'What would you like to do?',
    buttons: [
      { text: '<i class="icon ion-share"></i>Sync Contacts' },
      { text: '<i class="icon ion-mail"></i>Send Invites' },
    ],
    destructiveText: '<i class="icon ion-ios-trash"></i>Delete',

    cancelText: 'Cancel',
    cancel: function() {
      console.log('CANCELLED');
    },

    destructiveButtonClicked: function() {
      console.log('DESTRUCT');
      return true;
    },

    buttonClicked: function(index) {
      console.log("button clicked index=" + index);

      switch (index) {
        case 0 : syncContacts();break;
        default : misc(index);break;
      }
      return true;
    }
  });
};

function syncContacts() {
    console.log("share was selected");
}

function misc(index) {
  console.log("misc was selected..");
}
