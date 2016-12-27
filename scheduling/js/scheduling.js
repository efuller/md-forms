window.EPF_Scheduling = {};
(function(window, document, app, validator, helpers) {

	// Config
	app.config = {
		validationClass: '.validation-message',
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
			form: document.getElementById('scheduling-form'),
			date: document.getElementById('date'),
			time: document.getElementById('time'),
			timezone: document.getElementById('timezone'),
			message: document.getElementById('message'),
			phoneNumber: document.getElementById('phone-number'),
			email: document.getElementById('email'),
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
			if (app.c[prop].name === 'date' || app.c[prop].name === 'time' || app.c[prop].name === 'timezone') {
				// Reset the date input on change event.
				app.c.date.addEventListener('change', app.resetInputMessage);
				app.c.time.addEventListener('change', app.resetInputMessage);
				app.c.timezone.addEventListener('change', app.resetInputMessage);
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
	 * Validate the date input.
	 *
	 * @returns {boolean}
	 */
	app.validateDate = function() {
		var date = app.c.date.value;

		// If empty.
		if (validator.isEmpty(date)) {
			helpers.showMessage(app.c.date, app.config.validationClass, 'Please enter a date.');
			return false;
		}

		// If not a valid date.
		if (!validator.isDate(date)) {
			helpers.showMessage(app.c.date, app.config.validationClass, 'Please enter a valid date.');
			return false;
		}

		// Can't make same-day appointments.
		if (!validator.isAfterToday(date)) {
			helpers.showMessage(app.c.date, app.config.validationClass, 'Cannot make same-day appointments.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the time.
	 *
	 * @returns {boolean}
	 */
	app.validateTime = function() {
		var time = app.c.time.value;

		// If empty.
		if (validator.isEmpty(time)) {
			helpers.showMessage(app.c.time, app.config.validationClass, 'Please enter a time.');
			return false;
		}

		// Only allow for appointments between 9AM and 4PM.
		if (!validator.isBetween(parseInt(time), 9, 17)) {
			helpers.showMessage(app.c.time, app.config.validationClass, 'Time must be between 9:00AM and 4:00PM.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the timezone.
	 *
	 * @returns {boolean}
	 */
	app.validateTimezone = function() {
		var timezoneIndex = app.c.timezone.selectedIndex; // Select index.
		var timezone = app.c.timezone[timezoneIndex].value; // Value of the select option.

		// If empty.
		if (validator.isEmpty(timezone)) {
			helpers.showMessage(app.c.timezone, app.config.validationClass, 'Please enter a timezone.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the message.
	 *
	 * @returns {boolean}
	 */
	app.validateMessage = function() {
		var message = app.c.message.value;

		// If empty.
		if (validator.isEmpty(message)) {
			helpers.showMessage(app.c.message, app.config.validationClass, 'Please enter a message.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the phone number.
	 *
	 * @returns {boolean}
	 */
	app.validatePhoneNumber = function() {
		var phoneNumber = app.c.phoneNumber.value;

		// If empty.
		if (validator.isEmpty(phoneNumber)) {
			helpers.showMessage(app.c.phoneNumber, app.config.validationClass, 'Please enter a phone number.');
			return false;
		}

		// If not a valid phone number.
		if (!validator.isPhoneNumber(phoneNumber)) {
			helpers.showMessage(app.c.phoneNumber, app.config.validationClass, 'Please enter a valid phone number. 444-333-2222');
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

		var date = app.validateDate();
		var time = app.validateTime();
		var timezone = app.validateTimezone();
		var message = app.validateMessage();
		var phone = app.validatePhoneNumber();
		var email = app.validateEmail();

		// If everything validates.
		if (date && time && email && timezone && message && phone && email) {
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

})(window, document, window.EPF_Scheduling, validator, helpers);
