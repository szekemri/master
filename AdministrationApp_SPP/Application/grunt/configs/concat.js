/**
 * Created by razvant on 08.09.2016.
 */
'use strict';

module.exports = {
  scss: {
    src: ['<%= yeoman.app %>/styles/scss/general.scss',
      '<%= yeoman.app %>/scripts/**/*.scss',
      '!<%= yeoman.app %>/styles/scss/_*.scss', //FIXME remove
      '!<%= yeoman.app %>/styles/scss/admin-all.scss' //FIXME remove
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
