describe("mastodom", function(){
  "use strict";

  function fail(){
    expect(false).toBeTruthy();
  }

  it("provides Mn and Mastodom globals", function(){
    expect(window.Mn).toBeDefined();
    expect(window.Mastodom).toBeDefined();
    expect(window.Mn).toEqual(window.Mastodom);
  });

  it("has a default element type, which is a 'div'", function(){
    expect(window.Mn.defaultElementType).toEqual('div');
  });

  it("allows the default element type to be customised", function(){
    expect(window.Mn.defaultElementType).toBeDefined();
    var newElementType = 'h1';
    var oldElementType = 'div';
    window.Mn.defaultElementType = newElementType;
    expect(window.Mn.defaultElementType).toEqual(newElementType);
    window.Mn.defaultElementType = oldElementType;
  });

  it("creates a single html node", function(){
    var parent = document.createElement('div');
    var dom = {
      parent: parent,
      attributes: {
      id: "testID",
      class: "testClass",
      "data-test": "testCustomAttributes"
      }
    };
    window.Mn.createElement(dom);

    var element = parent.childNodes[0];

    expect(parent.childNodes.length).toEqual(1);
    expect(element.localName).toEqual(window.Mn.defaultElementType);
    expect(parent.childNodes[0].id).toEqual(dom.attributes.id);
    expect(parent.childNodes[0].className).toEqual(dom.attributes.class);
    expect(parent.childNodes[0].dataset["test"]).toEqual(dom.attributes["data-test"]);
  });

  it("creates nested nodes", function(){

    var parent = document.createElement('div');
    var domToCreate = {
      parent: parent,
      children:[
        {
          children: [
            {content: "content-00"},
            {content: "content-01"}
          ]
        },
        {
          children: [
            {content: "content-10"},
            {content: "content-11"}
          ]
        }
      ]
    };
    Mn.createElement(domToCreate);
    var createdDom = parent.childNodes[0];

    expect(createdDom).toBeDefined();
    expect(createdDom.children.length).toEqual(domToCreate.children.length);

    domToCreate.children.forEach(function(value, row1){
      domToCreate.children[row1].children.forEach(function(value, row2){
        expect(value.content).toEqual("content-" +row1 + row2 );
      });
    });
  });

  it("allows a type to be set for the elements", function(){
    var parent = document.createElement('div');
    var domToCreate = {
      parent: parent,
      type: 'h1',
      children: [
        {
        type: 'h2',
        children: [
          {type: 'h3'}
        ]
        }
      ]
    };
    window.Mn.createElement(domToCreate);

    var createdDom = parent.childNodes[0];
    var node = createdDom;
    var level = 1;
    while (node){
      expect(node.localName).toEqual('h'+level);
      node = node.childNodes[0];
      level++;
    }
  });

  it("can created nested nodes with a type list", function(){
    var parent = document.createElement('div');
    var domToCreate = {
    parent: parent,
    type: ['h1', 'h2', 'h3']

    };
    window.Mn.createElement(domToCreate);
    var createdDom = parent.childNodes[0];
    var level = 1;
    var node = createdDom;
    while(node){
      expect(node.localName).toEqual('h' + level);
      level++;
      node = node.children[0];
    }
  });

  it("can handle children and list of types simultaneously",function(){
    var parent = document.createElement('div');
    var domToCreate = {
      parent: parent,
      type: ['h1', 'h2', 'h3'],
      children: [
        {
        type: 'h4',
        children: [
          {type: 'h5'}
        ]
        }
      ]
    };
    window.Mn.createElement(domToCreate);
    var createdDom = parent.childNodes[0];
    var level = 1;
    var currentNode = createdDom;
    while(currentNode){
      expect(currentNode.localName).toEqual('h' + level);
      currentNode = currentNode.childNodes[0];
      level++;
    }
    expect(level - 1).toEqual(5);

  });

});
