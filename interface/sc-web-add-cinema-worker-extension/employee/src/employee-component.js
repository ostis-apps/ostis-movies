employeeComponent = {
    ext_lang: 'employee_code',
    formats: ['format_employee'],
    struct_support: true,

    factory: function (sandbox) {
        return new employeeWindow(sandbox);
    }
};

employeeWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_employee_text_component', 'ui_employee_search_component', 'ui_employee_answer_button',
    'ui_employee_info_block'];

    const textComponent = '#employee-' + sandbox.container + " #text-component";
    const searchComponent = '#employee-' + sandbox.container + " #search-component";
    const answerButton = '#employee-' + sandbox.container + " #answer-button";
    const infoBlock = '#employee-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="employee-' + sandbox.container + '"></div>');

    $('#employee-' + sandbox.container).load('static/components/html/employee.html', function () {
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
                let textComponentScAddr = keynodes['ui_employee_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_employee_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_employee_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_employee_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }

   function makeFileText() {

	   let firstNameRu = document.getElementById("first_name_ru").value
	   let lastNameRu = document.getElementById("last_name_ru").value

	   let firstNameEn = document.getElementById("first_name_en").value
	   let lastNameEn = document.getElementById("last_name_en").value

	   let identifier = firstNameEn.replace(/ /g, '_').toLowerCase() + '_' + lastNameEn.replace(/ /g, '_').toLowerCase()


	   // add identifiers
	   let person = identifier + '\n<- person;\n'

	   let isActor = document.querySelector("#actor")
	   if (isActor.checked) {
	   	person += '<- concept_actor;\n'
	   }

	   let isDirector = document.querySelector("#director")
	   if (isDirector.checked) {
	   	person += '<- concept_main_producer;\n'
	   }

	   let isScreenwriter = document.querySelector("#screenwriter")
	   if (isScreenwriter.checked) {
	   	person += '<- concept_screenwriter;\n'
	   }

	   let isProducer = document.querySelector("#producer")
	   if (isProducer.checked) {
	   	person += '<- concept_producer;\n'
	   }

	   let isOperator = document.querySelector("#operator")
	   if (isOperator.checked) {
	   	person += '<- concept_cameraman;\n'
	   }

	   let isEditor = document.querySelector("#editor")
	   if (isEditor.checked) {
	   	person += '<- concept_editor;\n'
	   }

	   let isStuntman = document.querySelector("#stuntman")
	   if (isStuntman.checked) {
	   	person += '<- concept_stuntman;\n'
	   }


	   // add main identifiers
	   let nameRu = firstNameRu + " " + lastNameRu
	   let nameEn = firstNameEn + " " + lastNameEn

	   person += '\n=> nrel_main_idtf:\n\t [' + nameRu + ']\n\t (* <- lang_ru;;	*);\n\t [' + nameEn + ']\n\t (* <- lang_en;; *);\n\n'


	   // add description
	   let biographyRu = document.querySelector("#person_biography_ru").value
	   let biographyEn = document.querySelector("#person_biography_en").value

	   person += '<- rrel_key_sc_element:...\n(*\n\t <- definition;;\n\t=> nrel_main_idtf:\n\t\t[Описание (' + nameRu +
		   ')](* <- lang_ru;; *);\n\t\t[Desctiption (' + nameEn +
		   ')](* <- lang_en;; *);; \n\t<= nrel_sc_text_translation:... \n\t\t(*\n'

	   person += "\t\t-> rrel_example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameRu +
		   "</sc_element></b> — " + biographyRu + '](* <- lang_ru;; => nrel_format: format_html;;*);;\n'

	   person += "\t\t-> rrel_example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameEn +
		   "</sc_element></b> — " + biographyEn + '](* <- lang_en;; => nrel_format: format_html;;*);;\n\t\t*);;\n*);;\n\n'


	   // add birth year
	   let birthYear = document.getElementById("birth_year").value

		person += 'concept_calendar_date->' + birthYear + ';;\n' +
			       identifier + '=>nrel_date_of_birth: ' + birthYear + ';;\n' +
				   birthYear + '=>nrel_main_idtf:[' + birthYear + ' год](*<-lang_ru;;*);;\n' +
                   birthYear + '=>nrel_main_idtf:[year of ' + birthYear + '](*<-lang_en;;*);;\n\n'


	   // add start career year
	   let startCareerYear = document.getElementById("start_career_year").value

		person += 'concept_calendar_date->' + startCareerYear + ';;\n' +
			       startCareerYear + '=>nrel_career_start_date: ' + startCareerYear + ';;\n' +
				   startCareerYear + '=>nrel_main_idtf:[' + startCareerYear + ' год](*<-lang_ru;;*);;\n' +
                   startCareerYear + '=>nrel_main_idtf:[year of ' + startCareerYear + '](*<-lang_en;;*);;\n\n'


	   // add country
	   let countryRu = document.getElementById("country_ru").value
	   let countryEn = document.getElementById("country_en").value

	   person += countryEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + countryRu + ']\n\t(* <- lang_ru;; *);\n\t[' + countryEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   person += identifier + '=>nrel_cityzenship:' + countryEn.replace(/ /g, '_').toLowerCase() + ';;\n\n'

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

SCWeb.core.ComponentManager.appendComponentInitialize(employeeComponent);
