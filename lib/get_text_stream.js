/* jshint node: true */
'use strict';

const
  TEXT_MAX = 320,
  readRate = 50 // characters / sec
;

/**
 * function which returns an array of sentence text strings
 *
 * @param {string} text string to be broken into sentences
 * @returns {string[]} An array of sentence strings
 */
let breakIntoSentences = function(text) {
  let
    regex = RegExp(/[\.!\?]+/g),
    endOfSentences = text.match(regex),
    sentences = text.split(regex)
  ;

  // if array is null (no matches), the add the full text
  if (!endOfSentences) {
    return [ text ];
  }
  // add the end of sentence punctuation back to sentences
  sentences.forEach((sentence, idx, thisArray) => {
    let
      endOfSentence = endOfSentences[idx] || ''
    ;
    thisArray[idx] = `${sentence}${endOfSentence}`;
  });
  return sentences;
}

/**
 * function which returns an array of text strings optimized for bot messages
 *
 * @param {array} sentences An array of strings
 * @param {number} maxTextLength max length of each string in output array
 * @returns {string[]} An array of strings each with a length less than maxTextLength
 */
let groupSentences = function(sentences, maxTextLength) {
  maxTextLength = (Number.isInteger(maxTextLength) && maxTextLength > 0) ?
    maxTextLength :
    TEXT_MAX;
  let
    textMessages = [],
    sentenceGroup = ''
  ;

  sentences.forEach(function(sentence, idx) {
    if (sentence.length > maxTextLength) {
      // sentence is too long
      if (sentenceGroup) {
        // current group of sentences needs to be added to list
        textMessages.push(sentenceGroup);
        sentenceGroup = '';
      }
      // the sentence is too long, so it
      // needs to be broken into smaller chucks
      sentence = sentence.substring(0, maxTextLength - 1) + '…';

      // add to messages array
      textMessages.push(sentence);
    } else {
      // sentence is shorter then max
      if ((sentenceGroup.length + sentence.length) <= maxTextLength) {
        // the current sentence can fit in a message
        sentenceGroup += sentence;
      } else {
        // sentence is too big to add to previous group
        // add previous sentence to messages
        textMessages.push(sentenceGroup);
        // start a new group with sentence
        sentenceGroup = sentence;
      }
      if (idx === (sentences.length - 1)) {
        // last sentence, so add last sentenceGroup
        // if it has any text
        if (sentenceGroup) {
          textMessages.push(sentenceGroup);
        }
      }
    }
  });
  return textMessages;
}

/**
 * function which returns an array of text messages and typing on messages
 *
 * @param {array} textArr An array of strings
 * @returns {array} An array of messages
 */
let generateMessages = function(textArr) {
  const
    readRate = 50, // characters / sec
    typingDelay = 500
  ;

  let
    service = this,
    messages = [],
    nextDelay = 0
  ;

  textArr.forEach(function(text, idx) {
    let
      // calcuate the delay before the next message
      delay = Math.round((text.length / readRate) * 1000)
    ;
    // add the message
    messages.push(service.formatTextMessage(text, nextDelay));
    // calulate the delay for the next message
    // subtract the delay in the typing on
    nextDelay = (delay - typingDelay) > 0 ? (delay - typingDelay) : 0;

    if (idx !== textArr.length - 1) {
      // add a typoing on for all but the last message
      messages.push(service.formatTypingOn(500));
    }
  });
  return messages;
}

module.exports = function(text) {
  let
    // split into sentences
    sentences = breakIntoSentences(text),
    // group into text message of proper length
    textMessages = groupSentences(sentences),
    // add delays and typing on between text messages
    messages = generateMessages.call(this, textMessages)
  ;
  return messages;
}
