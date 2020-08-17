const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [tailwindcss];

if (!IS_DEVELOPMENT) {
  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-z0-9-:/]+/g) || [];
    }
  }

  plugins.push(
    purgecss({
      content: ['public/*.html'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html'],
        },
      ],
    }),
  );
}

module.exports = {
  plugins,
};
