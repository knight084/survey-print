/**
 * @desc clip the over chars while overflow limit count and append '...' if specified
 * @param {String} string
 * @param {Number} count
 * @param {Boolean} ellipsis, whether append ellipsis
 * @return {String}
 */
const limitChartCount = (string, count, ellipsis = true) => {
  return string && string.length > count ? string.slice(0, count - 1) + (ellipsis && "…") : string;
};

/**
 * @desc escape string according to the escape rules of regular expression
 * @param {String} string The original string to escape
 * @return {String} string The escaped string
 */
const escapeForReg = string => {
  const metas = ['\\', '.', '[', ']', '|', '^', '$', '(', ')', '*', '+', '?', '{', '}'];

  metas.forEach(meta => {
    const regExp = new RegExp(`\\${meta}`, 'gim');

    string = string.replace(regExp, matched => `\\${matched}`);
  });

  return string;

};

export default {limitChartCount, escapeForReg};
