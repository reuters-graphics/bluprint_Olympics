const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
  typographer: true,
  html: true,
});
const mdAttrs = require('markdown-it-attrs');
const mdSpans = require('markdown-it-bracketed-spans');
const mustache = require('mustache');

md.use(mdAttrs);
md.use(mdSpans);

const LOCALE_ROOT = path.resolve(__dirname, '../../../locales');

const removeBlockMarkers = (str) => str.slice()
  .replace(/^<<[ ]?[a-zA-Z]{1}[a-zA-Z-0-9]*[ ]?>>/gm, '')
  .replace(/^<<>>/gm, '');

const renderMd = (str, context) => {
  const cleanMd = removeBlockMarkers(str);
  const contextRich = mustache.render(cleanMd, context);
  return md.render(contextRich);
};

const getLocaleMarkdown = (locale) => (markdownFilePath, context = {}) => {
  const file = path.join(LOCALE_ROOT, locale, markdownFilePath);

  if (!fs.existsSync(file)) throw new Error(`Can't find markdown file at ${file}`);

  const markdown = fs.readFileSync(file, 'utf-8');

  const regex = /<<[ ]?[a-zA-Z]{1}[a-zA-Z-0-9]*[ ]?>>.+?<<>>/gs;

  const blockMatches = markdown.match(regex);

  /* eslint-disable no-new-wrappers */
  if (!blockMatches) return new String(renderMd(markdown, context));

  // We're gonna create a new string *object* so we can hang some extra
  // properties off it.
  const rendered = new String(renderMd(markdown, context));
  /* eslint-enable no-new-wrappers */

  blockMatches.forEach((blockMatch) => {
    const regex = /^<<[ ]?([a-zA-Z]{1}[a-zA-Z-0-9]*)[ ]?>>/;
    const blockKey = blockMatch.match(regex)[1];

    rendered[blockKey] = renderMd(blockMatch, context);
  });

  return rendered;
};

module.exports = getLocaleMarkdown;
