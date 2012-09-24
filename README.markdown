# mastodom.js

![Mastodom](https://raw.github.com/jgalilee/mastodom/master/example/mastodom.gif)

## About

Mastodom is a simple library, without any dependencies. It does the grunt work of writing low level document node creation, while still providing you with access to the low level, browser specific api.

It is useful when you don't need the power of jQuery or Zepto, and even more powerful when used in conjunction.

## Methods

There are none. Mastodom has been refactored into a single function taking an anonymous objects that works as a specification. 

Mastodom can be called using Mn or Mastodom. Mn (because if you look hard and make a wish it kind of starts to look like a mastodon).

Everything in a specification is optional. If no type is defined in the specification a div will be used. The root of the resulting DOM tree is always returned.

````js
{
  // Reference to the parent element. Can also be blank, 
  parent: object, can not be a specification.
  // Type of element to construct. Can also be a list of types where each is a child of the previous.
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

Mastodom()
---------------------------

````js
Mastodom({
  parent: document.body,
  type: 'div',
  children: [
    { type: 'div', content: 'Jack: Hey Richie!' },
    { type: 'div', content: 'Richie: Hey Jack!' },
    { type: 'div', content: 'Jack: Check out this picture of a cat!', children: [
    { type: ['div', 'span', 'img'], attributes: { src: 'cat1.jpg'} }] }
  ]
});
````

Clarification of type
---------------------

Specifying a list of element types creates a tree branch of the elements specified.
It applies the element settings to the leaf element.

````html
<div>
  <span>
    <img src="cat1.jpg"></img>
  </span>
</div>
````