/* router.js
 *
 * Uses Meteor-router to route URLs to the correct page.
 *
 */

// Global configuration
Router.configure({
  layoutTemplate: 'layout',

  notFoundTemplate: '404',

  // loadingTemplate: 'loading',

  yieldTemplates: {
    'header': { to: 'header' },
    'footer': { to: 'footer' }
  }
});

// Set up our routes
Router.map(function() {
  // Account routes
  this.route("login", {
    path: "/login",
    before: function() {
      Session.set('error', void 0);
      Session.set('buttonText', 'in');
    }
  });
  this.route("sign_up", {
    path: "/sign-up",
    before: function() {
      Session.set('error', void 0);
      Session.set('buttonText', 'up');
    }
  });
  this.route("forgot_password", {
    path: "/forgot-password",
    before: function() {
      Session.set('error', void 0);
    }
  });

  // Add routes for admin-level pages if user has correct permissions
  this.route('site_settings', {
    controller: AdminController
  });
  this.route('assets', {
    controller: AdminController
  });
  this.route('new_page', {
    controller: AdminController
  });
  this.route('navigation', {
    controller: AdminController
  });
  this.route('admin_users', {
    controller: AdminController,
    path: '/users'
  });

  // Login
  this.route('admin_users', {
    controller: AdminController,
    path: '/users'
  });

  // Route / to the admin-set root page or the first page
  this.route('home', {
    path: '/',
    controller: HomePageController
  })

  // Route pages
  this.route('pageEdit', {
    path: '/:page/edit',
    controller: PageEditController
  })

  // Route pages
  this.route('page', {
    path: '/:page',
    controller: PageController
  })

});
