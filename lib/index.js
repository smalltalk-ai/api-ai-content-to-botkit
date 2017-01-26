/* jshint node: true */
'use strict';

let ApiaiContentService = function (serverURL) {
  this.SERVER_URL = serverURL;

  this.getDelay = function(delay) {
    return (Number.isInteger(delay) && delay > 0) ? delay : 0;
  }
};

ApiaiContentService.prototype.addFacebookMessages = require('./add_facebook_messages.js');
ApiaiContentService.prototype.createFacebookMessages = require('./create_facebook_messages.js');
ApiaiContentService.prototype.formatApiaiButtons = require('./format_apiai_buttons.js');
ApiaiContentService.prototype.formatApiaiCards = require('./format_apiai_cards.js');
ApiaiContentService.prototype.formatApiaiQuickReply = require('./format_apiai_quick_reply.js');
ApiaiContentService.prototype.formatImageAttachment = require('./format_image_attachment.js');
ApiaiContentService.prototype.formatPayloadMessage = require('./format_payload_message.js');
ApiaiContentService.prototype.formatTextMessage = require('./format_text_message.js');
ApiaiContentService.prototype.formatTypingOn = require('./format_typing_on.js');
ApiaiContentService.prototype.getTextStream = require('./get_text_stream.js');

module.exports = ApiaiContentService;
