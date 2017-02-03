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
    },
    imagemin: {                          // Task
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 1
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    ttf2woff: {
      default: {
        src: ['fonts/*.ttf'],
        dest: 'fonts/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ttf2woff');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};