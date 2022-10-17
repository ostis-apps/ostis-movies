filmawardComponent = {
    ext_lang: 'filmaward_code',
    formats: ['format_filmaward'],
    struct_support: true,

    factory: function (sandbox) {
        return new filmawardWindow(sandbox);
    }
};

filmawardWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_filmaward_text_component', 'ui_filmaward_search_component', 'ui_filmaward_answer_button',
    'ui_filmaward_info_block'];

    const textComponent = '#filmaward-' + sandbox.container + " #text-component";
    const searchComponent = '#filmaward-' + sandbox.container + " #search-component";
    const answerButton = '#filmaward-' + sandbox.container + " #answer-button";
    const infoBlock = '#filmaward-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="filmaward-' + sandbox.container + '"></div>');

    $('#filmaward-' + sandbox.container).load('static/components/html/filmaward.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
		makeFileText();

          });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(key_nodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_filmaward_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_filmaward_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_filmaward_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_filmaward_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }

   function makeFileText() {

	   let nameRu = document.getElementById("name_ru").value
	   let nameEn = document.getElementById("name_en").value

	   // add identifiers
	   let identifier = 'concept_film_award_' + nameEn.replace(/ /g, '_').toLowerCase()

	   let person = identifier + '\n\t<- sc_node_not_relation;\n'
	   person += '\t<-' + document.getElementById("type").value + ';\n\n'

	   person += '=> nrel_main_idtf:[кинопремия ' + nameRu + '] (* <- lang_ru;; *);\n' +
		 		 '=> nrel_idtf:[film award ' + nameEn + '] (* <- lang_en;; *);\n' +
		 		 '=> nrel_idtf:[' + nameEn + '] (* <- lang_en;; *);\n\n'

	   // add description
	   let descriptionRu = document.querySelector("#description_ru").value
	   let descriptionEn = document.querySelector("#description_en").value

	   person += '<- rrel_key_sc_element:...\n(*\n\t <- definition;;\n\t=> nrel_main_idtf:\n\t\t[Высказывание (кинопремия ' +
		         nameRu + ')] (* <- lang_ru;; *);\n\t\t[Statement(film award ' + nameEn +
		         ')](* <- lang_en;; *);; \n\t<= nrel_sc_text_translation:... \n\t\t(*\n'

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameRu +
		         "</sc_element></b> — " + descriptionRu + "](* <- lang_ru;; => nrel_format: format_html;;*);;\n"

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameEn +
		         "</sc_element></b> — " + descriptionEn + "](* <- lang_en;; => nrel_format: format_html;;*);;\n\t\t*);;\n*);\n\n"


	   // Make nomination:
	   person += '<-concept_film_award;\n=>nrel_monination:{\n'

	   let isFilm = document.querySelector("#Oskar_Nomination_Best_Motion")
	   if (isFilm.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Motion;\n'
	   }

	   let isSeries = document.querySelector("#Oskar_Nomination_Best_Director")
	   if (isSeries.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Director;\n'
	   }

	   let isTVSeries = document.querySelector("#Oskar_Nomination_Best_Actor_in_a_Leading_Role")
	   if (isTVSeries.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Actor_in_a_Leading_Role;\n'
	   }

	   let isAnime = document.querySelector("#Oskar_Nomination_Best_Actor_in_a_Supporting_Role")
	   if (isAnime.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Actor_in_a_Supporting_Role;\n'
	   }

	   let isWebSeries = document.querySelector("#Oskar_Nomination_Best_Actress_in_a_Leading_Role")
	   if (isWebSeries.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Actress_in_a_Leading_Role;\n'
	   }

	   let isOriginalSeries = document.querySelector("#Oskar_Nomination_Best_Actress_in_a_Supporting_Role")
	   if (isOriginalSeries.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Actress_in_a_Supporting_Role;\n'
	   }

	   let isCartoon = document.querySelector("#Oskar_Nomination_Best_Original_Screenplay")
	   if (isCartoon.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Original_Screenplay;\n'
	   }

	   let isDocumentary = document.querySelector("#Oskar_Nomination_Best_Adapted_Screenplay")
	   if (isDocumentary.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Adapted_Screenplay;\n'
	   }

	   let isFullLengthFilm = document.querySelector("#Oskar_Nomination_Best_Animated_Feature")
	   if (isFullLengthFilm.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Animated_Feature;\n'
	   }

	   let isMicrofilm = document.querySelector("#Oskar_Nomination_Best_Foreign_Language_Film")
	   if (isMicrofilm.checked) {
	   	person += '\tconcept_Oskar_Nomination_Best_Foreign_Language_Film;\n'
	   }

	   person = person.slice(0, person.length - 2);

	   person += '\n};;\n\n'

	   // add country
	   let countryRu = document.getElementById("country_ru").value
	   let countryEn = document.getElementById("country_en").value

	   person += countryEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + countryRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + countryEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_take_place:' + countryEn + ';;\n\n'

	   // website
	   let website = document.getElementById("official_website_en").value
	   person += identifier + '=>nrel_site:[' + website + '](* <- lang_en;; *);;\n\n'


	   // foundation year
	   let foundationYear = document.getElementById("foundation_year").value

	   person += 'concept_calendar_date->' + foundationYear + ';;\n' +
			       identifier + '=>nrel_foundation_year: ' + foundationYear + ';;\n' +
				   foundationYear + '=>nrel_main_idtf:[' + foundationYear + ' год](*<-lang_ru;;*);;\n' +
                   foundationYear + '=>nrel_main_idtf:[year of ' + foundationYear + '](*<-lang_en;;*);;\n\n'

	   
  	   // channel
	   let channel = document.getElementById("official_Broadcast_channel_en").value
	   person += identifier + '=>nrel_site:[' + channel + '](* <- lang_en;; *);;\n\n'


	   // make file name
	   let file = identifier + '.scs'

	   download(file, person)
	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

SCWeb.core.ComponentManager.appendComponentInitialize(filmawardComponent);
