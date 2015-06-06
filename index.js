var fs = require('fs');

module.exports = function(name, defaultConfigFile) {

  return new function() {
    var homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + name;

    this.path = homePath;
    this.data = null;

    if (fs.existsSync(this.path)) {
      this.data = JSON.parse(fs.readFileSync(this.path));
    } else if (defaultConfigFile) {
      fs.writeFileSync(this.path, fs.readFileSync(defaultConfigFile));
      this.data = JSON.parse(fs.readFileSync(this.path));
    } else {
      this.data = {};
    };

    this.save = function() {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }.bind(this);
  };

}
