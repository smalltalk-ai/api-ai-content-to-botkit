/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for a payload message
 * @param {Object} payload - json to be sent in the message
 * @param {integer} delay - miliseconds delay before next message is set
 * @returns {Object} a Facebook Messenger message
 */
module.exports = function(payload, delay) {
  delay = this.getDelay(delay);
  let
    type = 'text'
  ;
  if (payload.attachment) {
    switch (payload.attachment.type) {
      case 'audio':
      case 'file':
      case 'image':
      case 'video':
        type = 'media';
        break;
      case 'template':
      default:
        type = 'template';
    }
  } else if (payload.quick_replies) {
    type = 'template';
  }

  return {
    type,
    delay,
    message: payload
  };
};
