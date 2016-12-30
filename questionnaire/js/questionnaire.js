window.EPF_Questionnaire = {};
(function(window, document, app, validator, helpers) {

	// Config
	app.config = {
		validationClass: '.validation-message',
		minCharacters: 3,
	};

	/**
	 * Initialize validation.
	 */
	app.init = function() {
		app.cache();
		app.bindEvents();
	};

	/**
	 * Cache DOM elements that we will need.
	 */
	app.cache = function() {

		// Cache object
		app.c = {
			form: document.getElementById('question-form'),
			radios: document.querySelectorAll('#question-form input[type="radio"]'),
			submitBtn: document.getElementById('submit'),
			otherText: document.getElementById('other-text'),
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {

		// Validate form on submit.
		app.c.form.addEventListener('submit', app.validate);

		// Add an event listener to each radio.
		app.c.radios.forEach(function(radio) {
			radio.addEventListener('change', app.turnOnSubmit);
		});

		// Reset the other text validation message.
		app.c.otherText.addEventListener('keyup', app.resetInputMessage);
	};

	/**
	 * Reset the validation message.
	 *
	 * @returns {boolean}
	 */
	app.resetInputMessage = function() {

		if (!this.classList.contains('invalid') || validator.isEmpty(this.value)) {
			return false;
		}

		// Hide the validation message.
		helpers.hideMessage(this, app.config.validationClass);
	};

	/**
	 * Enable the submit button.
	 */
	app.turnOnSubmit = function() {
		// Enable the submit button.
		app.c.submitBtn.disabled = false;
	};

	/**
	 * Validate other text field.
	 *
	 * @returns {boolean}
	 */
	app.validateOtherText = function() {
		var otherText = app.c.otherText.value;

		// If empty.
		if (validator.isEmpty(otherText)) {
			helpers.showMessage(app.c.otherText, app.config.validationClass, 'Please enter text for other.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(otherText, app.config.minCharacters)) {
			helpers.showMessage(app.c.otherText, app.config.validationClass, 'Text needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the form
	 *
	 * @param e Submit event.
	 *
	 * @returns {boolean}
	 */
	app.validate = function(e) {
		var checkedRadio = null;
		var otherIsUsed = false;
		var otherIsValidated = false;

		// Prevent default.
		e.preventDefault();

		// Check to make sure one of the inputs is selected.
		app.c.radios.forEach(function(radio) {
			if (radio.checked && !validator.isEmpty(radio.value)) {
				checkedRadio = radio;
			}
		});

		// Bail if no radios are selected.
		if (!checkedRadio) {
			return false;
		}

		// If the 'other' input is selected.
		if (checkedRadio.id === 'other') {
			otherIsUsed = true;
			otherIsValidated = app.validateOtherText();
		}

		// If other is used and validated, then submit.
		if (otherIsUsed && otherIsValidated) {
			console.log('Submit with other content!');
			return false;
		}

		// Submit if other is not selected.
		console.log('Submit with radio button content.');
	};

	// Engage!
	app.init();
})(window, document, window.EPF_Questionnaire, validator, helpers);