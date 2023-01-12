// @rollup/plugin-node-resolve  处理路径
// @rollup/plugin-typescript   支持ts
// @rollup/plugin-commonjs  处理commonjs
// rollup-plugin-terser    压缩umd规范的输出文件
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser')

module.exports = [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        sourcemap: false, // 是否输出sourcemap
      },
      {
        dir: 'lib',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: false, // 是否输出sourcemap
      },
      {
        dir: 'lib',
        format: 'umd',
        entryFileNames: '[name].umd.js',
        name: 'G_Map', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ module: "ESNext"})],
  }
]
