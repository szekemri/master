/**
 * Created by razvant on 09.09.2016.
 * Add vendor prefixed styles
 */
'use strict';

module.exports = {
  options: {
    processors: [
      require('autoprefixer')({
        browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'ie >= 9', 'last 2 Safari versions', 'last 2 Edge versions']
      }),
      require('cssnano')({
        options: {
          safe: true
        }
      })
    ],
    map: true
  },
  dist: {
    src: '<%= yeoman.app %>/styles/admin-all.css'
  }
};
