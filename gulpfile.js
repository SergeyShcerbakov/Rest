const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const { series } = require("gulp");

function defaultTask(cb) {
  // place code for your default task here
  cb();
};

function buildStyles() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on("error", sass.logError))
    //.pipe(cssnasano())
    .pipe(gulp.dest('app/css'));
};

function csstodist() {
  return gulp
    .src('app/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css/'));
};

function fontstodist() {
  return gulp
    .src('app/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'));
};

  function htmlInclude() {
    return gulp
      .src("app/*.html")
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "@file",
        })
      )
      .pipe(gulp.dest("dist"));
  }

function imgmin() {
  return gulp
    .src('app/imges/**/*.*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("dist/imges"));
}

function libstoDest() {
  return gulp
    .src('app/libs/**/*.*')
    .pipe(gulp.dest('dist/libs/'));
};

exports.default = defaultTask; // gulp
exports.scss = buildStyles;
exports.css = csstodist;
exports.html = htmlInclude;
exports.img = imgmin;
exports.font = fontstodist;
exports.libs = libstoDest;
// exports.includehtml = include;

exports.dev = series(
  htmlInclude,
  buildStyles,
  csstodist,
  fontstodist,
  imgmin,
  libstoDest
)