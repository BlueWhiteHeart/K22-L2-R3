const gulp = require('gulp')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('autoprefixer')

gulp.task('style', function () {
  const processors = [
    autoprefixer({ browsers: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 10'] })
  ]
  return gulp
    .src('./app/view/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.dirname = ''
    }))
    .pipe(gulp.dest('./app/public/styles/'))
})

gulp.task('default', ['style'])

const watcher = gulp.watch('./app/view/**/*.sass', ['style'])

watcher.on('change', function (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
})
