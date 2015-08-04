var message = require('../src/message/message');
var expect = require('chai').expect;


describe('message', function(){
  describe('payload', function(){
    it('should return message payload', function(){
      var msg = new message(new Buffer('hello'), new Buffer('world'));
      var result = msg.payload().toString();
      expect(result).to.equal('hello');
    })
  })

  describe('key', function(){
    it('should return message key', function(){
      var msg = message(new Buffer('hello'), new Buffer('world'));
      var result = msg.key().toString();
      expect(result).to.equal('world');
    })
  })

})
