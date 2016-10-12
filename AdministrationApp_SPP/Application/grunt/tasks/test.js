/**
 * Created by razvant on 09.09.2016.
 */
'use strict';

module.exports = function (grunt) {
  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);
};
