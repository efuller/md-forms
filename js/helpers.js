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

	// Return a window object
	return window.helpers = helpers || {};
})(window);