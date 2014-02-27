module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      compass: {
        files: "./src/scss/**/*.scss",
        tasks: "compass:dist",
        options: {
          interrupt: true
        }
      },
      concat_app: {
        files: "_js/**/*",
        tasks: "concat:app"
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: './src/scss/',
          cssDir: './public/css/',
          imagesDir: './public/img/'
        }
      }
    },
    concat: {
      vendor: {
        src: [
          "./src/lib/modernizr/modernizr.js",
          "./src/lib/jquery/dist/jquery.js",
          "./src/lib/underscore/underscore.js",
          "./src/lib/backbone/backbone.js",
          "./src/lib/backbone.marionette/lib/backbone.marionette.js"
          ],
        dest: "./public/js/vendor.js"
      },
      app: {
        src: "./src/js/**/*.js",
        dest: "./public/js/app.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("build", ["concat:vendor", "concat:app", "compass:dist"]);
}