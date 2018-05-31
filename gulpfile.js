var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  ts = require('gulp-typescript'),
  pump = require('pump'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('clean', function () {
  del([
    'dist'
  ]);
});

gulp.task('compileTs', function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      experimentalDecorators: true,
      target: 'es5',
      lib: ['es5', 'es2017', 'dom']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function (callback) {
  pump([
      gulp.src('src/**/*.js'),
      uglify(),
      gulp.dest('dist')
    ],
    callback
  );
});

gulp.task('movePackageJson', function (callback) {
  return gulp.src('dist_package.json')
    .pipe(rename('package.json'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-src', function (callback) {
  runSequence('clean', 'compileTs', 'movePackageJson', callback);
});
