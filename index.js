var fs = require('fs');

module.exports = function(name) {

  return new function() {
    var homePath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/' + name;
    var remoteKey = '__remote_config';

    this.path = homePath;

    this.data = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path)) : {};

    if (this.data[remoteKey]) {
      this.path = this.data[remoteKey];
      this.data = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path)) : {};
    }

    this.saveConfig = function(path, config) {
      fs.writeFileSync(path, JSON.stringify(config));
    };

    this.save = function() {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }.bind(this);

    this.setPath = function(path) {
      var obj = {}; obj[remoteKey] = path;
      this.saveConfig(homePath, obj);
      this.path = path;
      this.save();
    };
  };

}
