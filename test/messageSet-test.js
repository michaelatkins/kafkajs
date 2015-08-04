var messageSet = require('../src/message/messageSet');
var message = require('../src/message/message');
var expect = require('chai').expect;

var msg1 = message(new Buffer('hello'), new Buffer('world'));
var msg2 = message(new Buffer('happy'), new Buffer('message'));

describe('messageSet', function(){
  describe('entrySize', function(){
    it('should add log overhead to message size', function(){
      var ms = messageSet();
      var result = ms.entrySize(msg1);
      expect(result).to.equal(36);
    })
  })
})
