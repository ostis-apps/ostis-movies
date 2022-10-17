cartoonComponent = {
    ext_lang: 'cartoon_code',
    formats: ['format_cartoon'],
    struct_support: true,

    factory: function (sandbox) {
        return new cartoonWindow(sandbox);
    }
};

cartoonWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_cartoon_text_component', 'ui_cartoon_search_component', 'ui_cartoon_answer_button',
    'ui_cartoon_info_block'];

    const textComponent = '#cartoon-' + sandbox.container + " #text-component";
    const searchComponent = '#cartoon-' + sandbox.container + " #search-component";
    const answerButton = '#cartoon-' + sandbox.container + " #answer-button";
    const infoBlock = '#cartoon-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="cartoon-' + sandbox.container + '"></div>');

    $('#cartoon-' + sandbox.container).load('static/components/html/cartoon.html', function () {
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
                let textComponentScAddr = keynodes['ui_cartoon_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_cartoon_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_cartoon_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_cartoon_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }

   function makeFileText() {

	   let nameRu = document.getElementById("name_ru").value
	   let nameEn = document.getElementById("name_en").value

	   // add identifiers
	   let identifier = 'concept_cartoon_' + nameEn.replace(/ /g, '_').toLowerCase()
	   
	   // age rating 
	   let person = identifier + '\n\t<- sc_node_not_relation;\n'
	   person += '\t<-' + document.getElementById("type").value + ';\n\n'

	   person += '=> nrel_main_idtf:[мультфильм' + nameRu + '] (* <- lang_ru;; *);\n' +
		 		 '=> nrel_idtf:[cartoon ' + nameEn + '] (* <- lang_en;; *);\n' +
		 		 '=> nrel_idtf:[' + nameEn + '] (* <- lang_en;; *);\n\n'

	   // add description
	   let descriptionRu = document.querySelector("#description_ru").value
	   let descriptionEn = document.querySelector("#description_en").value

	   person += '<- rrel_key_sc_element:...\n(*\n\t <- definition;;\n\t=> nrel_main_idtf:\n\t\t[Высказывание (мультфильм ' +
		         nameRu + ')] (* <- lang_ru;; *);\n\t\t[Statement(cartoon ' + nameEn +
		         ')](* <- lang_en;; *);; \n\t<= nrel_sc_text_translation:... \n\t\t(*\n'

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameRu +
		         "</sc_element></b> — " + descriptionRu + "](* <- lang_ru;; => nrel_format: format_html;;*);;\n"

	   person += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameEn +
		         "</sc_element></b> — " + descriptionEn + "](* <- lang_en;; => nrel_format: format_html;;*);;\n\t\t*);;\n*);\n\n"


	   // Make keyword:
	   person += '<-concept_cartoon;\n=>nrel_keyword:{\n'

	   let isFa = document.querySelector("#family")
	   if (isFa.checked) {
	   	person += '\tconcept_family;\n'
	   }

	   let isM = document.querySelector("#magic")
	   if (isM.checked) {
	   	person += '\tconcept_magic;\n'
	   }

	   let isPr = document.querySelector("#princess")
	   if (isPr.checked) {
	   	person += '\tconcept_princess;\n'
	   }

	   let isD = document.querySelector("#dance")
	   if (isD.checked) {
	   	person += '\tconcept_dance;\n'
	   }

	   let isB = document.querySelector("#barbie")
	   if (isB.checked) {
	   	person += '\tconcept_barbie;\n'
	   }

	   let isF = document.querySelector("#friendship")
	   if (isF.checked) {
	   	person += '\tconcept_friendship;\n'
	   }


	   let isA = document.querySelector("#animals")
	   if (isA.checked) {
	   	person += '\tconcept_animals;\n'
	   }

	   let isS = document.querySelector("#songer")
	   if (isS.checked) {
	   	person += '\tconcept_songer;\n'
	   }

	   let isFas = document.querySelector("#fashion")
	   if (isFas.checked) {
	   	person += '\tconcept_fashion;\n'
	   }

	   let isW = document.querySelector("#war")
	   if (isW.checked) {
	   	person += '\tconcept_war;\n'
	   }
	   
	   let isCh = document.querySelector("#christmas")
	   if (isCh.checked) {
	   	person += '\tconcept_christmas;\n'
	   }
	   
	   let isC = document.querySelector("#castle")
	   if (isC.checked) {
	   	person += '\tconcept_castle;\n'
	   }
	   
	   let isP = document.querySelector("#puppies")
	   if (isP.checked) {
	   	person += '\tconcept_puppies;\n'
	   }
	   
	   let isT = document.querySelector("#trip")
	   if (isT.checked) {
	   	person += '\tconcept_trip;\n'
	   }
	   
	   person = person.slice(0, person.length - 2);

	   person += '\n};;\n\n'
	   
	   // foundation year
	   let foundationYear = document.getElementById("foundation_year").value

	   person += 'concept_calendar_date->' + foundationYear + ';;\n' +
			       identifier + '=>nrel_release_date: ' + foundationYear + ';;\n' +
				   foundationYear + '=>nrel_main_idtf:[' + foundationYear + ' год](*<-lang_ru;;*);;\n' +
                   foundationYear + '=>nrel_main_idtf:[year of ' + foundationYear + '](*<-lang_en;;*);;\n\n'	   

	   // critical rating
	   let criticRating = document.getElementById("critic_rating").value
	   person += identifier + '=>nrel_film_critic_rating: ' + criticRating + ';;\n\n'	
	   

	   // add company
	   let companyRu = document.getElementById("company_ru").value
	   let companyEn = document.getElementById("company_en").value

	   person += companyEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + companyRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + companyEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_film_company:' + companyEn + ';;\n\n'

	   // add country
	   let countryRu = document.getElementById("country_ru").value
	   let countryEn = document.getElementById("country_en").value

	   person += countryEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + countryRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + countryEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_take_place:' + countryEn + ';;\n\n'

	   // add tagline
	   let taglineRu = document.getElementById("tagline_ru").value
	   let taglineEn = document.getElementById("tagline_en").value

	   person += taglineEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + taglineRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + taglineEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_tagline_of_film:' + taglineEn + ';;\n\n'

	   // add film_director
	   let filmdirectorRu = document.getElementById("film_director_ru").value
	   let filmdirectorEn = document.getElementById("film_director_en").value

	   person += filmdirectorEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + filmdirectorRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + filmdirectorEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_film_director:' + filmdirectorEn + ';;\n\n'
	   
	   // add composer
	   let composerRu = document.getElementById("composer_ru").value
	   let composerEn = document.getElementById("composer_en").value

	   person += composerEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + composerRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + composerEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_composer:' + composerEn + ';;\n\n'
	   
	   // add producer
	   let producerRu = document.getElementById("producer_ru").value
	   let producerEn = document.getElementById("producer_en").value

	   person += producerEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + producerRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + producerEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_producer:' + producerEn + ';;\n\n'	   
	   
	   // add production_designer
	   let productiondesignerRu = document.getElementById("production_designer_ru").value
	   let productiondesignerEn = document.getElementById("production_designer_en").value

	   person += productiondesignerEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + productiondesignerRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + productiondesignerEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_production_designer:' + productiondesignerEn + ';;\n\n'
	   
	   // add soundman
	   let soundmanRu = document.getElementById("soundman_ru").value
	   let soundmanEn = document.getElementById("soundman_en").value

	   person += soundmanEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + soundmanRu +
		         ']\n\t(* <- lang_ru;; *);\n\t[' + soundmanEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_soundman:' + soundmanEn + ';;\n\n'	 
	   
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

SCWeb.core.ComponentManager.appendComponentInitialize(cartoonComponent);
