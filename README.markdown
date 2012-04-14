# mastodom.js

## Javascript alias

Mastodom can be called using Mn (because if you look hard and make a wish it kind of starts to look like a mastodon) or Mastodom.
You can't (as far as I know) make a new instance of mastdom.js and it won't even work with the new command.

## Methods

### getDefaultElementType()

Returns the default element type, by default this is 'div'.

### setDefaultElementType(newType)

Sets the default element type to newType (must be an instance of a string). Returns true if the type was changed, false otherwise.

### createElement()

Accepts the following specification. Everything in the specification is option. If no type is defined the default type is used.
Returns the root of the resulting DOM tree.

    {
        parent: object, // Reference to the parent element. Can also be blank, can't be a specification.
        type: '',  // Type of element to construct. Can also be a list of types where each is a child of the previous.
        content: 'Hello World', // Inner HTML of the element.
        attributes: { // Optional attributes (added as key="value") for the element.
            id: '',
            class: ''
        },
        children: [] // List of specifications or DOM objects to append to the specified dom element.
    }

## Example

There is an example of it being used in the repo.

document.createElement()
-----------------------

    conversation = document.createElement('div');
    Jack1 = document.createElement('div');
    Jack1.innerHTML = 'Jack: Hey Richie';
    conversation.appendChild(Jack1);
    Richie1 = document.createElement('div');
    Richie1.innerHTML = 'Richie: Hey Jack';
    conversation.appendChild(Richie1);
    Jack2 = document.createElement('div');
    Jack2.innerHTML = 'Jack: Check out this picture of a cat!';
    conversation.appendChild(Jack2);
    catDiv = document.createElement('div');
    cat = document.createElement('img')
    cat.setAttribute('src', 'cat1.jpg')
    catDiv.appendChild(cat);
    conversation.appendChild(catDiv);
    document.body.appendChild(conversation);


mastodom.js createElement()
---------------------------

    createElement({
      parent: document.body,
      type: 'div',
      children: [
        { type: 'div', content: 'Jack: Hey Richie!' },
        { type: 'div', content: 'Richie: Hey Jack!' },
        { type: 'div', content: 'Jack: Check out this picture of a cat!', children: [
          { type: ['div', 'span', 'img'], attributes: { src: 'cat1.jpg'} }]
        }
      ]
    });

Clarification of type
---------------------

Specifying a list of element types creates a tree branch of the elements specified.
It applies the element settings to the leaf element.

    <div>
        <span>
            <img src="cat1.jpg"></img>
        </span>
    </div>
