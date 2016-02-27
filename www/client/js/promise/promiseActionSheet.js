function showPromiseActionSheet($rootScope, $ionicActionSheet) {
  console.log("promiseActionSheet$ionicActionSheet");
  // Show the action sheet

  var hideSheet = $ionicActionSheet.show({
    titleText: 'What would you like to do?',
    buttons: [
      { text: 'Edit' },
      { text: 'Save' }
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
      console.log("Text = " + this.buttons[index].text);

      switch (index) {
        case 0 : edit();break;
        case 1 : save();break;
        default : misc(index);break;
      }
      return true;
    }
  });
};

function edit() {
    console.log("edit was selected");
}

function save() {
    console.log("save was selected");
}


function misc(index) {
  console.log("misc was selected..");
}
