const {path,fs,url} = require("./include");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
const webpack = require("webpack");

let currentPath = "./source";
var NODE_ENV = process.env.NODE_ENV||"none";
const extractLess = new ExtractTextPlugin({
    allChunks: true,
    filename: currentPath+"/dist/css/[name]-less.css"  //如果带路径则在此路径下生成
});

let config = {
    mode:NODE_ENV,
    entry:{
        index:path.resolve(__dirname,"./source/route"),
        publics:["babel-polyfill","react","react-dom"]
    },
    output:{
        path: path.resolve(__dirname,"./source/dist/js/"),
        filename: '[name]-es5.js',
        publicPath: currentPath+"/dist/js/",////此处决定了chunkFilename要加载的路径，此处为坑
        chunkFilename: '[name]-chunk.js',//文件拆分chunk
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
          
        rules: [
            {
                test: /\.js$/,
                //include:/source/ig,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    
                    options: {
                      presets: ['@babel/preset-env',"@babel/preset-react"],
                      plugins: ['@babel/transform-runtime']
                    }
                  } 
          },
         // { test: /\.tsx?$/, loader: "ts-loader",include:/source/ig },
          {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: "less-loader",
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }]
            })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }
        ]
      },
      plugins:[
        extractLess,
        new ImageminPlugin({
              //disable: process.env.NODE_ENV !== 'production', // Disable during development
              pngquant: {
                quality: '95-100'
              }
        }),
        new webpack.DefinePlugin({
            "NODE_ENV":NODE_ENV
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
        })
        ],
        resolve: {
            alias: {
                "@@view":path.resolve(__dirname,"./source/view/"),
                "@@route":path.resolve(__dirname,"./source/route/")
            }

        }
    

}
module.exports=config;