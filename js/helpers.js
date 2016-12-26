(function(window) {

	// Create Utilities object
	var helpers = {};

	/**
	 * Get the validator message element for a supplied input.
	 *
	 * @param el The input element.
	 * @param className The class of the validation message element to get.
	 *
	 * @returns {Element}
	 */
	helpers.getMessageElement = function(el, className) {
		var parent = el.parentNode;
		return parent.querySelector( className );
	};

	/**
	 * Hide the message element.
	 *
	 * @param el The input element.
	 * @param className The class name of the validation element to be hidden.
	 */
	helpers.hideMessage = function(el, className) {
		var messageElement = helpers.getMessageElement(el, className);

		el.classList.remove('invalid');
		messageElement.innerHTML = '';
		messageElement.style.display = 'none';
	};

	/**
	 * Show the validation message.
	 *
	 * @param el The element we are validating.
	 * @param className The class of the validation message element.
	 * @param message The message to display.
	 */
	helpers.showMessage = function(el, className, message) {
		var messageElement = helpers.getMessageElement(el, className);

		el.classList.add('invalid');
		messageElement.style.display =  'block';
		messageElement.innerHTML = message;
	};

	/**
	 * Check to see of a specified age.
	 *
	 * @param dob The date of birth.
	 * @param age Minimum age you want to check for.
	 *
	 * @returns {boolean}
	 */
	helpers.isOfAge = function(dob, age) {
		var today = new Date();
		var birthDate = new Date(dob);

		// Bail if no date of birth or age.
		if(!dob || !age) {
			return false;
		}

		// Return.
		return (today.getYear() - birthDate.getYear()) >= age;
	};

	/**
	 * Compare two passwords and see if they are equal.
	 *
	 * @param password First password.
	 * @param confirmPassword Second password;
	 *
	 * @returns {boolean}
	 */
	helpers.comparePasswords = function(password, confirmPassword) {
		return password === confirmPassword;
	};

	// Return a window object
	return window.helpers = helpers || {};
})(window);