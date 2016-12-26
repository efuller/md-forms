window.EPF_SearchForm = {};
(function(window, document, app, validator, helpers) {

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
		app.c.searchInput.addEventListener('keyup', helpers.resetInputMessage);

		// Select change event listener.
		app.c.species.addEventListener('change', helpers.resetInputMessage);
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
			helpers.showMessage(app.c.searchInput, 'Please enter a search term.');
		}

		// Validate the species select.
		if (validator.isEmpty(species)) {
			helpers.showMessage(app.c.species, 'Please select a species.');
		}
	};

	app.init();
})(window, document, window.EPF_SearchForm, validator, helpers);