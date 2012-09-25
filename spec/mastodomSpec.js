describe("mastodom.js", function(){

  describe('library usage', function() {

    describe('type', function() {

      it('creates a node for the defined type', function() {
        var node = Mastodom({
          type: ['span']
        });
        expect(node.tagName).toEqual('SPAN');
        expect(node.parent).toBeUndefined();
      });

      it('creates a tree for the defined array of types', function() {
        var node = Mastodom({
          type: ['div', 'span']
        });
        expect(node.tagName).toEqual('DIV');
        expect(node.childNodes[0]).toBeDefined();
        expect(node.childNodes[0].tagName).toEqual('SPAN');
      });

    });

    describe('content', function() {

      it('sets the content attribute as the inner html of the node', function() {
        var node = Mastodom({
          type: 'span',
          content: 'Hello World'
        });
        expect(node.innerHTML).toEqual('Hello World');
      });

    });

    describe('attributes', function() {

      it('adds each of the key, value attributes to the dom node', function() {
        var node = Mastodom({
          type: 'p',
          content: 'Hello World',
          attributes: {
            id: 'hello-world-node',
            class: 'hello world node'
          }
        });
        expect(node.attributes.length).toEqual(2)
      });

    });

    describe('events', function() {

      it('binds each of the key, value events to the dom node', function() {
        var clicked = false;
        Mastodom({
          type: 'a',
          content: 'Click me!',
          events: {
            click: function(event) {
              clicked = true;
            }
          }
        }).click();
        expect(clicked).toEqual(true);
      });

    });

    describe('children', function() {

      it('accepts dom elements as children', function() {
        expect(Mastodom({
          type: 'div',
          content: 'Hello World',
          children: [
            document.createElement('div')
          ]
        }).children.length).toEqual(1);
      });

      it('recursively parses new specifications as children', function() {
        var nodes = Mastodom({
          type: 'div',
          content: 'Hello World',
          children: [{
            type: 'span',
            children: [{
              type: 'a',
              content: 'Howdy!'
            }]
          }]
        })
        expect(nodes.children.length).toEqual(1);
        expect(nodes.children[0].children.length).toEqual(1);
      });

    });

  });

});
