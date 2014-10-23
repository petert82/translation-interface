module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          "web/css/style.css": "src/css/style.less"
        }
      },
      production: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "web/css/style.min.css": "src/css/style.less"
        }
      }
    },
    concat: {
        options: {
          separator: ";\n"
        },
        javascript:{
            src:[
                  'src/js/*.js', // app.js
                  'src/js/common/CommonModule.js',
                  'src/js/common/**/*.js',
                  'src/js/domain/DomainModule.js',
                  'src/js/domain/**/*.js',
                  'src/js/language/LanguageModule.js',
                  'src/js/language/**/*.js',
                  'src/js/string/StringModule.js',
                  'src/js/string/**/*.js',
                  'src/js/translation/TranslationModule.js',
                  'src/js/translation/**/*.js'
            ],
            dest: 'web/js/script.js'
        }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        javascript: {
            files: {
              'web/js/script.min.js': ['<%= concat.javascript.dest %>']
            }
        }
    },
    watch: {
      less: {
        files: ['src/css/**/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['<%= concat.javascript.src %>'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less','concat','uglify']);

};