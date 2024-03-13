const gulp  = require('gulp')
const{ watch,series,parallel,src,dest} = gulp
var deleteLines = require('gulp-delete-lines');
let __dir = '.';
const PATH = {
    // Заглавные - конечный путь.
    // малые - словарь
    dir:__dir,
    build:{
        CSS:__dir+"/widget"+"/css",
        JS:__dir+"/widget"+"",
        JS_L:__dir+"/widget"+'/lib',
        IMG:__dir+'/widget'+'/images',
        FONTS:__dir+"/widget/fonts",
        TEMPLATES:__dir+'/widget/templates',
        I18N:__dir+'/widget/i18n',
        MANIFEST:__dir+'/widget'
    },
    src:{
        I18N:__dir+'/src/i18n/*.json',
        MANIFEST:__dir+'/src/manifest.json',
        TEMPLATES:__dir+'/src/templates/*.twig',
        TWIG:__dir+'/src'+'/**/*.twig',
        FONTS:__dir+'/src/fonts/*.{oet,ttf,otf,ttc,woff,woff2,svg}',
        SCSS:__dir+'/src'+'/scss/',
        scss:{
            MAIN:__dir+"/src"+'/scss/main.{scss,sass}',
            COMPONENT:__dir+"/src"+'/scss/components/*.{scss,sass}'
        },
        TS:__dir+'/src'+'/**/*.ts',
        ts:{
            MAIN:__dir+"/src"+'/script.ts',
            TEST:__dir+"/src/script.test.ts",
            type:__dir+"/src"+'/types/**/*.ts',
            TS_L:__dir+"/src"+'/lib/**/*.ts'
        },
        IMG:__dir+'/src'+'/images/*.{png,svg,gif,jpg,jpeg}',
    },

    get SRC(){
        return  __dirname+'/src'
    },
    get BUILD (){
        return __dirname+'/widget'
    }
}

const browser = require('browser-sync').create()


const clean =()=> require("./tasks/clean.js")(PATH.BUILD+'/')

const mainTS = ()=> require('./tasks/ts')(PATH.src.ts.MAIN,PATH.build.JS)
const libTS = ()=> require('./tasks/ts')(PATH.src.ts.TS_L,PATH.build.JS_L)

const fonts = () =>  require('./tasks/fonts')(PATH.src.FONTS,PATH.build.FONTS)
const scss = ()=>require('./tasks/scss')(PATH.src.scss.MAIN,PATH.build.CSS)
const imgModel = require("./tasks/img.js")
const img = ()=>imgModel(PATH.src.IMG,PATH.build.IMG)
const options = require('./optionsPlagins')
//watcher
const watchFun = ()=>{
    watch(PATH.src.FONTS ,fonts).on('all',browser.reload)
    watch(PATH.src.SCSS,scss).on('all',browser.reload)
    watch(PATH.src.ts.MAIN, mainTS).on('all',browser.reload)
    watch(PATH.src.ts.TS_L, libTS).on('all',browser.reload)
    watch(PATH.src.ts.type, mainTS).on('all',browser.reload)
    watch(PATH.src.IMG,img).on('all',browser.reload)
}

const watchBrowser = ()=>{
    browser.init({
        // browser: ["firefox"],
        server:{
            // baseDir:PATH.build,
        }
    })
}

const build = series(
        clean,fonts,
        async ()=>{src(PATH.src.IMG).pipe(dest(PATH.build.IMG))},
        async ()=>{src(PATH.src.I18N).pipe(dest(PATH.build.I18N))},
        async ()=>{src(PATH.src.MANIFEST).pipe(deleteLines({'filters': [/("_comment").*(.)/]})).pipe(dest(PATH.build.MANIFEST))},
        parallel(scss ,mainTS,libTS))   // twig,

                         
const dev =  series(

        build,
        // parallel(watchFun,watchBrowser)
)
 

exports.watcher = watchFun;
exports.clean = clean;
// exports.css = css;
exports.scss = scss;
exports.ts =  series(parallel(mainTS,libTS));
exports.img = img;
exports.fonts= fonts;
// exports.greateFontFile= greateFontFile;
//development
exports.dev = dev;
//build
exports.build = build

exports.default = options.build?
    build:
    dev