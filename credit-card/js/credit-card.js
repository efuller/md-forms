window.EPF_CreditCard = {};
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
			form: document.getElementById('credit-card'),
			fullName: document.getElementById('full-name'),
			cardNumber: document.getElementById('card-number'),
			cvc: document.getElementById('cvc'),
			month: document.getElementById('month'),
			year: document.getElementById('year'),
			cardExpired: document.getElementById('card-expired'),
			submitBtn: document.getElementById('submit'),
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
			if (app.c[prop].name === 'month' || app.c[prop].name === 'year') {
				// Reset the date input on change event.
				app.c[prop].addEventListener('change', app.resetInputMessage);
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

		// Hide the card expired validation message if showing.
		if (this.id === "month" || this.id === "year") {
			helpers.hideMessage(app.c.submitBtn, app.config.validationClass);
		}

		if (!this.classList.contains('invalid') || validator.isEmpty(this.value)) {
			return false;
		}

		// Hide the validation message.
		helpers.hideMessage(this, app.config.validationClass);
	};

	/**
	 * Validate the full name input.
	 *
	 * @returns {boolean}
	 */
	app.validateFullName = function() {
		var fullName = app.c.fullName.value;

		// If empty.
		if (validator.isEmpty(fullName)) {
			helpers.showMessage(app.c.fullName, app.config.validationClass, 'Please enter your full name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(fullName, app.config.minCharacters)) {
			helpers.showMessage(app.c.fullName, app.config.validationClass, 'Full name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the card number.
	 *
	 * @returns {boolean}
	 */
	app.validateCardNumber = function() {
		var cardNumber = app.c.cardNumber.value;

		// If empty.
		if (validator.isEmpty(cardNumber)) {
			helpers.showMessage(app.c.cardNumber, app.config.validationClass, 'Please enter a card number.');
			return false;
		}

		// If not at least 16 characters long.
		if (cardNumber.length !== 16) {
			helpers.showMessage(app.c.cardNumber, app.config.validationClass, 'Card number needs to be 16 digits long.');
			return false;
		}

		// Must use 0 - 9.
		if (!validator.isComposedOf(cardNumber, ["1", "2", "3", "4", "5", "6" ,"7", "8", "9", "0"])) {
			helpers.showMessage(app.c.cardNumber, app.config.validationClass, 'Please use digits 0 - 9.');
			return false;
		}

		// Make sure a valid credit card number is used.
		if (!validator.isCreditCard(cardNumber)) {
			helpers.showMessage(app.c.cardNumber, app.config.validationClass, 'Please enter a valid credit card number.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the CVC number.
	 *
	 * @returns {boolean}
	 */
	app.validateCVC = function() {
		var cvc = app.c.cvc.value;

		// If empty.
		if (validator.isEmpty(cvc)) {
			helpers.showMessage(app.c.cvc, app.config.validationClass, 'Please enter a CVC number.');
			return false;
		}

		// If the CVC is not of length 3.
		if (cvc.length !== 3) {
			helpers.showMessage(app.c.cvc, app.config.validationClass, 'CVC must be 3 digits.');
			return false;
		}

		// Should use only 0 - 9..
		if (!validator.isComposedOf(cvc, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])) {
			helpers.showMessage(app.c.cvc, app.config.validationClass, 'CVC must use digits 0 - 9.');
			return false;
		}

		return true;
	};

	/**
	 * Validate Month.
	 *
	 * @returns {boolean}
	 */
	app.validateMonth = function() {
		var monthIndex = app.c.month.selectedIndex; // Select index.
		var month = app.c.month[monthIndex].value; // Value of the select option.

		// If empty.
		if (validator.isEmpty(month)) {
			helpers.showMessage(app.c.month, app.config.validationClass, 'Please select a month.');
			return false;
		}

		return true;
	};

	/**
	 * Validate year.
	 *
	 * @returns {boolean}
	 */
	app.validateYear = function() {
		var yearIndex = app.c.year.selectedIndex; // Select index.
		var year = app.c.year[yearIndex].value; // Value of the select option.

		// If empty.
		if (validator.isEmpty(year)) {
			helpers.showMessage(app.c.year, app.config.validationClass, 'Please select a year.');
			return false;
		}

		return true;
	};

	/**
	 * Calculate credit card expiration.
	 *
	 * @returns {boolean}
	 */
	app.validateExpiration = function() {
		var month = app.c.month.value;
		var year = app.c.year.value;

		// Bail if no month.
		if (!app.validateMonth()) {
			return false;
		}

		// Bail if no year
		if (!app.validateYear()) {
			return false;
		}

		// Compose full date.
		var fullDate = year + '/' + month;
		var expirationDate = new Date(fullDate);
		var today = new Date();

		// Check to see if expiration and current year match.
		if (expirationDate.getYear() === today.getYear()) {

			// Make sure expiration month is great or equal to current month.
			if (expirationDate.getMonth() >= today.getMonth()) {
				return true;
			}

			// Display expiration message if month not equal to current or greater.
			helpers.showMessage(app.c.submitBtn, app.config.validationClass, 'Card has expired. Please check the date.');

			return false;
		} else {
			// If the expiration date is not beyond today.
			if (expirationDate < today) {
				helpers.showMessage(app.c.submitBtn, app.config.validationClass, 'Card has expired. Please check the date.');

				return false;
			}

			return true;
		}
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
		var fullName = app.validateFullName();
		var cardNumber = app.validateCardNumber();
		var cvc = app.validateCVC();
		var month = app.validateMonth();
		var year = app.validateYear();
		var expiration = app.validateExpiration();

		// If everything validates.
		if (fullName && cardNumber && cvc && month && year && expiration) {
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
})(window, document, window.EPF_CreditCard, validator, helpers);