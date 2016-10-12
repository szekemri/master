/**
 * Created by razvant on 09.09.2016.
 * Run some tasks in parallel to speed up the build process
 */
'use strict';

module.exports = {
  server: [
    'copy:styles'
  ],
  test: [
    'copy:styles'
  ],
  dist: [
    'copy:styles',
    'imagemin',
    'svgmin'
  ]
};
