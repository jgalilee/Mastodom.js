# mastodom.js

## Javascript alias

Mastodom can be called using Mn or Mastodom. Mn (because if you look hard and make a wish it kind of starts to look like a mastodon).

## Methods

There are none. Mastodom has been refactored into a single function taking an anonymous objects that works as a specification. Everything in a specification is optional. If no type is defined a div will be used. The root of the resulting DOM tree is always returned.

````js
{
  // Reference to the parent element. Can also be blank, 
  parent: object, can't be a specification.

  // Type of element to construct. Can also be a list of types where 
  // each is a child of the previous.
  type: '',
  // Inner HTML of the element.
  content: 'Hello World',
  attributes: {
    // Optional attributes (added as key="value") for the element.
    id: '',
    class: ''
   },
   // List of specifications or DOM objects, they will be appended to the element.
   children: []
}
````

## Example

There is an example of it being used in the repo.

document.createElement()
-----------------------

````js
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
````

mastodom.js createElement()
---------------------------

````js
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
````

Clarification of type
---------------------

Specifying a list of element types creates a tree branch of the elements specified.
It applies the element settings to the leaf element.
````js
<div>
  <span>
    <img src="cat1.jpg"></img>
  </span>
</div>
````