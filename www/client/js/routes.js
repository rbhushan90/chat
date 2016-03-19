angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
   abstract: true,
   views : {
     'mainContent': {
       templateUrl: 'client/js/tabs/tabs.html'
     }
   }

  })

  .state('tab.watchlist', {
    url: '/watchlist',
    views: {
      'tab-watch': {
        template: '<px-watch-list></px-watch-list>'
      }
    }
  })

  .state('tab.promisehome', {
    url: '/promisehome',
    views: {
      'tab-promise': {
        template: '<px-promise-home></px-promise-home>'
      }
    }

  })

  .state('tab.promiselist', {
    url: '/promiselist',
    views: {
      'tab-promise': {
        template: '<px-promise-list></px-promise-list>'
      }
    }
  })

  .state('tab.promise', {
    url: '/promise/:promiseId',
    views: {
      'tab-promise': {
        template: '<px-promise></px-promise>'
      }
    }

  })
/*
  .state('tab.chat', {
    url: '/chat/:promiseId',
    views: {
      'tab-promise': {
        template: '<px-chat></px-chat>'
      }
    }
  })
*/

    .state('chat', {
      url: '/chat/:promiseId',
      views: {
        'mainContent': {
          template: '<px-chat></px-chat>'
        }
      }
    })


  .state('tab.integritometer', {
    url: '/integritometer',
    views: {
      'tab-integritometer': {
          template: '<px-integritometer></px-integritometer>'
      }
    }
  })


  .state('tab.contacts', {
    url: '/contacts',
    views: {
      'tab-integritometer': {
          template: '<px-contacts></px-contacts>'
      }
    }
  })

  .state('tab.share', {
    url: '/share',
    views: {
      'tab-integritometer': {
          template: '<px-share></px-share>'
      }
    }
  })

  .state('tab.areas', {
    url: '/areas',
    views: {
      'tab-integritometer': {
          template: '<px-areas></px-areas>'
      }
    }
  })

  .state('tab.showcase', {
    url: '/showcase',
    views: {
      'tab-integritometer': {
          template: '<px-showcase></px-showcase>'
      }
    }
  })



  .state('tab.tinder', {
    url: '/tinder',
    views: {
      'tab-tinder': {
        template: '<px-tinder></px-tinder>'
      }
    }
  })

  .state('tab.notifications', {
    url: '/notifications',
    views: {
      'tab-tinder': {
        template: '<px-notifications></px-notifications>'
      }
    }
  })


  .state('login', {
      url: '/login',
      views: {
        'mainContent': {
          template: '<px-login></px-login>'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/promiselist');
});
