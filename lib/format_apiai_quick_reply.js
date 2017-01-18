/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for Quick Replies from api.ai quick replies
 * @param {Object} quickReplies - an array of api.ai quick replies
 * @param {integer} delay - miliseconds delay before next message is set
 * @returns {Object} a Facebook Messenger message
 */
module.exports = function(quickReplies, delay) {
  delay = this.getDelay(delay);

  return {
    type: 'template',
    delay,
    message: {
      text: quickReplies.title,
      quick_replies: quickReplies.replies.map((reply) => {
        return {
          content_type: 'text',
          title: reply,
          payload: reply
        }
      })
    }
  };
};
