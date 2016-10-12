/**
 * Created by razvant on 09.09.2016.
 */
'use strict';

module.exports = {
  dist: {
    options: {
      module: 'invoicing',
      htmlmin: '<%= htmlmin.dist.options %>',
      usemin: 'scripts/scripts.js'
    },
    cwd: '<%= yeoman.app %>',
    src: ['scripts/**/*.html'],
    dest: '.tmp/templateCache.js'
  }
};
