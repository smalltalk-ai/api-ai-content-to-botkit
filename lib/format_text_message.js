/* jshint node: true, devel: true */
'use strict';

const
  os = require('os')
;

/**
 * Format the JSON for a text message
 * @param {string} text - text to be sent in the message
 * @param {integer} delay - miliseconds delay before next message is set
 * @returns {Object} a Facebook Messenger message
 */
module.exports = function(text, delay) {
  delay = this.getDelay(delay);

  // replace paragraph symbol with End of Line unicode charater
  // allows support for hard returns in text
  text = text.replace(/¶/g, os.EOL);

  return {
    type: 'text',
    delay,
    message: {
      text
    }
  };
};
