/**
 * Created by razvant on 09.09.2016.
 */
'use strict';

module.exports = function (grunt) {
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect',
      'watch'
    ]);
  });
};
