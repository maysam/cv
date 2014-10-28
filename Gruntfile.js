module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
        // 2. Configuration for concatinating files goes here.
          dist: {
              src: [
                  '_src/js/*.js', // All JS in the libs folder
              ],
              dest: '_dest/js/script.js',
          }
        },
        uglify: {
        // 3. Minifiy JS
            build: {
                src: '_dest/js/script.js',
                dest: '_dest/js/script.min.js'
            }
        },
        imagemin: {
        // 4. Compress images
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images_final/'
                }]
            }
        },
        // 5. Compile SASS
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '_dest/css/style.css': '_src/css/style.scss'
                }
            }
        },
        // 6. Watch for new files
        watch: {
           options: {
                livereload: true
            },
            scripts: {
                files: ['_src/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
              files: ['_src/css/*.scss'],
              tasks: ['sass'],
              options: {
                  spawn: false,
              }
            }
        }
    });


    // 7. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-shell');

    // 8. Register all the tasks.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch', 'shell']);

};
