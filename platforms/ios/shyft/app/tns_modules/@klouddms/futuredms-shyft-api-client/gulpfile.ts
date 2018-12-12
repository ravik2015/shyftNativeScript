
var gulp = require('gulp'),
  clean = require('gulp-clean');
  sass    = require('gulp-sass'),
  runSequence = require('run-sequence'),
  minifyCss   = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  tsc  = require('gulp-typescript'),
  embedTemplates  = require('gulp-inline-ng2-template'),
  exec = require('child_process').exec;

//----
//build steps
gulp.task('build', function (done) {
  
  runSequence(
   'clean-lib',
   'clean-tmp',
   'compile-sass',
    'compile-typings',
   'ngc-compile-typings'//,
 //   'compile-typings'
  );

});

//----
//clearing the output dir
/*
gulp.task('clean', function (done) {
  exec('rm -rf lib', function (err, stdOut, stdErr) {
    if (err){
      done(err);
    } else {
      done();
    }
  });
});
*/
gulp.task('clean-lib', function () {
  return gulp.src('lib', {read: false})
      .pipe(clean());
});

gulp.task('clean-tmp', function () {
  return gulp.src('tmp', {read: false})
      .pipe(clean());
});



gulp.task('ngc-compile-typings', function(){
  exec('"./node_modules/.bin/ngc" -p "./src/tsconfig-ngc.json"', function (err, stdout, stderr) {
    console.log("stdout:");
    console.log(stdout);
    console.log("stderror:");
    console.log(stderr);
    console.log("err (null is not an error):");
    console.log(err);
  });
})
//----
//typescript compilation including sourcemaps and template embedding
gulp.task('compile-typings', function() {

    //loading typings file
    var tsProject = tsc.createProject('./tsconfig.json');

    return  gulp.src('src/**/*.ts')
        .pipe(embedTemplates({ 
            base:'/src',
            useRelativePaths: true 
        }))
      //   .pipe(tsProject())
      //   .pipe(sourcemaps.init())
      //   .pipe(sourcemaps.write('./'))
      //   .pipe(gulp.dest('lib'));
        .pipe(gulp.dest('tmp'));
});

//----
//Sass compilation and minifiction
gulp.task('compile-sass', function () {
  gulp.src('components_src/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) // see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});


//----
//Sass compilation and minifiction
gulp.task('embed-template', function () {
  gulp.src('lib/**/*.js')
  .pipe(function(file){
     console.log(file);
  })
  .pipe(gulp.dest('dist/'));
});

