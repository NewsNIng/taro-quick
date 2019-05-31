const npmConfigArgv = process.env.npm_config_argv;
const outputDirs =  ["weapp", "alipay", "h5"];

const findRunNowDir = (typeName) => {
  return npmConfigArgv.indexOf(typeName) > 0;
}

let outputRoot = 'dist';
// for(let i = 0; i < outputDirs.length; i++) {
//   if(findRunNowDir(outputDirs[i])) {
//     outputRoot = outputRoot + '_' + outputDirs[i];
//     break;
//   }
// }

const config = {
  projectName: 'taro-quick2',
  date: '2019-5-31',
  designWidth: 750,
  deviceRatio: {
    // '640': 2.34 / 2,
    // '750': 1,
    // '828': 1.81 / 2

    '750': 1/2,
    '375': 1, // 这里我使用375作为100% 有需要自行更改
  },
  alias: {
    'src': 'src',
  },
  sourceRoot: 'src',
  outputRoot: outputRoot,
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    // 开启小程序wxml压缩
    compile: {
      compressTemplate: true,
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development' || process.env.BUILD_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}

