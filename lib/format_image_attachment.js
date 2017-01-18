/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for a image attachment
 * @param {string} url - image url of the image (e.g., http://www.site.com/sample.gif)
 * @param {integer} delay - miliseconds delay before next message is set
 * @returns {Object} a Facebook Messenger message
 */
module.exports = function(url, delay) {
  delay = this.getDelay(delay);

  return {
    type: 'media',
    delay,
    message: {
      attachment: {
        type: 'image',
        payload: {
          url
        }
      }
    }
  };
};
