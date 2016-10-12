/**
 * Created by razvant on 09.09.2016.
 * The actual grunt server settings
 */
'use strict';

module.exports = {
  options: {
    port: 9000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: 'localhost'
  },
  test: {
    options: {
      port: 9001,
      middleware: function (connect) {
        return [
          connect.static('.tmp'),
          connect.static('test'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect.static(appConfig.app)
        ];
      }
    }
  },
  dist: {
    options: {
      open: true,
      base: '<%= yeoman.dist %>'
    }
  }
};
