module.exports = function (grunt) {
    const cartoonDirPath = './cartoon/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            cartoon: {
                src: [cartoonDirPath + 'src/*.js'],
                dest: cartoonDirPath + 'static/js/cartoon.js'
            },
        },
        copy: {
            cartoonJs: {
                cwd: cartoonDirPath + 'static/js/',
                src: 'cartoon.js',
                dest: clientJsDirPath + 'cartoon/',
                expand: true,
                flatten: true
            },
            cartoonCss: {
                cwd: cartoonDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            cartoonHtml: {
                cwd: cartoonDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            cartoonImg: {
                cwd: cartoonDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'cartoon/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            cartoonJs: {
                files: cartoonDirPath + 'src/**',
                tasks: ['concat:cartoon', 'copy:cartoonJs'],
            },
            cartoonCss: {
                files: cartoonDirPath + 'static/css/**',
                tasks: ['copy:cartoonCss'],
            },
            cartoonHtml: {
                files: [cartoonDirPath + 'static/html/**'],
                tasks: ['copy:cartoonHtml'],
            },
            cartoonImg: {
                files: [cartoonDirPath + 'static/images/**'],
                tasks: ['copy:cartoonImg'],
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
