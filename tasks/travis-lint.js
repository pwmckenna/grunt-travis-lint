'use strict';

var lint = require('travis-lint');

module.exports = function (grunt) {
    grunt.registerTask('travis-lint', 'Lint .travis.yml', function () {
        var yml = grunt.file.read('.travis.yml', {
            encoding: null
        });
        if (yml.length === 0) {
            return grunt.warn('.travis.yml is empty');
        }
        var done = this.async();
        lint(yml, function (err, res) {
            if (err) { return done(err); }
            if (res.length) {
                for (var i = 0; i < res.length; ++i) {
                    grunt.warn(res[i].message);
                }
                done(new Error('.travis.yml contains lint'));
            } else {
                grunt.log.ok('.travis.yml is lint free');
                done();
            }
        });
    });
};