/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for showing typing on
 * @param {number} delay - delay in miliseconds
 * @returns {Object} a Facebook Messenger message
 */
module.exports = function(delay) {
  delay = this.getDelay;

  return {
    type: 'typing_on',
    delay
  };
}
