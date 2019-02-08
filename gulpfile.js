// ---------------
// General plugins
// ---------------
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var del = require('del');
var noop = require('gulp-noop');

// ------------
// Sass plugins
// ------------
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');

// ----------------------------
// Javascript plugins
// ----------------------------
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

// ----------------------------
// Image plugins
// ----------------------------
const imagemin = require('gulp-imagemin');

// ------
// Config
// ------
var basePath = {
  src: './app/src/',
  assets: './app/assets/',
};

var path = {
  styles: {
    src: basePath.src + 'scss/',
    assets: basePath.assets + 'css/'
  },
  scripts: {
    src: basePath.src + 'js/',
    assets: basePath.assets + 'js/'
  },
  images: {
    src: basePath.src + 'images/',
    assets: basePath.assets + 'images/'
  }
}

function compileSASS() {
  return gulp.src(path.styles.src + '**/*.scss')
  .pipe(sassGlob())
  .pipe(sass())
  .pipe(autoprefix({
    browsers: ['last 2 versions']
  }))
  .pipe(path.env !== "development" ? cleanCss() : noop())
  .pipe(gulp.dest(path.styles.assets))
  .pipe(browserSync.reload({
    stream: true
  }))
}


function copyScripts() {
  return gulp.src(path.scripts.src + '**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(path.env !== "development" ? uglify() : noop())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.scripts.assets))
    .pipe(browserSync.reload({
      stream: true
    }))
}

function copyImages() {
  return gulp.src(path.images.src + '**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.images.assets))
    .pipe(browserSync.reload({
      stream: true
    }))
}

function cleanImages(done) {
  del(path.images.assets);
  browserSync.reload();
  done();
}

function runWatch() {
  gulp.watch(path.styles.src + '**/*.scss', compileSASS);
  gulp.watch(path.scripts.src + '**/*.js', copyScripts);
  gulp.watch(path.images.src + '**/*', gulp.series(cleanImages, copyImages));
}

function browserSyncInit() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
    files: "./app/index.html"
  });
}

function cleanAssets() {
  return del('./app/assets');
}

function cleanDist() {
  return del('./dist');
}

function copyToDist(done) {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'));
  
  gulp.src('./app/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'));

  done();
}

gulp.task('watch', gulp.series(cleanAssets, gulp.parallel(compileSASS, copyScripts, copyImages), runWatch));

gulp.task('default', gulp.parallel('watch', browserSyncInit), function(done) {
  done();
});

gulp.task('dist', gulp.series(cleanDist, cleanAssets, compileSASS, copyScripts, copyImages, copyToDist), function(done) {
  done();
});

gulp.task('dev', function(done) {
  environment("development");
  done();
});

function environment(env) {
  console.log('Running tasks in ' + env + ' mode.');
  return path.env = env;
}