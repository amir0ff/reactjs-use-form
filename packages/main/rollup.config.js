import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    url({ exclude: ['**/*.svg'] }),
    resolve(),
    typescript(),
    commonjs({ extensions: ['.js', '.ts'] }),
  ],
};
