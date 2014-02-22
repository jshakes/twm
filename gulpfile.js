var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var coffee = require("gulp-coffee");
var compass = require("gulp-compass");
var uglify = require('gulp-uglify');
ulp.dest("./public/js/"))
});

// Concat & Compile Compass
gulp.task("compass", function() {
  gulp.src("./src/**/*.scss")
    .pipe(compass({
      css: './public/css',
      sass: './src/scss',
      image: './public/img'
    }))
    .pipe(gulp.dest("./public/css/"));
});

// Concat vendor files and libs
gulp.task("concat_vendors", function() {

  gulp.src([
      "./bower_components/modernizr/modernizr.js",
      "./bower_components/jquery/jquery.js",
      "./bower_components/underscore/underscore.js",
      "./bower_components/backbone/backbone.js",
      "./bower_components/backbone.marionette/lib/backbone.marionette.js"
    ])
    .pipe(concat("vendors.js"))
    .pipe(uglify({outSourceMaps: true}))
    .pipe(gulp.dest("./public/js/"));
});

// Concat JS
gulp.task("concat_js", function(){

  gulp.src("./src/**/*.js").pipe(concat("app.js")).pipe(gulp.dest("./public/js/"));

});

// Default
gulp.task("default", ["concat_vendors", "concat_js", "compass"]);

// Watch Coffee Files
gulp.watch("./src/**/*.js", ["concat_js"]);
// Watch SCSS Files
gulp.watch("./src/**/*.scss", ["compass"]);
