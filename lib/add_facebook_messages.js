/* jshint node: true */
'use strict';

/**
 * Middleware function to add Facebook Messenger messages to the
 * api.ai query response Object
 * @param {Object} message - Botkit message
 * @param {Object} response - api.ai response object
 * @param {Object} bot - Botkit Bot
 * @param {Object} next
 */
module.exports = function(message, response, bot, next) {

  response.result.fbMessages = this.createFacebookMessages(response);

  next();
};
