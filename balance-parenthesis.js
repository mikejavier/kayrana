const messages = [
  'Needed a string to check',
  'Unbalanced string, please check your string',
  'Balanced string',
];

function isParanthesis(char) {
  return '{}[]()'.includes(char);
}

function isOpenParenthesis(parenthesisChar) {
  return getParenthesisIndex('{[(', parenthesisChar);
}

function isClosedParenthesis(parenthesisChar) {
  return getParenthesisIndex('}])', parenthesisChar);
}

function getParenthesisIndex(parenthesisList, parenthesisChar) {
  return parenthesisList
    .split('')
    .findIndex(element => element === parenthesisChar) + 1;
}

function parenthesisMatches(openParenthesis, closedParenthesis) {
  return isOpenParenthesis(openParenthesis) === isClosedParenthesis(closedParenthesis);
}

module.exports = function (stringToBalanced) {
  let arrayToBalanced, OpenParenthesisList;

  if (!stringToBalanced || typeof stringToBalanced !== 'string') return messages[0];

  arrayToBalanced = stringToBalanced.split('');

  OpenParenthesisList = [];

  for (let i = 0; i < arrayToBalanced.length; i++) {
    if (isParanthesis(arrayToBalanced[i])) {
      if (isOpenParenthesis(arrayToBalanced[i])) {

        OpenParenthesisList.push(arrayToBalanced[i]);

      } else {

        if (OpenParenthesisList.length === 0) return messages[1];

        const OpenParenthesisChar = OpenParenthesisList.pop();

        if (!parenthesisMatches(OpenParenthesisChar, arrayToBalanced[i])) return messages[1];
      }
    }
  }

  return OpenParenthesisList.length === 0 ? messages[2] : messages[1];
}