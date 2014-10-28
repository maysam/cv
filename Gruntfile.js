module.exports = function(grunt) {

    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
        // Configuration for concatinating files goes here.
          dist: {
              src: [
                  '_src/js/*.js', // All JS in the libs folder
              ],
              dest: '_dest/js/script.js',
          }
        },
        uglify: {
        // Minifiy JS
            build: {
                src: '_dest/js/script.js',
                dest: '_dest/js/script.min.js'
            }
        },
        imagemin: {
        // Compress images
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '_src/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },
        // Compile SASS
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '_dest/css/style.css': '_src/css/style.scss'
                }
	          }
	      },
	      // Remove redundant CSS
	      uncss: {
				  dist: {
				    files: {
				      '_dest/css/style.css': ['index.html']
				    }
				  }
				},
				// Prettify HTML files
				prettify: {
				   options: {
				    indent: 2,
				    indent_char: ' ',
				    wrap_line_length: 78,
				    brace_style: 'expand',
				    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
				  },
				    all: {
					    expand: true,
					    cwd: '_src',
					    ext: '.html',
					    src: ['*.html'],
					    dest: ''
					  },
				},
				// Tidy up SASS files
			  prettysass: {
			    options: {
			      alphabetize: true
			    },
			    app: {
			      src: ['_src/css/**/*.scss']
			    },
			  },
			  // Auto-prefix unsupported rules
		    autoprefixer: {
			    multiple_files: {
			      expand: true,
			      flatten: true,
			      src: '_src/css/*.css', // -> src/css/file1.css, src/css/file2.css
			      dest: '_dest/css/' // -> dest/css/file1.css, dest/css/file2.css
			    }
				},
        // Watch for new files
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
              tasks: ['sass', 'uncss'],
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
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-prettysass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 8. Register all the tasks.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin', 'watch', 'shell', 'uncss']);

};
