//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/lib/utils.js
//
// Common utility methods used in various parts of the application.
//

Azimuth.utils = Azimuth.utils || {};
// Get the page object corresponding to the current page slug
Azimuth.utils.getCurrentPage = function () {
  var notFound = {
      notFound: true,
      title: 'Sorry, we couldn\'t find the requested page'
    };
  if (!Iron.Location.get() || !Iron.Location.get().path)
    return notFound;
  var page_slug = Iron.Location.get().path.split('/')[1];

  var page;
  if (!page_slug || page_slug == '') {
    page_slug = Azimuth.utils.getSetting('indexPage');
    page = Azimuth.collections.Pages.findOne({ slug: page_slug });
    if (!page) {
      page = Azimuth.collections.Pages.findOne();
      if (!page)
        return notFound;
      else
        page_slug = page.slug;
    }
  }
  page = Azimuth.collections.Pages.findOne({ slug: page_slug });
  if (!page)
    return notFound;
  return page;
};
// Get an array of form values for a form
Azimuth.utils.getFormValues = function (selector) {
  var values = {};
  // Turn form into array and handle special cases
  values = $(selector).serializeJSON();
  $.each(values, function (i, field) {
    // if (field.name == 'tags') field.value = field.value.split(',');
    if (field.value == 'on')
      field.value = true;
    values[field.name] = field.value;
  });
  $.each($(selector).find(':checkbox:not(:checked)'), function (i, field) {
    values[field.name] = false;
  });
  debugger;
  return values;
};
Azimuth.utils.displayHumanReadableTime = function (timestamp) {
  var a = new Date(timestamp);
  var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  if (hour < 10)
    hour = '0' + hour;
  var min = a.getMinutes();
  if (min < 10)
    min = '0' + min;
  var sec = a.getSeconds();
  if (sec < 10)
    sec = '0' + sec;
  var time = month + '/' + date + '/' + year.toString().slice(2) + ' @ ' + hour + ':' + min + ':' + sec;
  return time;
};
Azimuth.utils.displayHumanReadableDate = function (timestamp) {
  var a = new Date(timestamp);
  var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var time = month + '/' + date + '/' + year.toString().slice(2);
  return time;
};
// Get a setting value
Azimuth.utils.getSetting = function (settingName) {
  var settings = Azimuth.collections.Settings.findOne();
  if (!settings || !settingName)
    return false;
  return Azimuth.collections.Settings.findOne()[settingName];
};

// Open a modal
Azimuth.utils.openModal = function (selector) {
  var $modal = $(selector).find('.azimuth-modal');
  var $bg = $(selector).find('.azimuth-modal-bg');

  if (!$modal.length) {
    console.log('Modals need the .azimuth-modal class to work properly');
  }

  // Set up click handlers on any elements with the close class to close the modal
  $(selector).find('.close').click(function (e) {
    e.preventDefault();
    Azimuth.utils.closeModal(selector);
  });
  // Bind to escape key
  $(document).on('keyup.azimuth-modal', function (e) {
    if (e.keyCode == 27) {
      Azimuth.utils.closeModal(selector);
    }
  });
  // Open the modal
  $bg.addClass('open');
  $modal.addClass('open');
};
// Close a modal
Azimuth.utils.closeModal = function (selector) {
  $(selector).find('.azimuth-modal').removeClass('open');
  $(selector).find('.azimuth-modal-bg').removeClass('open');
  $(document).unbind('keyup.azimuth-modal');
};
// Get all unique block tags
// FIXME: If Meteor implements MongoDB's .distinct() method that would be much faster
Azimuth.utils.getDistinctBlockTags = function () {
  var blockTags = Azimuth.collections.Blocks.find({}, {
      fields: { tag: 1 },
      reactive: false
    });
  var tags = [];
  blockTags.forEach(function (block) {
    tags = tags.concat(block.tag);
  });
  // Remove duplicates and any cruft
  var tagList = _.uniq(_.reject(tags, function (item) {
      return item == undefined;
    }));
  // Return as array of objects
  return _.map(tagList, function (item) {
    return { tag: item };
  });
};
// Return a block template with its data attached to the block variable
Azimuth.utils.renderBlock = function (block) {
  var block = block || this;
  if (block && block.template) {
    Template[block.template].helpers({ block: block });
    var _rendered = typeof Template[block.template].rendered == "function" ? Template[block.template].rendered : false;
    var _customRendered = function() {
      // Call the existing rendered function from our custom one
      if (_rendered) {
        _rendered.apply(this, arguments);
      }
      Azimuth.adminPanel.initEditToggle.apply(this, arguments)
    }
    if (!Template[block.template].rendered || !_.isEqual(Template[block.template].rendered.toString(), _customRendered.toString())) {
      Template[block.template].rendered = _customRendered;
    }
    return Template[block.template];
  } else {
    console.log('Block not found (or has no template specified)');
  }
};
Azimuth.utils.getLanguages = function() {
    return Azimuth.collections.Settings.findOne().languages.split(",")
}
