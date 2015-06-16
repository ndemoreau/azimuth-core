(function ($) {
  // Define the hello button
  $.cleditor.buttons.file = {
    name: 'file',
    image: '../packages/ndemoreau_azimulti-core/img/file.gif',
    title: 'Insert File',
    command: 'inserthtml',
    popupName: 'file',
    popupClass: 'cleditorPrompt',
    buttonClick: insertFile
  };
  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace('source', 'source file');
  // Handle the hello button click event
  function insertFile(e, data) {
    Azimuth.utils.openModal('#wysiwygFileModal');
    $.cleditor.buttons.file.data = data;
    // Image insertion will be handled by wysiwyg template event helper
  }
}(jQuery));