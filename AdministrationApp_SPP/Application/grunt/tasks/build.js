/**
 * Created by razvant on 09.09.2016.
 */
'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    // 'eslint',
    'useminPrepare',
    'concurrent:dist',
    'ngtemplates',
    'concat',
    'sass',
    'postcss',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
};
