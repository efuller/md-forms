window.EPF_LoginForm = {};
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
			form: document.getElementById('login'),
			userName: document.getElementById('username'),
			password: document.getElementById('password'),
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {

		// Validate form on submit.
		app.c.form.addEventListener('submit', app.validate);

		// Reset validation messages.
		app.c.userName.addEventListener('keyup', app.resetInputMessage);
		app.c.password.addEventListener('keyup', app.resetInputMessage);
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
	 * Validate the user name input.
	 *
	 * @returns {boolean}
	 */
	app.validateUserName = function() {
		var userName = app.c.userName.value;

		// If empty.
		if (validator.isEmpty(userName)) {
			helpers.showMessage(app.c.userName, app.config.validationClass, 'Please enter a user name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(userName, app.config.minCharacters)) {
			helpers.showMessage(app.c.userName, app.config.validationClass, 'User name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the password.
	 *
	 * @returns {boolean}
	 */
	app.validatePassword = function() {
		var password = app.c.password.value;

		// If empty.
		if(validator.isEmpty(password)) {
			helpers.showMessage(app.c.password, app.config.validationClass, 'Please enter a password.');
			return false;
		}

		// Passwords must be at least 6 characters long.
		if (!validator.isOfLength(password, 6)) {
			helpers.showMessage(app.c.password, app.config.validationClass, 'Passwords must be at least 6 characters long.');
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
		var userName = app.validateUserName();
		var password = app.validatePassword();

		// If everything validates.
		if (userName && password) {
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
})(window, document, window.EPF_LoginForm, validator, helpers);