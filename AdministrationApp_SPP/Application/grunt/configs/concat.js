/**
 * Created by razvant on 08.09.2016.
 */
'use strict';

module.exports = {
  scss: {
    src: ['<%= yeoman.app %>/styles/scss/general.scss',
      '<%= yeoman.app %>/scripts/**/*.scss'
    ],
    dest: '<%= yeoman.app %>/styles/scss/admin-all.scss'
  },
  options: {
    process: function (src, filepath) {
      return '// Source: ' + filepath + '\n' + src;
    },
    separator: '\n'
  }
};
