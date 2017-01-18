/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for Buttons from api.ai button JSON
 * @param {Object[]} buttons - an array of api.ai buttons within Card
 * @returns {Object} an Array of Facebook Messenger buttons
 */
module.exports = function(buttons) {
  if (!buttons) {
    return undefined;
  }
  let
    fbButtons = []
  ;

  buttons.forEach((button) => {
    let
      postback = button.postback || ''
    ;
    if (!postback) {
      console.log('postback not defined for', button);
    } else {
      if (postback.startsWith('http')) {
        fbButtons.push({
          type: 'web_url',
          url: postback,
          title: button.text
        });
      } else if (postback.match(/^\+\d*$/g)) {
        fbButtons.push({
          type: 'phone_number',
          payload: postback,
          title: button.text
        });
      } else {
        fbButtons.push({
          type: 'postback',
          payload: postback,
          title: button.text
        });
      }
    }
  });
  return fbButtons;
};
