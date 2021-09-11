// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import { join } from 'path';
import routes from './routes';
import webpackPlugin from './plugin';


const { REACT_APP_ENV, APP_TYPE } = process.env;

export default defineConfig({
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  antd: {},
  alias: {},
  title: false,
  hash: true,
  publicPath: '/',
  ignoreMomentLocale: true,
  // umi routes: https://umijs.org/docs/routing
  routes,
  // browser | hash ,默认 browser
  history: { type: 'browser' },
  //esbuild is father build tools:  https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  fastRefresh: {},
  chainWebpack: webpackPlugin,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
  },
  manifest: {
    basePath: '/',
  },
  // request: https://umijs.org/plugins/plugin-request#%E6%9E%84%E5%BB%BA%E6%97%B6%E9%85%8D%E7%BD%AE
  request: {
    dataField: '',
  },
  openAPI: {
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
});
