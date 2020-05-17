SearchCartoonsByCountryAndAgeLimit = {
    ext_lang: 'search_cartoons_by_country_and_age_limit_code',
    formats: ['format_search_cartoons_by_country_and_age_limit_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setSearchCartoonsByCountryAndAgeLimitViewerWindow(sandbox);
    }
};

var setSearchCartoonsByCountryAndAgeLimitViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputAge = '#series-tools-' + sandbox.container + " #series_age-input"

    var inputCountry = '#series-tools-' + sandbox.container + " #series_country-input"

    var buttonFind = '#series-tools-' + sandbox.container + " #button-find-series";

    var keynodes = ['ui_search_cartoons_by_country_and_age_limit_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/search_cartoons_by_country_and_age_limit_component.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonSearch = idf[keynodes['ui_search_cartoons_by_country_and_age_limit_in_memory']];

                $(buttonFind).html(buttonSearch);
                $(buttonFind).click(function () {
                    var ageString = $(inputAge).val();

                    var countryString = $(inputCountry).val();
                    
                    console.log("ageString " + ageString);
                    console.log("countryString " + countryString);

                    if (ageString && countryString) {
                        var searchParams = {
                            age: ageString.toString(),
                            country: countryString.toString()
                        };

                        findCartoonsByCountryAndAgeLimit(searchParams);
                    }
                });
            });
        });
    });

    this.applyTranslation = function (namesMap) {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonLoad = idf[keynodes['ui_search_cartoons_by_country_and_age_limit_in_memory']];

                $(buttonFind).html(buttonLoad);
            });
        });
    };
    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(SearchCartoonsByCountryAndAgeLimit);

function findCartoonsByCountryAndAgeLimit(searchParams) {
    console.log(searchParams);
    
    SCWeb.core.Server.resolveScAddr([searchParams.age, searchParams.country], function (keynodes) {
        //addr = 'Project_1';
        addr1 = keynodes[searchParams.age];
        addr2 = keynodes[searchParams.country];
        console.log("addr1", addr1);
        console.log("addr2", addr2);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        if (!addr1 && !addr2){
            return;
        }
        // Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
        SCWeb.core.Server.resolveScAddr(["ui_menu_file_for_finding_cartoons_by_country_and_age_limit"], function (data) {
            // Get command of ui_menu_view_full_semantic_neighborhood
            var cmd = data["ui_menu_file_for_finding_cartoons_by_country_and_age_limit"];
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
