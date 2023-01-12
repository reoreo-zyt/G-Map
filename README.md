## 搭建 js 库

### 安装 rollup ts

```bash
yarn add rollup typescript -D
```

### ts 配置文件

```bash
yarn tsc --init
```

修改 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5" /* 编译目标 */,
    "module": "commonjs" /* 项目模块类型 */,
    "lib": ["ES2018", "DOM"],
    "allowJs": true /* 是否允许js代码 */,
    "checkJs": true /* 检查js代码错误 */,
    "declaration": true /* 自动创建声明文件(.d.ts) */,
    "declarationDir": "./lib" /* 声明文件目录 */,
    "sourceMap": true /* 自动生成sourcemap文件 */,
    "outDir": "lib" /* 编译输出目录 */,
    "rootDir": "./src" /* 项目源码根目录，用来控制编译输出的目录结构 */,
    "strict": true /* 启用严格模式 */
  },
  "include": ["src/index.ts"],
  "exclude": ["node_modules", "lib"]
}
```

### rollup 插件

```bash
yarn add @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-commonjs rollup-plugin-terser -D
```

配置 rollup.config.ts

```ts
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
        name: 'FE_utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ module: "ESNext"})],
  }
]
```

### 修改 package.json

```json
{
  "name": "reoreo-zyt",
  "version": "0.0.1-alpha",
  "main": "lib/index.cjs.js",
  "module": "lib/index.esm.js",
  "jsnext:main": "lib/index.esm.js",
  "browser": "lib/index.umd.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/reoreo-zyt/G-Map.git"
  },
  "author": "reoreo <768119359@qq.com>",
  "license": "MIT",
  "scripts": {
    "build": "rollup -c",
    "test": "jest"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^24.0.0",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-typescript": "^10.0.1",
    "rollup": "^3.9.0",
    "rollup-plugin-terser": "^7.0.2",
    "typescript": "^4.9.4"
  },
  "description": "a game map utils for three dimensional",
  "bugs": {
    "url": "https://github.com/reoreo-zyt/G-Map/issues"
  },
  "homepage": "https://github.com/reoreo-zyt/G-Map#readme",
  "dependencies": {}
}
```

### 代码质量

#### 安装jest + lint + prettier + husky + commit-msg

测试框架安装

```bash
yarn add -D jest ts-jest @types/jest
```

创建配置文件

```bash
yarn jest --init
```

支持 DOM 和 BOM 操作

```bash
yarn add jest-environment-jsdom -D
```

使用时在文件顶部加上注释

```js
/**
 * @jest-environment jsdom
 */
```

TODO: 代码规范 参考 vue3-ts-demo 的配置
