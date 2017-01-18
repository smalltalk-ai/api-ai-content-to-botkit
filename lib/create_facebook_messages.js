/* jshint node: true */
'use strict';

/**
 * Create an array of Facebook Messenger messages from api.ai query response Object
 * @param {Object} apiaiResponse - api.ai response object returned from a query
 * @returns {Object[]} an Array of Facebook Messenger messages
 */
module.exports = function(apiaiResponse) {
  if (!apiaiResponse || !apiaiResponse.result ||
        !apiaiResponse.result.fulfillment) {
    return [];
  }
  let
    fulfillment = apiaiResponse.result.fulfillment,
    speech = fulfillment.speech || '',
    messages = fulfillment.messages || [],
    lastMessageIdx = messages.length - 1,
    cards = {
      group: [],
      lastCardIdx: null
    },
    fbMessages = []
  ;
  // loop through messages and create Facebook message
  messages.forEach((message, idx) => {
    if (message.type === 1) {
      // card
      // proccess cards after all cards are added
      cards.group.push(message);
    }

    if (idx === lastMessageIdx || message.type !== 1) {
      // last message or not a card
      // check if there are cards to process
      if (cards.group.length > 0) {
        // process cards
        // create a message
        fbMessages.push(this.formatApiaiCards(cards.group));
        // empty cards group
        cards.group = [];
      }
    }
    switch (message.type) {
      case 0:
        // text
        fbMessages = fbMessages.concat(this.getTextStream(message.speech));
        break;
      case 2:
        // quick replies
        fbMessages.push(this.formatApiaiQuickReply(message));
       break;
      case 3:
        // image
        fbMessages.push(this.formatImageAttachment(message.imageUrl));
        break;
      case 4:
        // payload
        if (message.payload && message.payload.facebook) {
          fbMessages.push(message.payload.facebook);
        }
        break;
      case 1:
        // handled above
        break;
      default:
    }
  });
  return fbMessages;
}
