masterdom.js
============

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


masterdom.js createElement()
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

