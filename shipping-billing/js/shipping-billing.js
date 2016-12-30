window.EPF_ShippingBilling = {};
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
			form: document.getElementById('shipping-billing'),
			sameInfo: document.getElementById('same-info'),
			billingFirstName: document.getElementById('billing-first-name'),
			billingLastName: document.getElementById('billing-last-name'),
			billingAddress: document.getElementById('billing-address-1'),
			billingCity: document.getElementById('billing-city'),
			billingState: document.getElementById('billing-state'),
			billingZip: document.getElementById('billing-zip'),
			billingCountry: document.getElementById('billing-country'),
			shippingFirstName: document.getElementById('shipping-first-name'),
			shippingLastName: document.getElementById('shipping-last-name'),
			shippingAddress: document.getElementById('shipping-address-1'),
			shippingCity: document.getElementById('shipping-city'),
			shippingState: document.getElementById('shipping-state'),
			shippingZip: document.getElementById('shipping-zip'),
			shippingCountry: document.getElementById('shipping-country'),
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {

		// Validate form on submit.
		app.c.form.addEventListener('submit', app.validate);

		// Check event for same shipping info as billing.
		app.c.sameInfo.addEventListener('change', app.sameInfo);

		// Reset input validation messages.
		for (var prop in app.c) {
			if (app.c[prop].name === 'billing-state' || app.c[prop].name === 'billing-country' || app.c[prop].name === 'shipping-state' || app.c[prop].name === 'shipping-country') {
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

		if (!this.classList.contains('invalid') || validator.isEmpty(this.value)) {
			return false;
		}

		// Hide the validation message.
		helpers.hideMessage(this, app.config.validationClass);
	};

	/**
	 * Copy billing values to shipping.
	 */
	app.sameInfo = function() {

		// If same info checkbox is checked.
		if (this.checked) {
			app.c.shippingFirstName.value = app.c.billingFirstName.value;
			app.c.shippingLastName.value = app.c.billingLastName.value;
			app.c.shippingAddress.value = app.c.billingAddress.value;
			app.c.shippingCity.value = app.c.billingCity.value;
			app.c.shippingState.value = app.c.billingState.value;
			app.c.shippingZip.value = app.c.billingZip.value;
			app.c.shippingCountry.value = app.c.billingCountry.value;
		} else {
			app.c.shippingFirstName.value = '';
			app.c.shippingLastName.value = '';
			app.c.shippingAddress.value = '';
			app.c.shippingCity.value = '';
			app.c.shippingState.value = '';
			app.c.shippingZip.value = '';
			app.c.shippingCountry.value = '';
		}
	};

	/**
	 * Validate the first name input.
	 *
	 * @returns {boolean}
	 */
	app.validateFirstName = function() {
		var billingFirstName = app.c.billingFirstName.value;
		var shippingFirstName = app.c.shippingFirstName.value;

		// If empty.
		if (validator.isEmpty(billingFirstName)) {
			helpers.showMessage(app.c.billingFirstName, app.config.validationClass, 'Please enter a first name.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingFirstName)) {
			helpers.showMessage(app.c.shippingFirstName, app.config.validationClass, 'Please enter a first name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(billingFirstName, app.config.minCharacters)) {
			helpers.showMessage(app.c.billingFirstName, app.config.validationClass, 'First name needs to be at least 3 characters.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(shippingFirstName, app.config.minCharacters)) {
			helpers.showMessage(app.c.shippingFirstName, app.config.validationClass, 'First name needs to be at least 3 characters.');
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
		var billingLastName = app.c.billingLastName.value;
		var shippingLastName = app.c.shippingLastName.value;

		// If empty.
		if (validator.isEmpty(billingLastName)) {
			helpers.showMessage(app.c.billingLastName, app.config.validationClass, 'Please enter a last name.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingLastName)) {
			helpers.showMessage(app.c.shippingLastName, app.config.validationClass, 'Please enter a last name.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(billingLastName, app.config.minCharacters)) {
			helpers.showMessage(app.c.billingLastName, app.config.validationClass, 'Last name needs to be at least 3 characters.');
			return false;
		}

		// If not at least 3 characters long.
		if (!validator.isOfLength(shippingLastName, app.config.minCharacters)) {
			helpers.showMessage(app.c.shippingLastName, app.config.validationClass, 'Last name needs to be at least 3 characters.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the address input.
	 *
	 * @returns {boolean}
	 */
	app.validateAddress = function() {
		var billingAddress = app.c.billingAddress.value;
		var shippingAddress = app.c.shippingAddress.value;

		// If empty.
		if (validator.isEmpty(billingAddress)) {
			helpers.showMessage(app.c.billingAddress, app.config.validationClass, 'Please enter an address.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingAddress)) {
			helpers.showMessage(app.c.shippingAddress, app.config.validationClass, 'Please enter an address.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the city input.
	 *
	 * @returns {boolean}
	 */
	app.validateCity = function() {
		var billingCity = app.c.billingCity.value;
		var shippingCity = app.c.shippingCity.value;

		// If empty.
		if (validator.isEmpty(billingCity)) {
			helpers.showMessage(app.c.billingCity, app.config.validationClass, 'Please enter a city.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingCity)) {
			helpers.showMessage(app.c.shippingCity, app.config.validationClass, 'Please enter a city.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the state input.
	 *
	 * @returns {boolean}
	 */
	app.validateState = function() {
		var billingStateIndex = app.c.billingState.selectedIndex; // Select index.
		var billingState = app.c.billingState[billingStateIndex].value; // Value of the select option.

		var shippingStateIndex = app.c.shippingState.selectedIndex; // Select index.
		var shippingState = app.c.shippingState[shippingStateIndex].value; // Value of the select option.

		// If empty.
		if (validator.isEmpty(billingState)) {
			helpers.showMessage(app.c.billingState, app.config.validationClass, 'Please enter a state.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingState)) {
			helpers.showMessage(app.c.shippingState, app.config.validationClass, 'Please enter a state.');
			return false;
		}

		return true;
	};

	/**
	 * Validate zip code input.
	 *
	 * @returns {boolean}
	 */
	app.validateZip = function() {
		var billingZip = app.c.billingZip.value;
		var shippingZip = app.c.shippingZip.value;

		// If empty.
		if (validator.isEmpty(billingZip)) {
			helpers.showMessage(app.c.billingZip, app.config.validationClass, 'Zip required.');
			return false;
		}

		// If not using 0 - 9.
		if (!validator.isComposedOf(billingZip, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])) {
			helpers.showMessage(app.c.billingZip, app.config.validationClass, 'Please use 0 - 9.');
			return false;
		}

		// Must be 5 digits long.
		if (billingZip.length !== 5) {
			helpers.showMessage(app.c.billingZip, app.config.validationClass, 'Please enter 5 digits.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingZip)) {
			helpers.showMessage(app.c.shippingZip, app.config.validationClass, 'Zip required.');
			return false;
		}

		// If not using 0 - 9.
		if (!validator.isComposedOf(shippingZip, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])) {
			helpers.showMessage(app.c.shippingZip, app.config.validationClass, 'Please use 0 - 9.');
			return false;
		}

		// Must be 5 digits long.
		if (!validator.isOfLength(shippingZip, 5)) {
			helpers.showMessage(app.c.shippingZip, app.config.validationClass, 'Please enter 5 digits.');
			return false;
		}

		return true;
	};

	/**
	 * Validate the country input.
	 *
	 * @returns {boolean}
	 */
	app.validateCountry = function() {
		var billingCountryIndex = app.c.billingCountry.selectedIndex; // Select index.
		var billingCountry = app.c.billingCountry[billingCountryIndex].value; // Value of the select option.

		var shippingCountryIndex = app.c.shippingCountry.selectedIndex; // Select index.
		var shippingCountry = app.c.shippingCountry[shippingCountryIndex].value; // Value of the select option.

		// If empty.
		if (validator.isEmpty(billingCountry)) {
			helpers.showMessage(app.c.billingCountry, app.config.validationClass, 'Please enter a country.');
			return false;
		}

		// If empty.
		if (validator.isEmpty(shippingCountry)) {
			helpers.showMessage(app.c.shippingCountry, app.config.validationClass, 'Please enter a country.');
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
		var address = app.validateAddress();
		var city = app.validateCity();
		var state = app.validateState();
		var zip = app.validateZip();
		var country = app.validateCountry();

		// If everything validates.
		if (firstName && lastName && address && city && state && zip && country) {
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
})(window, document, window.EPF_ShippingBilling, validator, helpers);