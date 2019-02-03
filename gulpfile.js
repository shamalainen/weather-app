// ---------------
// General plugins
// ---------------
var gulp = require('gulp');

// ------------
// Sass plugins
// ------------
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');

gulp.task('sass', function(){
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefix({
      browsers: ['last 2 versions']
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('./app/css'))
});


// -----------
// Watch task.
// -----------
gulp.task('watch', function() {
  console.log("Watching SCSS");
  gulp.watch('./app/scss/**/*.scss', gulp.series('sass'));
});

// -------------
// Default task.
// -------------
gulp.task('default', gulp.series('sass'), function(done) {
  console.log("Building SCSS");
  done();
});