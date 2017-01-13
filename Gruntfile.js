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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};