module.exports = function (grunt) {
    const filmportalDirPath = './filmportal/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            filmportal: {
                src: [filmportalDirPath + 'src/*.js'],
                dest: filmportalDirPath + 'static/js/filmportal.js'
            },
        },
        copy: {
            filmportalJs: {
                cwd: filmportalDirPath + 'static/js/',
                src: 'filmportal.js',
                dest: clientJsDirPath + 'filmportal/',
                expand: true,
                flatten: true
            },
            filmportalCss: {
                cwd: filmportalDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            filmportalHtml: {
                cwd: filmportalDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            filmportalImg: {
                cwd: filmportalDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'filmportal/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            filmportalJs: {
                files: filmportalDirPath + 'src/**',
                tasks: ['concat:filmportal', 'copy:filmportalJs'],
            },
            filmportalCss: {
                files: filmportalDirPath + 'static/css/**',
                tasks: ['copy:filmportalCss'],
            },
            filmportalHtml: {
                files: [filmportalDirPath + 'static/html/**'],
                tasks: ['copy:filmportalHtml'],
            },
            filmportalImg: {
                files: [filmportalDirPath + 'static/images/**'],
                tasks: ['copy:filmportalImg'],
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
