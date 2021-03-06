var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

describe("dot-file-config", function() {

  var lib = require('./../');
  var config = null;

  var configPath = '.dot-file-config-test';
  var configDefault = 'user-config.json';

  afterEach(function() {
    if (config !== null && fs.existsSync(config.path)) {
      fs.unlinkSync(config.path);
    }
  });

  it("should return empty object if defaultConfigFile is not given", function(){
    config = lib(configPath);

    expect(fs.existsSync(config.path)).to.equal(true);
    expect(Object.keys(config.data).length).to.equal(0);
  });

  it("should copy defaultConfigFile if given", function(){
    config = lib(configPath, {
      defaultConfigFile: configDefault
    });

    expect(fs.existsSync(config.path)).to.equal(true);
    expect(Object.keys(config.data).length).to.equal(1);
    expect(config.data.test).to.equal('test');
  });

  it("should persist data", function(){
    config = lib(configPath, {
      defaultConfigFile: configDefault
    });

    config.data.persist = 'test';
    config.save();

    config = lib(configPath, {
      defaultConfigFile: configDefault
    });

    expect(Object.keys(config.data).length).to.equal(2);
    expect(config.data.persist).to.equal('test');
  });

  it("should call onFirstRun", function(done){
    config = lib(configPath, {
      defaultConfigFile: configDefault,
      onFirstRun: done
    });
  });

  it("should resolve default config absolute path", function(){
    config = lib(configPath, {
      defaultConfigFile: configDefault
    });

    var path = require('path').resolve(__dirname + '/../' + 'user-config.json');
    expect(config.defaultPath).to.equal(path);
  });

});
