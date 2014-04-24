module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                "Gruntfile.js",
                "package.json",
                "bower.json",
                ".jscs.json",
                ".jshintrc",
            ]
        },
        jscs: {
            src: [
                "Gruntfile.js"
            ]
        },
        sass: {                              
          dist: {                           
            options: {                       
              style: 'expanded',
              compass: true,
              bundleExec: true
            },
            files: {
              'build/assets/css/styles.css': 'lib/scss/styles.scss'   
            }
          }
        },
        clean: {
            build: [ "build" ]
        },
        "sails-linker": {
            options: {
                appRoot: "build/",
                fileTmpl: "<script src=\"/%s\"></script>"
            },
            dev: {
                options: {
                    startTag: "<!-- APP SCRIPTS -->",
                    endTag: "<!-- APP SCRIPTS END -->"
                },
                files: {
                    "build/index.html": [
                        "build/vendor/jquery/dev/jquery.js",
                        "build/vendor/lodash/dev/lodash.js",
                        "build/vendor/angular/dev/angular.js",
                        "build/vendor/angular-route/dev/angular-route.js",
                        "build/vendor/restangular/dev/restangular.js",
                        "build/vendor/angular-xeditable/dev/xeditable.js",
                        "build/vendor/angular-sanitize/dev/angular-sanitize.js",
                        "build/assets/js/app.js"
                    ]
                }
            }
        },
        concat: {
            app: {
                src: [
                    "lib/js/app.js",
                    "lib/js/filters/*.js",
                    "lib/js/services/*.js",
                    "lib/js/directives/*.js",
                    "lib/js/controllers/*.js"
                ],
                dest: "build/assets/js/app.js"
            }
        },
        uglify: {
            app: {
                files: {
                    "build/assets/js/app.min.js": [
                        "build/assets/js/app.js"
                    ]
                }
            }
        },
        copy: {
            app: {
                files: [
                    {
                        src: "lib/index.html",
                        dest: "build/index.html"
                    },
                    {
                        src: "lib/partials/*",
                        dest: "build/partials/",
                        expand: true,
                        flatten: true
                    },
                    {
                        src: "lib/styles/*",
                        dest: "build/assets/css/",
                        expand: true,
                        flatten: true
                    },
                    {
                        src: "lib/templates/*",
                        dest: "build/templates/",
                        expand: true,
                        flatten: true
                    },
                    {
                      src: "lib/assets/images/*",
                      dest: "build/assets/images/",
                      expand: true,
                      flatten: true
                    }
                ]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: "./build/vendor",
                    layout: "byComponent"
                }
            }
        },
        watch: {
            options: {
              livereload: {
											port: 9000,
							}
            },
            app: {
                files: [
                    "lib/**/*.{js,html,scss}"
                ],
                tasks: [
                    "build:dev"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-sails-linker");
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask("default", [
        "jshint",
        "jscs",
        "build"
    ]);
    grunt.registerTask("build:internal", [
        "clean:build",
        "sass",
        "concat",
        "copy",
        "bower:install"
    ]);

    grunt.registerTask("build", [
        "build:internal",
        "sails-linker:dev"
    ]);

    grunt.registerTask("build:dev", [
        "build:internal",
        "sails-linker:dev"
    ]);
};
