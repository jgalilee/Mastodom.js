function createElement(settings) {
	var newElement = null;
	var newRootElement = newElement;

	// Build a simple empty tree
	if (settings.type instanceof Array) {

		for(var key in settings.type) {
			var value = settings.type[key];
			var tempElement = document.createElement(value);

			if(newElement) {
				newElement.appendChild(tempElement);
			} else {
				newRootElement = tempElement;
			}
			newElement = tempElement;
		}

	} else {
		newRootElement = document.createElement(settings.type);
		newElement = newRootElement;
	}
	
	// Add attributes to the new dom object.
	if (undefined !== settings.attributes) {
		for(var key in settings.attributes) {
			var value = settings.attributes[key];
			newElement.setAttribute(key, value);
		}
	}

	// Add the content to the object.
	if(undefined !== settings.content) {
		newElement.innerHTML = settings.content;
	}

	// Append the element to a number of children.
	if (undefined !== settings.children) {
		for(var key in settings.children) {
			var value = settings.children[key];
			value.parent = newElement;
			createElement(value);
		}
	}

	// Append the element to a number of children.
	if(undefined !== settings.parent) {
		settings.parent.appendChild(newRootElement);
	}

	return newRootElement;
}