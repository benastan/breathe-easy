module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.initConfig({
    watch: {
      foursquare: {
        files: ['src/**/*.coffee', 'test/**/*.js'],
        tasks: ['default']
      }
    },
    coffee: {
      'default': {
        expand: true,
        flatten: false,
        cwd: 'src',
        src: ['**/*.coffee'],
        dest: 'dist',
        ext: '.js'
      }
    },
    browserify: {
      'default': {
        src: ['dist/breathe-easy.js'],
        dest: 'build/breathe-easy.js',
        options: {
          external: [ 'breathe-easy' ]
        }
      },
      test: {
        src: ['test/**/*.js'],
        dest: 'build/test.js'
      }
    },
    uglify: {
      'default': {
        src: ['build/breathe-easy.js'],
        dest: 'build/breathe-easy.min.js'
      }
    },
    copy: {
      test: {
        files: [
          { src: [ 'build/test.js' ], dest: 'public/assets/javascripts/test.js' },
          { src: [ 'node_modules/mocha/mocha.js' ], dest: 'public/assets/javascripts/mocha.js' },
          { src: [ 'node_modules/chai/chai.js' ], dest: 'public/assets/javascripts/chai.js' },
          { src: [ 'node_modules/mocha/mocha.css' ], dest: 'public/assets/stylesheets/mocha.css' }
        ]
      }
    }
  });
  grunt.registerTask(
    'default',
    [
      'coffee:default',
      'browserify:default',
      'uglify:default'
    ]
  );
};
