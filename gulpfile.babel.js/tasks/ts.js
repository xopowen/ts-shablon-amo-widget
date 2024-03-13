const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const options = require('../optionsPlagins')
const bable = require('gulp-babel')//works with the js
const webpackStream = require('webpack-stream')

var gts = require('gulp-typescript');

const ts = (assets,build)=>{
    console.log('work with ts'+`:${assets}->${build} /n  `)
    return src(assets,{sourcemaps:options.dev})
        .pipe(gts({declaration: true}))
        // .pipe(plumber(options.plumberJS))
        // .pipe(bable({}))
        // .pipe(size({title:'before minimalist js.'}))
        // .pipe(webpackStream(options.webpackStream))
        // .pipe(size({title:'after minimalist js.'}))
        .pipe(dest(build,{sourcemaps:options.dev}))
}
module.exports = ts;