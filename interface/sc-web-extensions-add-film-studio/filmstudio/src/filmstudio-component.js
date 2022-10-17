filmstudioComponent = {
    ext_lang: 'filmstudio_code',
    formats: ['format_filmstudio'],
    struct_support: true,

    factory: function (sandbox) {
        return new filmstudioWindow(sandbox);
    }
};

filmstudioWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_filmstudio_text_component', 'ui_filmstudio_search_component', 'ui_filmstudio_answer_button',
    'ui_filmstudio_info_block'];

    const textComponent = '#filmstudio-' + sandbox.container + " #text-component";
    const searchComponent = '#filmstudio-' + sandbox.container + " #search-component";
    const answerButton = '#filmstudio-' + sandbox.container + " #answer-button";
    const infoBlock = '#filmstudio-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="filmstudio-' + sandbox.container + '"></div>');

    $('#filmstudio-' + sandbox.container).load('static/components/html/filmstudio.html', function () {
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
                let textComponentScAddr = keynodes['ui_filmstudio_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_filmstudio_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_filmstudio_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_filmstudio_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }

   function makeFileText() {

	   let nameRu = document.getElementById("name_ru").value
	   let nameEn = document.getElementById("name_en").value

	   // add identifiers
	   let identifier = 'concept_film_studio_' + nameEn.replace(/ /g, '_').toLowerCase()

	   let person = identifier + '\n\t<- sc_node_not_relation;\n'
	   person += '\t<-' + document.getElementById("type").value + ';\n\n'

	   person += '=> nrel_main_idtf:[киностудия ' + nameRu + '] (* <- lang_ru;; *);\n' +
		 		 '=> nrel_idtf:[film studio ' + nameEn + '] (* <- lang_en;; *);\n' +
		 		 '=> nrel_idtf:[' + nameEn + '] (* <- lang_en;; *);\n\n'

	   // add description
	   let descriptionRu = document.querySelector("#description_ru").value
	   let descriptionEn = document.querySelector("#description_en").value

	   person += '<- rrel_key_sc_element:...\n(*\n\t <- definition;;\n\t=> nrel_main_idtf:\n\t\t[Высказывание (киностудия ' +
		         nameRu + ')] (* <- lang_ru;; *);\n\t\t[Statement(film studio ' + nameEn +
		         ')](* <- lang_en;; *);; \n\t<= nrel_sc_text_translation:... \n\t\t(*\n'

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameRu +
		         "</sc_element></b> — " + descriptionRu + "](* <- lang_ru;; => nrel_format: format_html;;*);;\n"

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameEn +
		         "</sc_element></b> — " + descriptionEn + "](* <- lang_en;; => nrel_format: format_html;;*);;\n\t\t*);;\n*);\n\n"


	   // Make artworks:
	   person += '<-concept_film_studio;\n=>nrel_fabricate:{\n'

	   let isFilm = document.querySelector("#film")
	   if (isFilm.checked) {
	   	person += '\tconcept_film;\n'
	   }

	   let isSeries = document.querySelector("#series")
	   if (isSeries.checked) {
	   	person += '\tconcept_series;\n'
	   }

	   let isTVSeries = document.querySelector("#TV_series")
	   if (isTVSeries.checked) {
	   	person += '\tconcept_TV_series;\n'
	   }

	   let isAnime = document.querySelector("#anime")
	   if (isAnime.checked) {
	   	person += '\tconcept_anime;\n'
	   }

	   let isWebSeries = document.querySelector("#web_series")
	   if (isWebSeries.checked) {
	   	person += '\tconcept_web_series;\n'
	   }

	   let isOriginalSeries = document.querySelector("#original_series")
	   if (isOriginalSeries.checked) {
	   	person += '\tconcept_original_series;\n'
	   }

	   let isCartoon = document.querySelector("#cartoon")
	   if (isCartoon.checked) {
	   	person += '\tconcept_cartoon;\n'
	   }

	   let isDocumentary = document.querySelector("#documentary_film")
	   if (isDocumentary.checked) {
	   	person += '\tconcept_documentary_film;\n'
	   }

	   let isFullLengthFilm = document.querySelector("#full_length_film")
	   if (isFullLengthFilm.checked) {
	   	person += '\tconcept_full_length_film;\n'
	   }

	   let isMicrofilm = document.querySelector("#microfilm")
	   if (isMicrofilm.checked) {
	   	person += '\tconcept_microfilm;\n'
	   }

	   let isShortFilm = document.querySelector("#short_film")
	   if (isShortFilm.checked) {
	   	person += '\tconcept_short_film;\n'
	   }

	   let isMusicalFilm = document.querySelector("#musical_film")
	   if (isMusicalFilm.checked) {
	   	person += '\tconcept_musical_film;\n'
	   }

	   let isSilentFilm = document.querySelector("#silent_film")
	   if (isSilentFilm.checked) {
	   	person += '\tconcept_silent_film;\n'
	   }

	   let isArthouse = document.querySelector("#arthouse")
	   if (isArthouse.checked) {
	   	person += '\tconcept_arthouse;\n'
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

	   // budget
	   let budget = document.getElementById("budget").value

       person += identifier + '=>nrel_budget:[' + budget + '$](* <-lang_en;; *);;\n\n';

	   // stuff number
	   let stuffNumber = document.getElementById("stuff_number").value
	   person += identifier + '=>nrel_stuff_number:' + stuffNumber + ';;\n\n'

	   // add chief
	   // NAME.replace(/ /g, '_').toLowerCase()
	   let ruCreatorFio = document.getElementById("fio_creator_ru").value
	   let enCreatorFio = document.getElementById("fio_creator_en").value
	   let creatorIdentifier = enCreatorFio.replace(/ /g, '_').toLowerCase()

	   person += identifier + '<=nrel_responsobility_zone:' + enCreatorFio.replace(/ /g, '_').toLowerCase() + ';;\n\n'

	   person += creatorIdentifier + ' <-concept_human;\n=> nrel_main_idtf:\n[' + ruCreatorFio +
		         '] (* <-lang_ru;; *);\n[' + enCreatorFio + '] (* <-lang_en;; *);;\n\n'

	   // add chief
	   let ruChiefFIO = document.getElementById("chief_ru").value
	   let enChiefFIO = document.getElementById("chief_en").value
	   let chiefIdentifier = enChiefFIO.replace(/ /g, '_').toLowerCase()

	   person += identifier + '<=nrel_responsobility_zone:' + enChiefFIO.replace(/ /g, '_').toLowerCase() + ';;\n\n'

	   person += chiefIdentifier + ' <-concept_human;\n=> nrel_main_idtf:\n[' + ruChiefFIO +
		       	 '] (* <-lang_ru;; *);\n[' + enChiefFIO + '] (* <-lang_en;; *);;\n\n'

	   // subsidiary company
		let subsidiaryCompanyRu = document.getElementById("subsidiary_company_ru").value
		let subsidiaryCompanyEn = document.getElementById("subsidiary_company_en").value
	   	let subsidiaryCompanyIdentifier = subsidiaryCompanyEn.replace(/ /g, '_').toLowerCase()

	   person += identifier + '=>nrel_subsidiary_company:' + subsidiaryCompanyIdentifier + ';;\n' +
		         subsidiaryCompanyIdentifier + '<-concept_company;\n=>nrel_main_idtf:[' + subsidiaryCompanyRu +
		         '] (* <-lang_ru;; *);\n[' + subsidiaryCompanyEn + '] (* <-lang_en;; *);;\n\n'


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

SCWeb.core.ComponentManager.appendComponentInitialize(filmstudioComponent);
