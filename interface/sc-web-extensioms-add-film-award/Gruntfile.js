module.exports = function (grunt) {
    const filmawardDirPath = './filmaward/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            filmaward: {
                src: [filmawardDirPath + 'src/*.js'],
                dest: filmawardDirPath + 'static/js/filmaward.js'
            },
        },
        copy: {
            filmawardJs: {
                cwd: filmawardDirPath + 'static/js/',
                src: 'filmaward.js',
                dest: clientJsDirPath + 'filmaward/',
                expand: true,
                flatten: true
            },
            filmawardCss: {
                cwd: filmawardDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            filmawardHtml: {
                cwd: filmawardDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            filmawardImg: {
                cwd: filmawardDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'filmaward/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            filmawardJs: {
                files: filmawardDirPath + 'src/**',
                tasks: ['concat:filmaward', 'copy:filmawardJs'],
            },
            filmawardCss: {
                files: filmawardDirPath + 'static/css/**',
                tasks: ['copy:filmawardCss'],
            },
            filmawardHtml: {
                files: [filmawardDirPath + 'static/html/**'],
                tasks: ['copy:filmawardHtml'],
            },
            filmawardImg: {
                files: [filmawardDirPath + 'static/images/**'],
                tasks: ['copy:filmawardImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
