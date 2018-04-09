var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var browserSync = require('browser-sync').create();

function copyCss() {
  return gulp.src(
    [
      'src/css/**',
      'node_modules/bootstrap/dist/css/**',
      'node_modules/font-awesome/css/**',
      'node_modules/ui-select/dist/select.css'
    ]).pipe(gulp.dest('dist/resource/css'));
}

function copyFonts() {
  return gulp.src(
    [
      'node_modules/bootstrap/dist/fonts/**',
      'node_modules/font-awesome/fonts/**'
    ]).pipe(gulp.dest('dist/resource/fonts'));
}

function copyJavascriptResources() {
  return gulp.src(
    [
      'resource/*.js'
    ]).pipe(gulp.dest('dist/resource/js'));
}

function copySvg() {
  return gulp.src(
    [
      'resource/*.svg'
    ]).pipe(gulp.dest('dist/resource/svg'));
}

function copyImg() {
  return gulp.src(
    [
      'src/img/*.jpg'
    ]).pipe(gulp.dest('dist/resource/img'))
}

gulp.task('clean', function (cb) {
  return del([
    'dist/**/*'
  ], cb);
});

gulp.task('usemin', function () {
  return gulp.src(['index.html', 'src/html/*.html'])
             .pipe(usemin({
               html: [function () {
                 return minifyHtml({empty: true, conditionals: true});
               }],
               js: [uglify(), 'concat', rev()],
               css: [rev()]
             }))
             .pipe(gulp.dest('dist'));
});

gulp.task('copyResources', function () {
  copyCss();
  copyFonts();
  copyJavascriptResources();
  copySvg();
  copyImg();
});

gulp.task('build', function () {
  return gulp.run('usemin');
});

gulp.task('browser-sync', function () {
  return browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
});

gulp.task('run-all', ['clean', 'build', 'copyResources', 'browser-sync']);