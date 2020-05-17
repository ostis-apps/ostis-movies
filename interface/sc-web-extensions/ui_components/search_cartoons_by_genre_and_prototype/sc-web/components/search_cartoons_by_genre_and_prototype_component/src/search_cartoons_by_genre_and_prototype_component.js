SearchCartoonsByGenreAndPrototype = {
    ext_lang: 'search_cartoons_by_genre_and_prototype_code',
    formats: ['format_search_cartoons_by_genre_and_prototype_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setSearchCartoonsByGenreAndPrototypeViewerWindow(sandbox);
    }
};

var setSearchCartoonsByGenreAndPrototypeViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputGenre = '#series-tools-' + sandbox.container + " #series_genre-input"

    var inputPrototype = '#series-tools-' + sandbox.container + " #series_prototype-input"

    var buttonFind = '#series-tools-' + sandbox.container + " #button-find-series";

    var keynodes = ['ui_search_cartoons_by_genre_and_prototype_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/search_cartoons_by_genre_and_prototype_component.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonSearch = idf[keynodes['ui_search_cartoons_by_genre_and_prototype_in_memory']];

                $(buttonFind).html(buttonSearch);
                $(buttonFind).click(function () {
                    var genreString = $(inputGenre).val();

                    var prototypeString = $(inputPrototype).val();

                    console.log("Genre " + genreString);
                    console.log("Prototype " + prototypeString);

                    if (genreString && prototypeString) {
                        var searchParams = {
                            genre: genreString.toString(),
                            prototypeName: prototypeString.toString()
                        };

                        findCartoonsByGenreAndPrototype(searchParams);
                    }
                });
            });
        });
    });

    this.applyTranslation = function (namesMap) {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonLoad = idf[keynodes['ui_search_cartoons_by_genre_and_prototype_in_memory']];

                $(buttonFind).html(buttonLoad);
            });
        });
    };
    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(SearchCartoonsByGenreAndPrototype);

function findCartoonsByGenreAndPrototype(searchParams) {
    console.log(searchParams);
    
    SCWeb.core.Server.resolveScAddr([searchParams.genre, searchParams.prototypeName], function (keynodes) {
        //addr = 'Project_1';
        addr1 = keynodes[searchParams.genre];
        addr2 = keynodes[searchParams.prototypeName];
        console.log("addr1", addr1);
        console.log("addr2", addr2);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        if (!addr1 && !addr2){
            return;
        }
        // Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
        SCWeb.core.Server.resolveScAddr(["ui_menu_file_for_finding_cartoon_by_genre_and_prototype"], function (data) {
            // Get command of ui_menu_view_full_semantic_neighborhood
            var cmd = data["ui_menu_file_for_finding_cartoon_by_genre_and_prototype"];
            console.log("cmd", cmd);
            // Simulate click on ui_menu_view_full_semantic_neighborhood button
            SCWeb.core.Main.doCommand(cmd, [addr1, addr2], function (result) {
                // waiting for result
                if (result.question != undefined) {
                    // append in history
                    consonle.log(result.question);
                    SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                }
            });
        });
    });
}
