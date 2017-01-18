/* jshint node: true, devel: true */
'use strict';

/**
 * Format the JSON for a Generic Templates from api.ai Cards
 * @param {Object[]} cards - an array of api.ai cards
 * @param {integer} delay - miliseconds delay before next message is set
 * @returns {Object} an Array of Facebook Messenger message
 */
module.exports = function(cards, delay) {
  delay = this.getDelay(delay);

  cards = cards || [];
  let
    elements = []
  ;

  cards.forEach((card) => {
    elements.push(
      {
        title: card.title,
        image_url: card.imageUrl,
        subtitle: card.subtitle,
        buttons: this.formatApiaiButtons(card.buttons)
      }
    );
  });

  return {
    type: 'template',
    delay,
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements
        }
      }
    }
  };
};
