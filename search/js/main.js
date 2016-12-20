window.EPF_SearchForm = {};
(function(window, document, app, validator) {

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
			searchForm: document.getElementById('search-form'),
			searchInput: document.getElementById('search-input'),
			species: document.getElementById('species')
		}
	};

	/**
	 * Bind events
	 */
	app.bindEvents = function() {
		// Submit event listener.
		app.c.searchForm.addEventListener('submit', app.validate);

		// Search input event listener.
		app.c.searchInput.addEventListener('keyup', app.resetInputMessage);

		// Select change event listener.
		app.c.species.addEventListener('change', app.resetInputMessage);
	};

	/**
	 * Get the message element for a supplied input.
	 *
	 * @param el The input element.
	 * @returns {Element}
	 */
	app.getMessageElement = function(el) {
		var parent = el.parentNode;
		return parent.querySelector( '.message' );
	};

	/**
	 * Hide the message element.
	 *
	 * @param el The input element.
	 */
	app.hideMessage = function(el) {
		var messageElement = app.getMessageElement(el);

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
	app.showMessage = function(el, message) {
		var messageElement = app.getMessageElement(el);

		el.classList.add('invalid');
		messageElement.style.display =  'block';
		messageElement.innerHTML = message;
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
		app.hideMessage(this);
	};

	/**
	 * Validate the form
	 *
	 * @param e Submit event.
	 *
	 * @returns {boolean}
	 */
	app.validate = function(e) {

		// Prevent default submit action.
		e.preventDefault();

		var searchValue = app.c.searchInput.value; // Search input value.
		var speciesIndex = app.c.species.selectedIndex; // Select index.
		var species = app.c.species[speciesIndex].value; // Value of the select option.

		// Validate the search input.
		if (validator.isEmpty(searchValue)) {
			app.showMessage(app.c.searchInput, 'Please enter a search term.');
		}

		// Validate the species select.
		if (validator.isEmpty(species)) {
			app.showMessage(app.c.species, 'Please select a species.');
		}
	};

	app.init();
})(window, document, window.EPF_SearchForm, validator);