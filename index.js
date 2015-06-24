var fs = require('fs');
var path = require('path');

module.exports = function(name, defaultConfigFile, firstRunCallback) {

  return new function() {
    var homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + name;

    this.path = homePath;
    this.data = null;


    if (fs.existsSync(this.path)) {
      this.data = JSON.parse(fs.readFileSync(this.path));
    } else if (defaultConfigFile) {
      fs.writeFileSync(this.path, fs.readFileSync(defaultConfigFile));
      this.data = JSON.parse(fs.readFileSync(this.path));
      this.defaultPath = path.resolve(defaultConfigFile);

      if (firstRunCallback && typeof firstRunCallback === 'function') {
        firstRunCallback();
      }
    } else {
      this.data = {};
    };

    this.save = function() {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }.bind(this);
  };

}
