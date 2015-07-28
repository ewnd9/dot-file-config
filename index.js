var fs = require('fs');
var path = require('path');

var configs = {};

module.exports = function(name, defaultConfigFile, firstRunCallback) {

  if (!configs[name]) {
    configs[name] = new function() {
      var homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + name;

      this.path = homePath;
      this.data = null;

      if (fs.existsSync(this.path)) {
        this.data = JSON.parse(fs.readFileSync(this.path));
      } else if (defaultConfigFile) {
        this.defaultPath = path.resolve(defaultConfigFile);
        this.data = JSON.parse(fs.readFileSync(this.defaultPath, 'utf-8'));

        fs.writeFileSync(this.path, this.data);

        if (firstRunCallback && typeof firstRunCallback === 'function') {
          firstRunCallback();
        }
      } else {
        this.data = {};
      };

      this.save = function() {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 4));
      }.bind(this);

      this.close = function() {
        delete configs[name];
      };
    };
  }

  return configs[name];
};
