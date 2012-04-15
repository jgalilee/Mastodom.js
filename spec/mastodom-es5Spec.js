describe("Mastodom", function() {

  "use strict";

  describe("Configuration", function() {

    it("should provide 'Mn' and 'Mastodom' as global aliases", function() {
      expect(window.Mn).toBeDefined();
      expect(window.Mastodom).toBeDefined();
      expect(window.Mn).toEqual(window.Mastodom);
    });

    it("should have a default element type", function() {
      expect(window.Mn.defaultElementType).toBeDefined();
    });

    it("should have a default element type of 'div'", function() {
      expect(window.Mn.defaultElementType).toEqual('div');
    });

    it("should allow the default element type to be changed", function() {
      expect(window.Mn.defaultElementType = 'span').toEqual('span');
    });

  });

  describe("Creation of elements", function() {

    beforeEach(function() {
      window.Mn.defaultElementType = 'div';
    });

    it("should be able to create a typeless dom node", function() {
      expect(window.Mn.createElement({})).toBeDefined();
    });

    describe("Single specification", function() {

      it("should be able to create a specific type of dom node", function() {
        expect(window.Mn.createElement({
          type: 'div'
        }).nodeName).toEqual('DIV');
      });

      it("should be able to create a nested nodes", function() {
        var node = window.Mn.createElement({
          type: ['div', 'span'],
          content: 'hello world'
        });
        expect(node.firstChild).toBeDefined();
      });
      
      it("should be able to use existing dom nodes structure while nesting", function() {
          var node = window.Mn.createElement({
            type: ['div', 'span'],
            content: 'hello world'
          });
          var nesty = window.Mn.createElement({
              type: ['div', node, 'img']
          });
          expect(nesty.firstChild.firstChild.firstChild).toBeDefined();
          expect(nesty.firstChild.firstChild.nodeName == 'SPAN').toBeTruthy();
      });
      
      it("should use the leftmost leaf of a structure when nesting", function() {
          var node = window.Mn.createElement({
              type:['div'],
              children:[{ type: 'span'},{type: 'div'}]
          });
          var nesty = window.Mn.createElement({
              type: ['div', node, 'img']
          });
          expect(nesty.firstChild.firstChild.nodeName == 'SPAN').toBeTruthy();
          
          var node2 = window.Mn.createElement({
              type:['div'],
              children:[{ type: 'div'},{type: 'span'}]
          });
          var nesty2 = window.Mn.createElement({
              type: ['div', node2, 'img']
          });
          expect(nesty2.firstChild.firstChild.nodeName == 'SPAN').toBeFalsy();
      });

      it("should be able to attached defined attributes to nodes", function() {
        var node = window.Mn.createElement({
          type: 'div',
          attributes: {
            id: 'example-id',
            class: 'example-class',
            'extra': 'example-extra-attribute'
          }
        });
        expect(node.hasAttributes()).toBeTruthy();
        expect(node.getAttribute('id')).toEqual('example-id');
        expect(node.getAttribute('class')).toEqual('example-class');
        expect(node.getAttribute('extra')).toEqual('example-extra-attribute');
      });

    });

    describe("Nested specifications", function() {

      it("should attach nested specifications to the parent specification", function() {
        expect(window.Mn.createElement({
          children: [{}]
        }).hasChildNodes()).toBeTruthy();
      });

    });

  });

});
