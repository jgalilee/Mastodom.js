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

    describe("Generators", function() {

      it("should evaluate functions as values", function() {
        expect(window.Mn.createElement({
          type: function() {
                  return "DIV";
                }
        }).nodeName).toEqual('DIV');
      });

      it("should accept a function for generating children", function() {
        expect(window.Mn.createElement({
          type: "div",
          children: function() {
                      return [
                        { type: "div" },
                        { type: "div" }
                      ];
                    }
        }).hasChildNodes()).toBeTruthy();
      });

      it("should accept nested functions", function() {
        expect(window.Mn.createElement({
          type: "div",
          children: function() {
                      return [
                        { type: function() {
                                  return "div";
                                }
                        },
                        { type: function() {
                                  return "div";
                                }
                        }
                      ];
                    }
        }).hasChildNodes()).toBeTruthy();
      });
    });

  });
});
