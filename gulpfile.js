const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();

const nunjucksRender = require('gulp-nunjucks-render');
const removeEmptyLines = require('gulp-remove-empty-lines');
const htmlbeautify = require('gulp-html-beautify');

const scss = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const removeComments = require('gulp-strip-css-comments');


const rename = require('gulp-rename');

const rigger = require('gulp-rigger');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify-es').default;

const newer = require('gulp-newer');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const clean = require('gulp-clean');

function nunjucks() {
  return (
    src('app/njk/*.njk')
      .pipe(nunjucksRender())
      .pipe(htmlbeautify({ 'indent_with_tabs': false }))
      .pipe(removeEmptyLines())
      .pipe(dest('app'))
      .pipe(browserSync.stream())
  );
}

function styles() {
  return src(['app/scss/*.scss'])
    .pipe(sourcemaps.init()) //Закомментировать при build
    .pipe(sassGlob())
    .pipe(
      scss({
        outputStyle: 'expanded', //expanded  compressed
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        grid: 'autoplace',
        overrideBrowserslist: ['last 10 versions'],
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(sourcemaps.write()) //Закомментировать при build
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['app/js/*.js', '!app/js/*.min.js'])
    .pipe(rigger())
    .pipe(
      rename({
        suffix: '.min',
        extname: '.js',
      })
    )
    .pipe(strip())
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function images() {
  return src(['app/images/src/**/*.*', '!app/images/src/**/*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('app/images/src/**/*.*'))
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src('app/images/src/**/*.*'))
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'));
}

function sprite() {
  return src('app/images/src/sprite/**/*.svg')
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(
      fonter({
        formats: ['woff', 'ttf'],
      })
    )
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'));
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });

  watch(['app/njk/*.njk', 'app/module/**/*.html'], nunjucks);
  watch(['app/scss/*.scss', 'app/module/**/*.scss'], styles);
  watch(['app/images/src'], images);
  watch(['app/module/**/*.js', 'app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
  watch(['app/fonts/src'], fonts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
  return src('docs').pipe(clean());
}

function building() {
  return src(
    [
      'app/**/*.html',
      'app/images/**/*.*',
      '!app/module/**',
      '!app/images/stack/**',
      '!app/images/src/**',
      'app/css/style.min.css',
      'app/fonts/*.*',
      'app/js/main.min.js',
      'app/*.ico',
      'app/favic.webmanifest',
    ],
    { base: 'app' }
  ).pipe(dest('docs'));
}


exports.sprite = sprite;
exports.nunjucks = nunjucks;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.building = building;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(nunjucks,styles, images, fonts, scripts, watching);
