module.exports = function(grunt) {
    var fs = require('fs');
    var path = require('path');
    var extend = require('util')._extend;

    var parameters = null;
    if(fs.existsSync(__dirname + '/Gruntfile.parameters.js')) {
        parameters = require(__dirname + '/Gruntfile.parameters.js');
    }
    parameters = parameters || {};
    grunt.option.flags().forEach(function(p) {
        var m = /^--(.+?)=(.+)$/.exec(p);
        if(m) {
            parameters[m[1]] = m[2];
        }
    });

    var config = {};

    config.DIR_REL = ('DIR_REL' in parameters) ? parameters.DIR_REL : '';
    config.DIR_BASE = ('DIR_BASE' in parameters) ? parameters.DIR_BASE : path.join(__dirname, '..');

    // Options for the tool that will merge the files
    var concatOptions = {
        separator: ''
    };

    // List of the files to be merged
    var concat = {
        image_editor: {
            beforeJS: true,
            dest: '<%= DIR_BASE %>/concrete/js/build/core/image-editor/image-editor.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/_start.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/kinetic.prototype.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/imageeditor.js',
                //'<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/history.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/events.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/elements.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/controls.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/save.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/extend.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/background.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/imagestage.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/image.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/actions.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/slideOut.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/jquerybinding.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/filters.js',
                '<%= DIR_BASE %>/concrete/js/build/core/image-editor/build/_end.js',
            ]
        }
    };

    // Options for the generation of JavaScripts. See https://github.com/gruntjs/grunt-contrib-uglify
    var jsOptions = {
        mangle: true,
        beautify: false,
        report: 'min',
        preserveComments: false,
        banner: '',
        footer: ''
    };

    // List of the JavaScripts to be generated
    var js = {

        redactor: {
            dest: '<%= DIR_BASE %>/concrete/js/redactor.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/vendor/redactor/redactor.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/redactor/fontcolor.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/redactor/fontfamily.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/redactor/fontsize.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/redactor/table.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/undoredo.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/lightbox.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/underline.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/inline.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/magic.js',
                '<%= DIR_BASE %>/concrete/js/build/core/redactor/specialcharacters.js'
            ]
        },

        ccm_app: {
            dest: '<%= DIR_BASE %>/concrete/js/app.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/vendor/pnotify/pnotify.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/json.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-form/jquery-form.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-mousewheel/jquery.mousewheel.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/concrete5.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-liveupdate/jquery-liveupdate.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/autosize/autosize.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-pep/jquery-pep.js',
                //needs some handholding
                // '<%= DIR_BASE %>/concrete/js/build/vendor/retinajs/retinajs.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/base.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/ajax-request/base.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/ajax-request/form.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/ajax-request/block.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-cookie/jquery-cookie.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/panels.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/dialog.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/alert.js',
                '<%= DIR_BASE %>/concrete/js/build/core/editable-field/container.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/page-reindexing.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/in-context-menu.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-liveupdate/quicksilver.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/remote-marketplace.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/search/table.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/search/base.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/search/preset-selector.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/search/field-selector.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/progressive-operations.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/custom-style.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/tabs.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/toolbar.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-bootstrap-select-to-button/jquery-bootstrap-select-to-button.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/nprogress/nprogress.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/tourist/tourist.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/dialog.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/launcher.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guide-manager.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/toolbar.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/change-content.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/change-content-edit-mode.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/add-content.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/add-content-edit-mode.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/add-page.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/personalize.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/dashboard.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/help/guides/location-panel.js',
                // Edit Mode
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/editmode.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/block.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/stackdisplay.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/area.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/layout.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/dragarea.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/blocktype.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/stack.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/duplicateblock.js',
                '<%= DIR_BASE %>/concrete/js/build/core/app/edit-mode/stackblock.js',
                '<%= DIR_BASE %>/concrete/js/build/core/stacks/menu.js'
            ]
        },
        filemanager: {
            dest: '<%= DIR_BASE %>/concrete/js/file-manager.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/file-manager/search.js',
                '<%= DIR_BASE %>/concrete/js/build/core/file-manager/selector.js',
                '<%= DIR_BASE %>/concrete/js/build/core/file-manager/menu.js',
                '<%= DIR_BASE %>/concrete/js/build/core/file-manager/header.js'
            ]
        },

        express: {
            dest: '<%= DIR_BASE %>/concrete/js/express.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/express/search.js',
                '<%= DIR_BASE %>/concrete/js/build/core/express/selector.js'
            ]
        },


        select2: {
            dest: '<%= DIR_BASE %>/concrete/js/select2.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/select2/select2.js'
        },

        /**
         * Don't do this one: it doesn't work through Grunt. I had to include the min file from
         * the GitHub repository directly

        selectize: {
            dest: '<%= DIR_BASE %>/concrete/js/selectize.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/selectize/selectize.js'
        },
         */

        bootstrap_alert: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/alert.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/alert.js'
        },

        bootstrap_button: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/button.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/button.js'
        },

        bootstrap_dropdown: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/dropdown.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/dropdown.js'
        },

        bootstrap_popover: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/popover.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/popover.js'
        },

        bootstrap_tooltip: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/tooltip.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/tooltip.js'
        },

        bootstrap_collapse: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/collapse.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/collapse.js'
        },


        bootstrap_transition: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap/transition.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap/transition.js'
        },

        backbone: {
            dest: '<%= DIR_BASE %>/concrete/js/backbone.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/backbone/backbone.js'
        },

        underscore: {
            dest: '<%= DIR_BASE %>/concrete/js/underscore.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/underscore/underscore.js'
        },

        jquery_cookie: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-cookie.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-cookie/jquery-cookie.js'
        },

        jquery_tristate: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-tristate.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-tristate/jquery-tristate.js'
        },

        jquery_fileupload: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-fileupload.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image-ios.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image-orientation.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image-meta.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image-exif.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/load-image-exif-map.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/javascript-canvas-to-blob.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/javascript-canvas-to-blob.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/jquery-iframe-transport.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/jquery-fileupload.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/jquery-fileupload-process.js',
                '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fileupload/jquery-fileupload-image.js'
            ]
        },

        dropzone: {
            dest: '<%= DIR_BASE %>/concrete/js/dropzone.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/dropzone/dropzone.js'
        },

        core_composer: {
            dest: '<%= DIR_BASE %>/concrete/js/composer-save-coordinator.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/composer/save-coordinator.js'
        },

        jquery_form: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-form.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-form/jquery-form.js'
        },

        jquery_magnific_popup: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-magnific-popup.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-magnific-popup/jquery-magnific-popup.js'
        },

        core_lightbox: {
            dest: '<%= DIR_BASE %>/concrete/js/lightbox.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/lightbox.js'
        },

        spectrum: {
            dest: '<%= DIR_BASE %>/concrete/js/spectrum.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/spectrum/spectrum.js'
        },

        ccm_stylecustomizer: {
            dest: '<%= DIR_BASE %>/concrete/js/style-customizer.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/style-customizer/palette.js',
                '<%= DIR_BASE %>/concrete/js/build/core/style-customizer/image.js',
                '<%= DIR_BASE %>/concrete/js/build/core/style-customizer/size.js',
                '<%= DIR_BASE %>/concrete/js/build/core/style-customizer/typography.js',
                '<%= DIR_BASE %>/concrete/js/build/core/style-customizer/inline-toolbar.js'
            ]
        },

        kinetic: {
            dest: '<%= DIR_BASE %>/concrete/js/kinetic.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/kinetic/kinetic.js'
        },

        jquery_backstretch: {
            dest: '<%= DIR_BASE %>/concrete/js/backstretch.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/backstretch/backstretch.js'
        },

        ccm_events: {
            dest: '<%= DIR_BASE %>/concrete/js/events.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/events.js'
        },

        ccm_asset_loader: {
            dest: '<%= DIR_BASE %>/concrete/js/asset-loader.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/asset-loader.js'
        },

        ccm_sitemap: {
            dest: '<%= DIR_BASE %>/concrete/js/sitemap.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/sitemap/sitemap.js',
                '<%= DIR_BASE %>/concrete/js/build/core/sitemap/menu.js',
                '<%= DIR_BASE %>/concrete/js/build/core/sitemap/search.js',
                '<%= DIR_BASE %>/concrete/js/build/core/sitemap/selector.js',
                '<%= DIR_BASE %>/concrete/js/build/core/sitemap/sitemap-selector.js'
            ]
        },

        ccm_users: {
            dest: '<%= DIR_BASE %>/concrete/js/users.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/user/selector.js'
            ]
        },

        ccm_calendar_event: {
            dest: '<%= DIR_BASE %>/concrete/js/calendar/event-selector.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/calendar/event-selector.js',
            ]
        },

        ccm_calendar_admin: {
            dest: '<%= DIR_BASE %>/concrete/js/calendar/admin.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/calendar/admin.js',
                '<%= DIR_BASE %>/concrete/js/build/core/calendar/menu.js'
            ]
        },

        ccm_duration: {
            dest: '<%= DIR_BASE %>/concrete/js/duration.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/duration.js'
            ]
        },

        ccm_notification: {
            dest: '<%= DIR_BASE %>/concrete/js/notification.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/notification/notification.js'
            ]
        },


        ccm_tree: {
            dest: '<%= DIR_BASE %>/concrete/js/tree.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/tree.js'
        },

        ccm_layouts: {
            dest: '<%= DIR_BASE %>/concrete/js/layouts.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/layouts.js'
        },

        ccm_conversations: {
            dest: '<%= DIR_BASE %>/concrete/js/conversations.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/core/conversations/conversations.js',
                '<%= DIR_BASE %>/concrete/js/build/core/conversations/attachments.js'
            ]
        },

        bootstrap_editable: {
            dest: '<%= DIR_BASE %>/concrete/js/bootstrap-editable.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/vendor/bootstrap-editable/bootstrap3-editable.js',
                '<%= DIR_BASE %>/concrete/js/build/core/editable-field/attribute.js'
            ]
        },

        ccm_frontend_parallax_image: {
            dest: '<%= DIR_BASE %>/concrete/js/frontend/parallax-image.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/frontend/parallax-image.js'
        },

        ccm_frontend_thumbnail_builder: {
            dest: '<%= DIR_BASE %>/concrete/js/frontend/thumbnail-builder.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/frontend/thumbnail-builder.js'
        },

        ccm_gathering: {
            dest: '<%= DIR_BASE %>/concrete/js/gathering.js',
            src: [
                '<%= DIR_BASE %>/concrete/js/build/vendor/packery/packery.js',
                '<%= DIR_BASE %>/concrete/js/build/core/gathering.js'
            ]
        },

        ccm_dashboard: {
            dest: '<%= DIR_BASE %>/concrete/js/dashboard.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/dashboard.js'
        },
        ccm_awesome_rating: {
            dest: '<%= DIR_BASE %>/concrete/js/jquery-awesome-rating.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-awesome-rating/jquery-awesome-rating.js'
        },
        fancytree: {
            dest: '<%= DIR_BASE %>/concrete/js/fancytree.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-fancytree/jquery.fancytree-all.js'
        },
        account: {
            dest: '<%= DIR_BASE %>/concrete/js/account.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/account/account.js'
        },
        ccm_imageeditor: {
            dest: '<%= DIR_BASE %>/concrete/js/image-editor.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/image-editor/image-editor.js'
        },
        ccm_translator: {
            dest: '<%= DIR_BASE %>/concrete/js/translator.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/translator.js'
        },
        jquery_text_counter: {
            dest: '<%= DIR_BASE %>/concrete/js/textcounter.js',
            src: '<%= DIR_BASE %>/concrete/js/build/vendor/jquery-text-counter/textcounter.js'
        },
        ccm_country_stateprovince_link: {
            dest: '<%= DIR_BASE %>/concrete/js/country-stateprovince-link.js',
            src: '<%= DIR_BASE %>/concrete/js/build/core/country-stateprovince-link.js'
        }
    };

    // Options for the generation of the CSS files. See https://github.com/gruntjs/grunt-contrib-less
    var cssOptions = {
        ieCompat: true,
        optimization: null,
        strictImports: false,
        syncImport: false,
        dumpLineNumbers: false,
        relativeUrls: false,
        report: 'min'
    };

    // List of the CSS files to be generated
    // Note –bootstrap dies in here when attempting to be built with grunt css; something about
    // its minified syntax being included within the other app.less file. So if you need to build
    // bootstrap uncomment this, run grunt css:debug, get it working, then comment the line back out
    // and run grunt css
    var css = {
//        '<%= DIR_BASE %>/concrete/css/build/vendor/bootstrap/bootstrap.css': '<%= DIR_BASE %>/concrete/css/build/vendor/bootstrap/bootstrap.less',
        '<%= DIR_BASE %>/concrete/css/app.css': '<%= DIR_BASE %>/concrete/css/build/core/app/app.less',
        '<%= DIR_BASE %>/concrete/css/editable-fields.css': '<%= DIR_BASE %>/concrete/css/build/core/editable-fields.less',
        '<%= DIR_BASE %>/concrete/css/select2.css': '<%= DIR_BASE %>/concrete/css/build/core/select2.less',
        '<%= DIR_BASE %>/concrete/css/selectize.css': '<%= DIR_BASE %>/concrete/css/build/vendor/selectize/selectize.bootstrap3.less',
        '<%= DIR_BASE %>/concrete/css/dropzone.css': '<%= DIR_BASE %>/concrete/css/build/vendor/dropzone/dropzone.less',
        '<%= DIR_BASE %>/concrete/css/jquery-ui.css': '<%= DIR_BASE %>/concrete/css/build/vendor/jquery-ui/jquery-ui.less',
        '<%= DIR_BASE %>/concrete/css/jquery-magnific-popup.css': '<%= DIR_BASE %>/concrete/css/build/vendor/jquery-magnific-popup/jquery-magnific-popup.less',
        '<%= DIR_BASE %>/concrete/css/jquery-awesome-rating.css': '<%= DIR_BASE %>/concrete/css/build/vendor/jquery-awesome-rating/jquery-awesome-rating.less',
        '<%= DIR_BASE %>/concrete/themes/dashboard/main.css': '<%= DIR_BASE %>/concrete/css/build/themes/dashboard/main.less',
        '<%= DIR_BASE %>/concrete/css/style-customizer.css': '<%= DIR_BASE %>/concrete/css/build/core/style-customizer.less',
        '<%= DIR_BASE %>/concrete/css/font-awesome.css': '<%= DIR_BASE %>/concrete/css/build/vendor/font-awesome.less',
        '<%= DIR_BASE %>/concrete/css/views/install.css': '<%= DIR_BASE %>/concrete/css/build/views/install.less',
        '<%= DIR_BASE %>/concrete/themes/concrete/main.css': '<%= DIR_BASE %>/concrete/css/build/themes/concrete/main.less',
        '<%= DIR_BASE %>/concrete/css/spectrum.css': '<%= DIR_BASE %>/concrete/css/build/vendor/spectrum/spectrum.less',
        '<%= DIR_BASE %>/concrete/css/image-editor.css': '<%= DIR_BASE %>/concrete/css/build/core/image-editor/image-editor.less',
        '<%= DIR_BASE %>/concrete/css/account.css': '<%= DIR_BASE %>/concrete/css/build/core/account.less',
        '<%= DIR_BASE %>/concrete/css/fancytree.css': '<%= DIR_BASE %>/concrete/css/build/vendor/jquery-fancytree/fancytree-bootstrap.less',
        '<%= DIR_BASE %>/concrete/css/sitemap.css': '<%= DIR_BASE %>/concrete/css/build/core/sitemap.less',
        '<%= DIR_BASE %>/concrete/css/duration.css': '<%= DIR_BASE %>/concrete/css/build/core/date-time-duration.less',
        '<%= DIR_BASE %>/concrete/css/file-manager.css': '<%= DIR_BASE %>/concrete/css/build/core/file-manager.less',
        '<%= DIR_BASE %>/concrete/css/conversations.css': '<%= DIR_BASE %>/concrete/css/build/core/conversations.less',
        '<%= DIR_BASE %>/concrete/css/gathering/display.css': '<%= DIR_BASE %>/concrete/css/build/core/gathering/display.less',
        '<%= DIR_BASE %>/concrete/css/gathering/base.css': '<%= DIR_BASE %>/concrete/css/build/core/gathering/base.less',
        '<%= DIR_BASE %>/concrete/css/redactor.css': '<%= DIR_BASE %>/concrete/css/build/vendor/redactor/redactor.less',
        '<%= DIR_BASE %>/concrete/themes/elemental/css/bootstrap-modified.css': '<%= DIR_BASE %>/concrete/themes/elemental/css/build/bootstrap-3.2.0/bootstrap.less',
        '<%= DIR_BASE %>/concrete/css/frontend/pagination.css': '<%= DIR_BASE %>/concrete/css/build/core/frontend/pagination.less',
        '<%= DIR_BASE %>/concrete/css/translator.css': '<%= DIR_BASE %>/concrete/css/build/core/translator.less'
    };

    // Let's include the dependencies
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-newer');

    // Now let's build the final configuration for Grunt.

    // Let's define the concat section (for concatenating giles)
    config.concat = extend({options: concatOptions}, concat);

    // Let's define the uglify section (for generating JavaScripts)
    var jsTargets = {release: [], debug: []};
    for(var concatKey in concat) {
        if(concat[concatKey].beforeJS) {
            jsTargets.release.push('concat:' + concatKey);
            jsTargets.debug.push('newer:concat:' + concatKey);
        }
    }



    // Prepare env
    config.env = {
        dev: {
            NODE_ENV: 'development'
        },
        prod: {
            NODE_ENV: 'production'
        }
    };

    var configFactory = function(watch) {

        var config = require('laravel-mix/setup/webpack.config');

        return config;
    };

    // Prepare webpack configuration, the config needs to be loaded in at the very last second
    config.webpack = {
        prod: function() {
            console.log('building for prod');
            return configFactory();
        },
        dev: function() {
            return configFactory();
        },
        watch: function() {
            var config =  configFactory();
            config.watch = true;
            return config;
        }
    };

    config["webpack-dev-server"] = {
        dev: function() {
            var config = configFactory();
            return config;
        }
    }


    var watchJS = [];
    var watchCSS = [];

    config.uglify = {options: jsOptions};
    for(var key in js) {
        var target = {files: {}};
        target.files[js[key].dest] = js[key].src;

        var srcFile = js[key].src;
        if (typeof(srcFile) == 'string') {
            watchJS.push(srcFile);
        } else {
            for (i = 0; i < srcFile.length; i++) {
                watchJS.push(srcFile[i]);
            }
        }

        config.uglify[key + '_release'] = extend({options: {compress: {warnings: false}}}, target);

        jsTargets.release.push('uglify:' + key + '_release');
        target.options = {compress: {warnings: true}};
        target.options.mangle = false;
        target.options.sourceMap = true;
        config.uglify[key + '_debug'] = target;
        jsTargets.debug.push('newer:uglify:' + key + '_debug');
    }


    // Append webpack steps
    jsTargets.release.push('env:prod');
    jsTargets.release.push('webpack:prod');
    jsTargets.debug.push('env:dev');
    jsTargets.debug.push('webpack:dev');


    // Let's define the less section (for generating CSS files)
    config.less = {
        options: cssOptions,
        debug: {
            options: {
                compress: false,
                yuicompress: false
            },
            files: css
        },
        release: {
            options: {
                compress: true,
                yuicompress: true
            },
            files: css
        }
    };


    config.watch = {
        javascript: {
            files: watchJS,
            tasks: ['js:debug'],
            options: {
                livereload: true
            }
        },

        css: {
            files: '<%=DIR_BASE%>/concrete/css/**/*.less',
            tasks: ['css:debug'],
            options: {
                livereload: true
            }
        }
    };

    config.jshint = {
        options: {
        },
        all: [
            '<%=DIR_BASE%>/concrete/js/build/core/**/*.js',
            '!<%=DIR_BASE%>/concrete/js/build/core/image-editor/build/**/*.js',
            '!<%=DIR_BASE%>/concrete/js/build/core/app/json.js',
        ]
    };

    // Set Grunt tasks
    grunt.initConfig(config);

    grunt.registerTask('generate-constants', 'Generate Javascript Constants', function() {
        require('./tasks/generate-constants.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('gitskip-on:js', 'Force GIT to consider built JS assets as unchanged', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'js', true, this.async());
    });
    grunt.registerTask('gitskip-off:js', 'Allow GIT to consider built JS assets', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'js', false, this.async());
    });
    grunt.registerTask('gitskip-on:css', 'Force GIT to consider built CSS assets as unchanged', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'css', true, this.async());
    });
    grunt.registerTask('gitskip-off:css', 'Allow GIT to consider built CSS assets', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'css', false, this.async());
    });
    grunt.registerTask('gitskip-on', 'Force GIT to consider built CSS/JS assets as unchanged', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'all', true, this.async());
    });
    grunt.registerTask('gitskip-off', 'Allow GIT to consider built CSS/JS assets', function() {
        require('./tasks/git-skipper.js')(grunt, config, parameters, 'all', false, this.async());
    });

    grunt.registerTask('webpack:hot', 'Hot reload webpack build', [
        'env:dev',
        'webpack-dev-server:dev'
    ])

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('jsOnly:debug', jsTargets.debug);
    grunt.registerTask('jsOnly:release', jsTargets.release);

    //grunt.registerTask('js:debug', ['generate-constants', 'jsOnly:debug' ]);
    //grunt.registerTask('js:release', ['generate-constants', 'jsOnly:release' ]);
    grunt.registerTask('js:debug', ['jsOnly:debug', 'gitskip-on:js']);
    grunt.registerTask('js:release', ['jsOnly:release', 'gitskip-off:js']);
    grunt.registerTask('js', 'js:release');
    grunt.registerTask('js:check', ['concat:image_editor', 'jshint:all']);

    grunt.registerTask('css:debug', ['less:debug', 'gitskip-on:css']);
    grunt.registerTask('css:release', ['less:release', 'gitskip-off:css']);
    grunt.registerTask('css', 'css:release');

    grunt.registerTask('debug', ['js:debug', 'css:debug']);
    grunt.registerTask('release', ['js:release', 'css:release']);
    grunt.registerTask('debug', ['js:debug', 'css:debug']);

    grunt.registerTask('remove-short-tags', 'Remove short tags.', function() {
        require('./tasks/remove-short-tags.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-download', 'Build process: download the latest concrete5 release from GitHub.', function() {
        require('./tasks/build-release/download.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-build', 'Build process: compile the required files of a clean concrete5 installation.', function() {
        require('./tasks/build-release/build.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-clean', 'Build process: remove useless files and folders.', function() {
        require('./tasks/build-release/clean.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-remove-short-tags', 'Build process: remove short tags.', function() {
        require('./tasks/build-release/remove-short-tags.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-translations', 'Build process: downloading Translations.', function() {
        require('./tasks/build-release/translations.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-create-zip', 'Build process: create zip file.', function() {
        require('./tasks/build-release/create-zip.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask('build-release-cleanup', 'Build process: cleanup.', function() {
        require('./tasks/build-release/cleanup.js')(grunt, config, parameters, this.async());
    });

    grunt.registerTask(
        'build-release',
        [
            'build-release-download',
            'build-release-build',
            'build-release-clean',
            'build-release-remove-short-tags',
            //'build-release-translations',
            'build-release-create-zip',
            'build-release-cleanup'
        ]
    );

    grunt.registerTask('default', 'release');
};
