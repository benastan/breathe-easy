module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.initConfig({
    browserify: {
      'default': {
        src: ['dist/breathe-easy.js'],
        dest: 'build/breathe-easy.js'
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
    compress: {
      'default': {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            src: 'build/breathe-easy.min.js',
            dest: 'build/breathe-easy.min.js',
            ext: ''
          }
        ]
      }
    },
    env: {
      test: {
        src: '.env'
      }
    },
    template: {
      test: {
        options: {
          data: function() {
            return {
              GITHUB_BASIC_AUTH: process.env.GITHUB_BASIC_AUTH
            };
          }
        },
        files: {
          'public/test.js': [ './test.js' ]
        }
      }
    },
    uglify: {
      'default': {
        src: ['build/breathe-easy.js'],
        dest: 'build/breathe-easy.min.js'
      }
    },
    watch: {
      foursquare: {
        files: ['src/**/*.coffee', 'test.js', 'public/**/*'],
        tasks: ['default', 'test']
      }
    }
  });
  grunt.registerTask(
    'default',
    [
      'coffee:default',
      'browserify:default',
      'uglify:default',
      'compress:default'
    ]
  );

  grunt.registerTask(
    'test',
    [
      'env:test',
      'template:test'
    ]
  );
};
