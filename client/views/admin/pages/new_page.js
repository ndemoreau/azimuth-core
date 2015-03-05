//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/views/admin/pages/new_page.js
//
// Event handlers for creating a new page.
//
Template.new_page.events = {
  'click .submit': function (e) {
    e.preventDefault();
    var rawTitle = {};
    var languages = Azimuth.utils.getLanguages();
    languages.map(function(language) {
        rawTitle[language] = $('.new-page-title.' + language).val();
    })
    var rawSlug = $('.new-page-slug').val();
    // Validate input
    if (_.has(rawTitle, '') || rawSlug == '') {
      noty({
        text: 'Please enter values for all fields.',
        type: 'error'
      });
      return false;
    }
    var pageId = Azimuth.collections.Pages.insert({
      slug: rawSlug,
      label: rawTitle,
      template: 'page_default',
      meta: [{
        key: 'title',
        value: rawTitle[languages[0]]
      }]
    });
    // Add to navigation
    var updatePageNav = function (location, title, slug) {
      var navData = {
        location: location,
        title: title,
        url: '/' + slug,
        root: true
      };
      Azimuth.collections.Navigation.insert(navData)
    };
    if (Azimuth.utils.getSetting('addNewPagesToHeader'))
      updatePageNav('header', rawTitle, rawSlug);
    if (Azimuth.utils.getSetting('addNewPagesToFooter'))
      updatePageNav('footer', rawTitle, rawSlug);
    Router.go('/' + rawSlug);
    Azimuth.adminPanel.hide();
  },
  'keyup .new-page-title': function (e) {
    var defaultLanguage = Azimuth.utils.getLanguages()[0];
    if ($(e.target).hasClass(defaultLanguage)) {
        var rawTitle = $(e.target).val();
        rawTitle = rawTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        $('.new-page-slug').val(rawTitle);
    }
  }
};

Template.page_title.helpers ({
    languages: function() {
        return Azimuth.utils.getLanguages();
    }
});