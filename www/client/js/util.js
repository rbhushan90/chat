var modalStack = [];

function broadcast(myRootScope, eventName, args) {
  console.log("broadcast an event");
  myRootScope.$broadcast(eventName, args); // $rootScope.$on && $scope.$on
}

function pushModal(modal) {
  modalStack.push(modal);
}

function popModal() {
  return modalStack.pop();
}

function peekModal() {
  if ( modalStack.length > 0 ) {
    return true;
  }
  return false;
}
