/**
 * MASTODOM.JS
 * =========================================================
 * author: Jack Galilee, Max Brosnahan, Lewis Christie
 * date: 13th April 2011
 * version: 0.1
 */

Mastodom = Mn = (function(settings) {
  var _this = this;
  _this.defaultElementType = 'div';
  if(undefined !== settings) {

    // Leaf element
    var newElement = null;

    // Root element.
    // - Assume it is the same as the leaf by default.
    var newRootElement = newElement;

    /*
     * If type is an array assume it defines a tree
     * Construct the tree remembering the root and leaf of the tree.
     */
    if(settings.type instanceof Array) {
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

    /*
     * Otherwise construct a single new node. Using the specified
     * type; or the default type otherwise.
     */
    } else {
      if(undefined !== settings.type) {
        newRootElement = document.createElement(settings.type);
      } else {
        newRootElement = document.createElement(_this.defaultElementType);
      }
      newElement = newRootElement;
    }

    /*
     * Add any defined content to the new node.
     */
    if(undefined !== settings.content) {
      newElement.innerHTML = settings.content;
    }

    /*
     * Add each defined attribute to the new node.
     */
    if(undefined !== settings.attributes) {
      for(var key in settings.attributes) {
        var value = settings.attributes[key];
        newElement.setAttribute(key, value);
      }
    }

    /*
     * Add each defined event to the new node.
     */
    if(undefined !== settings.events) {
      for(var key in settings.events) {
        value = settings.events[key];
        newRootElement.addEventListener(key, value, true);
      }
    }

    /*
     * Check if the node specificaiton has any children.
     * Append each of the children to the new node.
     */
    if(undefined !== settings.children) {
      for(var key in settings.children) {
        var value = settings.children[key];

        /*
         * If the object has a method to append a child assume
         * it is a node. Append the object to the new node.
         */
        if(undefined !== value.appendChild) {
          newElement.appendChild(value);

        /*
         * Otherwise assume the object is a specification, recursively
         * call this function to generate the child node and have it
         * appended.
         */
        } else {
          value.parent = newElement;
         // this.createElement(value);
        }
      }
    }

    // Append the element to a parent.
    if(undefined !== settings.parent) {
      settings.parent.appendChild(newRootElement);
    }

    // Always return the top of the branch.
    return newRootElement;

  } else {
    return undefined;

  }
});
