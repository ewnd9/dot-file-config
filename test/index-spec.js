var fs = require('fs');
var expect = require("chai").expect;

describe("dot-file-config", function() {

  var lib = require('../index.js');
  var config = null;

  afterEach(function() {
    if (config !== null && fs.existsSync(config.path)) {
      fs.unlinkSync(config.path);
    }
  });

  describe(".apply(name, defaultConfigFile)", function() {

    it("should return empty object if defaultConfigFile is not given", function(){
      config = lib('.dot-file-test');

      expect(fs.existsSync(config.path)).to.equal(false);
      expect(config.data.toString()).to.equal({}.toString()); // lol
    });

    it("should copy defaultConfigFile if given", function(){
      config = lib('.dot-file-test', 'user-config.json');

      expect(fs.existsSync(config.path)).to.equal(true);
      expect(fs.existsSync(config.path)).to.equal(true);
      expect(Object.keys(config.data).length).to.equal(1);
      expect(config.data.test).to.equal('test');
    });

    it("should persist data", function(){
      config = lib('.dot-file-test', 'user-config.json');

      config.data.persist = 'test';
      config.save();

      config = lib('.dot-file-test', 'user-config.json');

      expect(Object.keys(config.data).length).to.equal(2);
      expect(config.data.persist).to.equal('test');
    });

    it("should call firstRunCallback", function(done){
      config = lib('.dot-file-test', 'user-config.json', function() {
        done();
      });
    });

  });
});
