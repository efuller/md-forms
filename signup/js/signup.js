window.EPF_SignupForm = {};
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
			form: document.getElementById('signup-form'),
			firstName: document.getElementById('first-name'),
			lastName: document.getElementById('last-name'),
			email: document.getElementById('email'),
			outfitter: document.getElementById('outfitter-name'),
			dob: document.getElementById('date-of-birth'),
			password: document.getElementById('password'),
			confirmPassword: document.getElementById('password-confirm'),
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {

		// Validate form on submit.
		app.c.form.addEventListener('submit', app.validate);

		// Reset input validation messages.
		for (var prop in app.c) {
			if (app.c[prop].name === 'date-of-birth') {
				// Reset the date input on change event.
				app.c.dob.addEventListener('change', app.resetInputMessage);
			} else {
				app.c[prop].addEventListener('keyup', app.resetInputMessage);
			}
		}
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
	 * Validate the first name input.
	 *
	 * @returns {boolean}
	 */
	app.validateFirstName = function() {
		var firstName = app.c.firstName.value;

		// If empty.
		if (validator.isEmpty(firstName)) {
			helpers.showMessage(app.c.firstName, app.config.validationClass, 'Please enter a first name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(firstName, app.config.minCharacters)) {
			helpers.showMessage(app.c.firstName, app.config.validationClass, 'First name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the last name input.
	 *
	 * @returns {boolean}
	 */
	app.validateLastName = function() {
		var lastName = app.c.lastName.value;

		// If empty.
		if (validator.isEmpty(lastName)) {
			helpers.showMessage(app.c.lastName, app.config.validationClass, 'Please enter a last name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(lastName, app.config.minCharacters)) {
			helpers.showMessage(app.c.lastName, app.config.validationClass, 'Last name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the email input.
	 *
	 * @returns {boolean}
	 */
	app.validateEmail = function() {
		var email = app.c.email.value;

		// If empty.
		if (validator.isEmpty(email)) {
			helpers.showMessage(app.c.email, app.config.validationClass, 'Please enter an email address.');
			return false;
		}

		// If a valid email address
		if (!validator.isEmailAddress(email)) {
			helpers.showMessage(app.c.email, app.config.validationClass, 'Please enter a valid email address.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the outfitter input.
	 *
	 * @returns {boolean}
	 */
	app.validateOutfitterName = function() {
		var outfitterName = app.c.outfitter.value;

		if (validator.isEmpty(outfitterName)) {
			helpers.showMessage(app.c.outfitter, app.config.validationClass, 'Please enter an outfitter name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(outfitterName, app.config.minCharacters)) {
			helpers.showMessage(app.c.outfitter, app.config.validationClass, 'Name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the date of birth input.
	 *
	 * @returns {boolean}
	 */
	app.validateDOB = function() {
		var dob = app.c.dob.value;

		// If empty.
		if (validator.isEmpty(dob)) {
			helpers.showMessage(app.c.dob, app.config.validationClass, 'Please enter a date of birth.');
			return false;
		}

		// If not a valid email address.
		if (!validator.isDate(dob)) {
			helpers.showMessage(app.c.dob, app.config.validationClass, 'Please enter a valid date of birth.');
			return false;
		}

		// Must be at least 13 years of age.
		if (!helpers.isOfAge(dob, 13)) {
			helpers.showMessage(app.c.dob, app.config.validationClass, 'You must be at least 13 to register.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the passwords and make sure they match.
	 *
	 * @returns {boolean}
	 */
	app.validatePasswords = function() {
		var password = app.c.password.value;
		var confirmPassword = app.c.confirmPassword.value;

		// If empty.
		if(validator.isEmpty(password)) {
			helpers.showMessage(app.c.password, app.config.validationClass, 'Please enter a password.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(confirmPassword)) {
			helpers.showMessage(app.c.confirmPassword, app.config.validationClass, 'Please confirm your password.');
			return false;
		}

		// Passwords must be at least 6 characters long.
		if (!validator.isOfLength(password, 6) || !validator.isOfLength(confirmPassword, 6)) {
			helpers.showMessage(app.c.password, app.config.validationClass, 'Passwords must be at least 6 characters long.');
			helpers.showMessage(app.c.confirmPassword, app.config.validationClass, 'Passwords must be at least 6 characters long.');
			return false;
		}

		// Compare passwords.
		if (!helpers.comparePasswords(password, confirmPassword)) {
			helpers.showMessage(app.c.password, app.config.validationClass, 'Passwords to not match.');
			helpers.showMessage(app.c.confirmPassword, app.config.validationClass, 'Passwords to not match.');
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
		var valid = false;

		// Prevent default submit action.
		e.preventDefault();

		// Validate fields.
		var firstName = app.validateFirstName();
		var lastName = app.validateLastName();
		var email = app.validateEmail();
		var outfitterName = app.validateOutfitterName();
		var dob = app.validateDOB();
		var passwords = app.validatePasswords();

		// If everything validates.
		if (firstName && lastName && email && outfitterName && dob && passwords) {
			valid = true;
		}

		// Bail if valid still equals false.
		if (valid === false) {
			return false;
		}

		// Go ahead and submit the form!
		console.log('Submit the form!');
	};

	// Engage!
	app.init();
})(window, document, window.EPF_SignupForm, validator, helpers);