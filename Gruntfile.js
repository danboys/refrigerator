module.exports = function(grunt) {

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
          'js/templates/sample.js': 'js/templates/*.hbs'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};