var timer = require("grunt-timer");
module.exports = function(grunt) {

  timer.init(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: 'refri',
          processName: function(filePath) {
            return filePath.replace("js/templates/", '').replace(/\.hbs$/, '');
          }
        },
        files: {
          'js/templates/templates.js': ['js/templates/*.hbs','js/templates/**/*.hbs']
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/templates/*.hbs'],
        tasks: ['handlebars'],
        options: {
          spawn: false
        }
      }
    },
    uglify: {
      my_target: {
        options: {
          mangle : false
        },
        files: {
          'js/helper/helpers.min.js': 'js/helper/helpers.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};