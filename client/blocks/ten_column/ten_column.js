//  ______     ______     __     __    __     __  __     ______   __  __
// /\  __ \   /\___  \   /\ \   /\ "-./  \   /\ \/\ \   /\__  _\ /\ \_\ \
// \ \  __ \  \/_/  /__  \ \ \  \ \ \-./\ \  \ \ \_\ \  \/_/\ \/ \ \  __ \
//  \ \_\ \_\   /\_____\  \ \_\  \ \_\ \ \_\  \ \_____\    \ \_\  \ \_\ \_\
//   \/_/\/_/   \/_____/   \/_/   \/_/  \/_/   \/_____/     \/_/   \/_/\/_/
//
// azimuth-core/client/blocks/ten_column/ten_column.js
//
// Metadata and settings definition for the ten column block template
// The HTML for this template can be found in the respective directory in the view package.
//

Template.ten_column = Template.ten_column || {};
Template.ten_column.label = '10 Column Block';
Template.ten_column.description = 'A basic content block that takes up 2/3 of a row';
var fields = [{
      name: 'contents',
      type: 'wysiwyg',
      label: 'Contents',
      multiLanguages: true
    }];
// This important method hooks the template into the CMS
Azimuth.registry.blockTemplate({
  name: 'ten_column',
  label: '10 Column Block',
  fields: fields
});