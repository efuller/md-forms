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
	 */
	helpers.hideMessage = function(el) {
		var messageElement = helpers.getMessageElement(el, '.message');

		el.classList.remove('invalid');
		messageElement.innerHTML = '';
		messageElement.style.display = 'none';
	};

	/**
	 * Show the validation message.
	 *
	 * @param el The element we are validating.
	 * @param message The message to display.
	 */
	helpers.showMessage = function(el, message) {
		var messageElement = helpers.getMessageElement(el, '.message');

		el.classList.add('invalid');
		messageElement.style.display =  'block';
		messageElement.innerHTML = message;
	};

	/**
	 * Reset the validation message.
	 *
	 * @returns {boolean}
	 */
	helpers.resetInputMessage = function() {

		if (!this.classList.contains('invalid') || validator.isEmpty(this.value)) {
			return false;
		}

		// Hide the validation message.
		helpers.hideMessage(this);
	};

	// Return a window object
	return window.helpers = helpers || {};
})(window);