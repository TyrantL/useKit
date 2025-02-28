import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.ts'],
      exclude: 'node_modules/**'
    }),
    terser({
      compress: {
        drop_console: true, // 移除 console.*
        module: false, // 是否启用ECMAScript模块压缩
        warnings: false, // 是否输出警告信息
      },
    }),
  ],
}
