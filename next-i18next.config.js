const path = require('path');

module.exports = {
  i18n: {
    localePath: path.resolve('./public/locales'),
    defaultLocale: 'nl',
    locales: ['en', 'nl'],
  },
};
