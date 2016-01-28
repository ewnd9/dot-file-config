var fs = require('fs');
var path = require('path');
var homePath = require('user-home');

var Config = module.exports = function(name, options) {
  if (!(this instanceof Config)) {
    return new Config(name, options);
  }

  options = options || {};

  this.path = path.join(homePath, name);
  this.data = null;
  this.isFirstRun = false;

  if (fs.existsSync(this.path)) {
    this.data = JSON.parse(fs.readFileSync(this.path));
  } else {
    this.isFirstRun = true;

    if (options.defaultConfigFile) {
      this.defaultPath = path.resolve(options.defaultConfigFile);
      this.data = JSON.parse(fs.readFileSync(this.defaultPath, 'utf-8'));
    } else {
      this.data = {};
    }

    if (typeof options.onFirstRun === 'function') {
      options.onFirstRun();
    }

    this.save();
  }
};

Config.prototype.reload = function() {
  this.data = JSON.parse(fs.readFileSync(this.path));
};

Config.prototype.save = function() {
  fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
};
