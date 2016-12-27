(function(window) {
	// Declare the validator object.
	var validator = {};

	/**
	 * Check to see if the input is a valid email address.
	 *
	 * @param {string} input The email address.
	 *
	 * @returns {boolean}
	 */
	validator.isEmailAddress = function(input) {

		// Bail if not a string.
		if (!input || typeof input !== 'string') {
			return false;
		}

		// Bail if there is no @.
		if (input.indexOf('@') === -1) return false;

		// Split the email up into an array
		var emailSplit = input.split('@');

		// Bail if for some reason there are not two segments.
		if (emailSplit.length < 2) {
			return false;
		}

		// Bail if either segment is not a string
		emailSplit.forEach(function(segment) {
			if (typeof segment !== 'string') {
				return false;
			}
		});

		// If we get this far, then from our perspective, you have a valid email address.
		return true;
	};

	/**
	 * Checks an input string to see if it is a valid phone number
	 *
	 * @param {string} input The phone number.
	 *
	 * @returns {boolean}
	 */
	validator.isPhoneNumber = function(input) {
		// Declare an array to hold the segments
		var numSegments = [];

		// Bail if no number provided
		if(!input) {
			return false;
		}

		// Get the number segments
		numSegments = input.split('-');

		// Bail if there are not 3 segments
		if( numSegments.length !== 3) {
			return false;
		}

		// Bail if not the correct amount of characters in each segment
		if( numSegments[0].length !== 3 || numSegments[1].length !== 3 || numSegments[2].length !== 4) {
			return false;
		}

		// Return true
		return true;
	};

	/**
	 * Remove non-alpha-numeric characters from a string.
	 *
	 * @param {string}  input        String to check.
	 * @param {boolean} removeSpaces If you want to remove spaces or not.
	 *
	 * @returns {string} The clean string.
	 */
	validator.withoutSymbols = function(input, removeSpaces) {
		// Alpha numeric characters.
		var alphaNumeric = [0,1,2,3,4,5,6,7,8,9,"a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I",
			"j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w",
			"W","x","X","y","Y","z","Z"];
		var stringSplit = [];
		var filteredString = [];

		// Bail if no input
		if(!input) {
			throw ("You must provide a string.");
		}

		// If removeSpaces is true
		if(!removeSpaces) {
			alphaNumeric.push(' ');
		}

		// Split the string into an array
		stringSplit = input.split('');

		// Filter out items that are not allowed
		filteredString = stringSplit.filter(function(item) {
			return alphaNumeric.indexOf(item) !== -1;
		});

		// Join and return
		return filteredString.join('');
	};

	/**
	 * Check if string is valid date.
	 *
	 * @param {string} input The date string.
	 * @returns {boolean}
	 */
	validator.isDate = function(input) {
		// Bail if no input
		if(!input) {
			return false;
		}

		// Return
		return !isNaN(Date.parse(input));
	};

	/**
	 * Check whether provided date is before reference date.
	 *
	 * @param {string} input 	 Date to check.
	 * @param {string} reference Date to check against.
	 *
	 * @returns {boolean}
	 */
	validator.isBeforeDate = function(input, reference) {
		var inputDate;
		var referenceDate;

		// Bail if no input or reference.
		if (!input || !reference) {
			return false;
		}

		// Bail if no input
		if(!validator.isDate(input) || !validator.isDate(reference)) {
			throw new Error('Please use two valid dates.');
		}

		// Create date objects
		inputDate = new Date(input);
		referenceDate = new Date(reference);

		// Return
		return !(inputDate.getTime() > referenceDate.getTime());
	};

	/**
	 * Check to see if date is after reference date.
	 *
	 * @param {string} input 	 The date to check.
	 * @param {string} reference The date to check against.
	 *
	 * @returns {boolean}
	 */
	validator.isAfterDate = function(input, reference) {
		var inputDate;
		var referenceDate;

		// Bail if no input or reference.
		if (!input || !reference) {
			return false;
		}

		// Bail if no input
		if(!validator.isDate(input) || !validator.isDate(reference)) {
			throw new Error('Please use two valid dates.');
		}

		// Create date objects
		inputDate = new Date(input);
		referenceDate = new Date(reference);

		// Return
		return !(inputDate.getTime() < referenceDate.getTime())
	};

	/**
	 * Check if a date is before today.
	 *
	 * @param {string} input Date of string you want to check.
	 *
	 * @returns {boolean}
	 */
	validator.isBeforeToday = function(input) {
		var inputDate;
		var today = new Date().setHours(0,0,0,0); // Set today at 00:00:00
		var dayInMilliSec = 24*60*60*1000; // Days in milliseconds
		var difference;

		// Bail if no date input provided.
		if (!input) {
			return false;
		}

		// Bail if no input
		if(!validator.isDate(input)) {
			throw new Error('Please use a valid date.');
		}

		// Create a Date from the param
		inputDate = new Date(input).getTime();

		// Calculate difference in milliseconds
		difference = (inputDate - today) / dayInMilliSec;

		// Return
		return difference < 0;
	};

	/**
	 * Check if a valid date is after today.
	 *
	 * @param {string} input Date to check.
	 *
	 * @returns {boolean}
	 */
	validator.isAfterToday = function(input) {
		// Bail if no date input provided.
		if (!input || typeof input !== 'string' || !validator.isDate(input)) {
			return false;
		}

		// Return
		return new Date(input) > new Date();
	};

	/**
	 * Check if a string is empty.
	 *
	 * @param {string} input The string to check.
	 *
	 * @returns {boolean}
	 */
	validator.isEmpty = function(input) {

		// Bail if there is no input passed.
		if(typeof input !== 'string') {
			return false;
		}

		// If there are spaces other than at [0].
		if (input.trim().indexOf('') !== 0) {
			return false;
		}

		// Check for the existence of multiple spaces.
		if (input.trim().indexOf(' ') > 0) {
			return false;
		}

		// If the input is of length greater than 1.
		if (input.trim().length >= 1) {
			return false;
		}

		// return
		return true;
	};

	/**
	 * Check to see if a string contains the words in the provided array.
	 *
	 * @param {string} input 	   The string to check.
	 * @param {Array}  wordsToFind The array of words to check for in the string.
	 *
	 * @returns {boolean}
	 */
	validator.contains = function(input, wordsToFind) {
		// Throw an error if no input or words array is provided
		if(!input || !wordsToFind) {
			return false;
		}

		// Declare some variables
		var wordMatches = [];
		var alphaNumeric = [" ",0,1,2,3,4,5,6,7,8,9,"a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i",
			"I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V",
			"w","W","x","X","y","Y","z","Z"];

		// Split the phrase into an array
		var inputSplit = input.toLowerCase().split(' ');

		// Loop over each element in the split string
		inputSplit.forEach(function(inputSplitWord) {

			// Loop over the words to find
			wordsToFind.forEach(function(wordToFind) {
				// Set some local variables for the before and after characters
				var before = null;
				var after = null;

				// If we find the word at the index of 0 and the two array elements match in length, then
				// we have a good match
				if(inputSplitWord.indexOf(wordToFind) === 0 && inputSplitWord.length === wordToFind.length) {

					// Push true
					wordMatches.push(true);
				} else if(inputSplitWord.indexOf(wordToFind) !== -1) {

					// Set the before character
					before = inputSplitWord.charAt(inputSplitWord.indexOf(wordToFind) - 1);

					// Set the after character
					after = inputSplitWord.charAt(inputSplitWord.indexOf(wordToFind) + wordToFind.length);

					// If the before and after characters are allowed, then push true
					if((alphaNumeric.indexOf(before) === -1 && before !== undefined) && (alphaNumeric.indexOf(after) === -1 && after !== undefined)) {
						wordMatches.push(true);
					}
				}
			});
		});

		// If the array of words we are looking for and the array of truthy values
		// is the same, then return true. Otherwise, return false.
		return wordMatches.length === wordsToFind.length;
	};

	/**
	 * Check if an input does not contain any of the words within the provided array of words.
	 *
	 * @param input The string to check.
	 * @param wordsToFind The words to check for in the provided string.
	 *
	 * @returns {boolean}
	 */
	validator.lacks = function(input, wordsToFind) {
		// Throw an error if no input or words array is provided
		if(!input || !wordsToFind) {
			return false;
		}

		// Declare some variables
		var wordMatches = [];
		var alphaNumeric = [" ",0,1,2,3,4,5,6,7,8,9,"a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z"];

		// Split the phrase into an array
		var inputSplit = input.toLowerCase().split(' ');

		// Loop over each element in the split string
		inputSplit.forEach(function(inputSplitWord) {

			// Loop over the words to find
			wordsToFind.forEach(function(wordToFind) {
				// Set some local variables for the before and after characters
				var before = null;
				var after = null;

				// If we find the word at the index of 0 and the two array elements match in length, then
				// we have a good match
				if(inputSplitWord.indexOf(wordToFind) === 0 && inputSplitWord.length === wordToFind.length) {

					// Push true
					wordMatches.push(true);
				} else if(inputSplitWord.indexOf(wordToFind) !== -1) {

					// Set the before character
					before = inputSplitWord.charAt(inputSplitWord.indexOf(wordToFind) - 1);

					// Set the after character
					after = inputSplitWord.charAt(inputSplitWord.indexOf(wordToFind) + wordToFind.length);

					// If the before and after characters are allowed, then push true
					if((alphaNumeric.indexOf(before) === -1 && before !== undefined) && (alphaNumeric.indexOf(after) === -1 && after !== undefined)) {
						wordMatches.push(true);
					}
				}
			});
		});

		// If the array of words we are looking for and the array of truthy values
		// is the same, then return true. Otherwise, return false.
		return wordMatches.length !== wordsToFind.length;
	};

	/**
	 * Check to see if a string is composed of an array of words.
	 *
	 * @param {string} input   The string to check.
	 * @param {array}  strings The array of strings to check against.
	 *
	 * @returns {boolean}
	 */
	validator.isComposedOf = function(input, strings) {
		// Throw an error if no input or array of words are provided.
		if(!input || !strings) {
			return false;
		}

		// Remove symbols from input.
		var splitInput = validator.withoutSymbols(input, true);

		// Convert to lowercase and split into an array.
		splitInput = splitInput.toLowerCase().split('');

		// Clean and lowercase the strings we are checking against.
		var cleanStrings = strings.map(function(word) {
			return validator.withoutSymbols(word, true).toLowerCase();
		});

		// Set a count variable
		var previousIndex = 0;

		// Compare the input with the array of allowed strings.
		var result = splitInput.reduce(function(accumulator, currentValue, currentIndex, array) {

			if (currentValue === cleanStrings[0]) {
				previousIndex = 1;
				return accumulator + 1;
			} else if(cleanStrings.indexOf(array.slice(previousIndex, currentIndex + 1).join('')) !== -1) {
				accumulator = accumulator + (currentIndex - previousIndex) + 1;
				previousIndex = previousIndex + (currentIndex - previousIndex) + 1;
			}

			return accumulator;
		}, 0);

		// Return
		return result === splitInput.length;
	};

	/**
	 * Check to see if the input is less than or equal to the length param.
	 *
	 * @param {string} input  The string to check.
	 * @param {number} length The length you want to check against.
	 *
	 * @returns {boolean}
	 */
	validator.isLength = function(input, length) {
		// Retrun false if no input or length is provided.
		if(!input || !length) {
			return false;
		}

		// Trim the input and compare lengths.
		return input.trim().length <= length;
	};

	/**
	 * Checks to see if the input is greater than or equal to the length.
	 *
	 * @param {string} input  The string to check.
	 * @param {number} length The length you want to check against.
	 *
	 * @returns {boolean}
	 */
	validator.isOfLength = function(input, length) {
		// Retrun false if no input or length is provided.
		if(!input || !length) {
			return false;
		}
			// throw new Error('Please provide an input and length.');

		return input.trim().length >= length;
	};

	/**
	 * Count the number of words in a string.
	 *
	 * @param {string} input The string to count.
	 *
	 * @returns {number} The number of words.
	 */
	validator.countWords = function(input) {
		var count = 0;
		var tempArray = [];
		var alphaNumeric = [0,1,2,3,4,5,6,7,8,9,"a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I",
			"j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w",
			"W","x","X","y","Y","z","Z"];

		// Throw error is no input or length is passed in.
		if(!input && input !== "")
			throw new Error('Please provide an input string.');

		// Split the phrase into an array
		var splitInput = input.trim().toLowerCase().split('');

		// Loop over string array and check to see if any alphaNumeric characters exist.
		splitInput.forEach(function(element) {
			if(alphaNumeric.indexOf(element) >= 0) {
				count = count + 1;
			}
		});

		// // If the count === 0, then return 0.
		if(count === 0) {
			return 0;
		}

		// Create an array of words!
		var words = splitInput.reduce(function(accumulator, currentElement) {
			if(alphaNumeric.indexOf(currentElement) >= 0) {
				tempArray.push(currentElement);

				return accumulator;
			}
			accumulator = accumulator.concat([tempArray]);
			tempArray = [];

			return accumulator;
		}, []);

		// If one big word
		if(tempArray.length > 0 && words.length === 0) {
			words.push([tempArray]);
		}

		// Return the result
		return words.length;
	};

	/**
	 * Check if the word count is less than or equal to the count provided.
	 *
	 * @param {string} input The string to count words on.
	 * @param {number} count The number to check against.
	 *
	 * @returns {boolean}
	 */
	validator.lessWordsThan = function(input, count) {

		// Throw an error if params aren't passed.
		if(!input || !count) {
			return false;
		}

		return validator.countWords(input) <= count;
	};

	/**
	 * Check if the word count is great than or equal to the count provided.
	 *
	 * @param {string} input The string to count words on.
	 * @param {number} count The number to check against.
	 *
	 * @returns {boolean}
	 */
	validator.moreWordsThan = function(input, count) {

		// Throw an error if params aren't passed.
		if (!input || !count) {
			return false;
		}

		return validator.countWords(input) >= count;
	};

	/**
	 * Check if a number is between two other numbers.
	 *
	 * @param {number} input The number to check.
	 * @param {number} floor The low number.
	 * @param {number} ceil  The high number.
	 *
	 * @returns {boolean}
	 */
	validator.isBetween = function(input, floor, ceil) {

		// Throw an error if params are not provided.
		if (!input || !floor || !ceil) {
			return false;
		}

		return ((input >= floor) && (input <= ceil));
	};

	/**
	 * Check if input is alphanumeric.
	 *
	 * @param {string} input The string to check.
	 *
	 * @returns {boolean}
	 */
	validator.isAlphanumeric = function(input) {
		var alphaNumeric = ["0","1","2","3","4","5","6","7","8","9","a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I",
			"j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w",
			"W","x","X","y","Y","z","Z"];

		if (!input && input !== "") {
			return false;
		}

		// If an empty string return true
		if (input === "" ) {
			return true;
		}

		// Split string into an array.
		var stringSplit = input.split('');

		// Check to see if any elements in the string array are not allowed.
		return !stringSplit.some(function(element) {
			return alphaNumeric.indexOf(element) === -1;
		});
	};

	/**
	 * Checks if input is a valid credit card number format.
	 *
	 * @param {string} input The number to check.
	 *
	 * @returns {boolean}
	 */
	validator.isCreditCard = function(input) {
		var inputLength = input.length;

		// Return false if no input.
		if (!input) {
			return false;
		}

		// If no hyphens
		if (inputLength === 16) {

			// Return if alpha-numeric.
			return validator.isAlphanumeric(input);
		}

		// Bail if not a length of 19.
		if (inputLength !== 19) {
			return false;
		}

		// Bail if not using hyphens.
		if (input.charAt(4) !== '-' && input.charAt(9) !== '-' && input.charAt(14) !== '-') {
			return false;
		}

		// Split the number into an array of segments.
		var splitNumber = input.split('-');

		// Bail if there is not four segments.
		if (splitNumber.length !== 4) {
			return false;
		}

		// Filter out any segments that are not alpha-numeric.
		var result = splitNumber.filter(function(segment) {
			return validator.isAlphanumeric(segment);
		});

		// Return
		return result.length === 4;
	};

	/**
	 * Checks to see if the input is in valid hex color format.
	 *
	 * @param {string} input The value to check.
	 *
	 * @returns {boolean}
	 */
	validator.isHex = function(input) {
		var cleanInput = input.trim();
		var result = false;
		var hexChars = ["0","1","2","3","4","5","6","7","8","9","a","A","b","B","c","C","d","D","e","E","f","F"];

		// Bail if no input was provided.
		if (!input) {
			return false;
		}

		// Bail if the input does not start with a hash.
		if (cleanInput.charAt(0) !== "#") {
			return false;
		}

		// Split the string into an array.
		var stringSplit = cleanInput.split('');

		// Handle for cases when of length 4 or 7.
		switch(cleanInput.length) {
			// If of length 4.
			case 4:
				stringSplit.forEach(function(element, i) {
					if (i !== 0 && hexChars.indexOf(element) === -1) {
						return result = false;
					}
					return result = true;
				});
				break;
			// If of length 7.
			case 7:
				stringSplit.forEach(function(element, i) {
					if (i !== 0 && hexChars.indexOf(element) === -1) {
						return result = false;
					}
					return result = true;
				});
				break;
			default:
				return result;
		}

		// Return.
		return result;
	};

	/**
	 * Checks to see if the input string is in valid RBG format.
	 *
	 * @param {string} input The string to check.
	 *
	 * @returns {boolean}
	 */
	validator.isRGB = function(input) {
		var cleanInput = input.trim();

		// Bail if no input
		if (!cleanInput) {
			return false;
		}

		// Split the value into an array.
		var stringSplit = cleanInput.split('');

		// Character at 0 should be r.
		if (cleanInput.charAt(0) !== "r") {
			console.warn("Format needs to be rgb(234,234,234).");
			return false;
		}

		// Character at 1 should be g.
		if (cleanInput.charAt(1) !== "g") {
			console.warn("Format needs to be rgb(234,234,234).");
			return false;
		}

		// Character at 2 should be b.
		if (cleanInput.charAt(2) !== "b") {
			console.warn("Format needs to be rgb(234,234,234).");
			return false;
		}

		// Character at 3 should be (.
		if (cleanInput.charAt(3) !== "(") {
			console.warn("Missing an opening ( - Format needs to be rgb(234,234,234).");
			return false;
		}

		// The last character should be ).
		if (cleanInput.charAt(stringSplit.length - 1) !== ")") {
			console.warn("Missing the closing ) - Format needs to be rgb(234,234,234).");
			return false;
		}

		// All all number segments to an array.
		var allThreeSegments = stringSplit.slice(4, stringSplit.length - 1);

		// Remove all spaces from the array.
		var noSpacesNumbers = allThreeSegments.filter(function(element) {
			return element !== " ";
		});

		// Compose segments.
		var segments = noSpacesNumbers.join('').split(',');

		// Make sure there are three segments.
		if (segments.length !== 3) {
			console.warn("It seems that you did not provide 3 segments of numbers.");
			return false;
		}

		// Check to see if any values are below 0 or above 255.
		var result = segments.some(function(segment) {
			return (parseInt(segment) < 0 || parseInt(segment) > 255);
		});

		return !result;
	};

	/**
	 * Check if the input is in the format of an HSL color.
	 *
	 * @param {string} input The string to check.
	 *
	 * @returns {boolean}
	 */
	validator.isHSL = function(input) {
		var cleanInput = input.trim();

		// Bail if no input
		if (!cleanInput) {
			return false;
		}

		// Split the value into an array.
		var stringSplit = cleanInput.split('');

		// Character at 0 should be r.
		if (cleanInput.charAt(0) !== "h") {
			console.warn("Format needs to be hsl(122, 1, 1).");
			return false;
		}

		// Character at 1 should be g.
		if (cleanInput.charAt(1) !== "s") {
			console.warn("Format needs to be hsl(122, 1, 1).");
			return false;
		}

		// Character at 2 should be b.
		if (cleanInput.charAt(2) !== "l") {
			console.warn("Format needs to be hsl(122, 1, 1).");
			return false;
		}

		// Character at 3 should be (.
		if (cleanInput.charAt(3) !== "(") {
			console.warn("Missing an opening ( - Format needs to be hsl(122, 1, 1).");
			return false;
		}

		// The last character should be ).
		if (cleanInput.charAt(stringSplit.length - 1) !== ")") {
			console.warn("Missing the closing ) - Format needs to be hsl(122, 1, 1).");
			return false;
		}

		// All all number segments to an array.
		var allThreeSegments = stringSplit.slice(4, stringSplit.length - 1);

		// Remove all spaces from the array.
		var noSpacesNumbers = allThreeSegments.filter(function(element) {
			return element !== " ";
		});

		// Compose segments.
		var segments = noSpacesNumbers.join('').split(',');

		// Make sure there are three segments.
		if (segments.length !== 3) {
			console.warn("It seems that you did not provide 3 segments of numbers.");
			return false;
		}

		// Create variables out of the segments.
		var firstSegment = segments[0];
		var secondSegment = segments[1];
		var thirdSegment = segments[2];

		// Bail if the first segment is not between 0 and 360.
		if (firstSegment < 0 || firstSegment > 360) {
			return false;
		}

		if (secondSegment < 0 || secondSegment > 1) {
			return false;
		}

		if (thirdSegment < 0 || thirdSegment > 1) {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input is in HEX, RGB, or HSL color format.
	 *
	 * @param {string} input The string to test.
	 *
	 * @returns {boolean}
	 */
	validator.isColor = function(input) {
		var cleanInput = input.trim();

		// Bail if no input
		if (!cleanInput) {
			return false;
		}

		// Return true if the input is in HEX color format.
		if (validator.isHex(input)) {
			return true;
		}

		// Return true if the input is in RGB color format.
		if (validator.isRGB(input)) {
			return true;
		}

		// Return true if the input is in HSL color format.
		if (validator.isHSL(input)) {
			return true;
		}

		// Finally, return false.
		return false;
	};

	/**
	 * Checks to see if the input has leading or trailing whitespace.
	 *
	 * @param {string} input The string to check.
	 *
	 * @returns {boolean}
	 */
	validator.isTrimmed = function(input) {

		// Bail if no input.
		if (!input) {
			return false;
		}

		// Split string using space.
		var splitInput = input.split(" ");

		// Count the number of spaces.
		var result = splitInput.reduce(function(accumulator, current) {
			if (current === "") {
				return accumulator = accumulator + 1;
			}
			return accumulator;
		}, 0);

		// Return result.
		return result === 0;
	};

	// Return a window object
	return window.validator = validator || {};

})(window);