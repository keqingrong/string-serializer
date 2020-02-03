import {
  author,
  name,
  version
} from './package.json';

const banner = `/*!
 * ${name} v${version}
 * Copyright (c) 2020-present ${author}
 * Released under the MIT License.
 */`;

const config = {
  input: 'src/index.js',
  output: [{
      file: `dist/${name}.esm.js`,
      format: 'es',
      banner: banner
    },
    {
      file: `dist/${name}.umd.js`,
      name: 'stringSerializer',
      format: 'umd',
      banner: banner
    }
  ]
};

export default config;
