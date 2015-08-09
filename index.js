var fs = require('fs');
var path = require('path');
var homePath = require('user-home');

module.exports = function(name, options) {

  options = options || {};

  var defaultConfigFile = options.defaultConfigFile;
  var firstRunCallback = options.firstRunCallback;
  var cloudSync = (typeof options.cloudSync === 'undefined') ? true : options.cloudSync;

  return new function() {
    this.path = path.join(homePath, name);
    this.data = null;
    this.isFirstRun = false;

    var dropbox = this.dropbox = require('dropbox-symlink')(this.path, {
      onLinkFrom: function(fromFile, toFile) {
        console.log('symlinked config file ' + fromFile + ' to ' + toFile)
      },
      onLinkTo: function(fromFile, toFile) {
        console.log('symlinked config file from ' + fromFile + ' to ' + toFile)
      }
    });

    this.save = function() {
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 4)); // @TODO copy to dropbox on windows
    }.bind(this);

    if (fs.existsSync(this.path)) {
      this.data = JSON.parse(fs.readFileSync(this.path));

      if (cloudSync && dropbox.exists && !dropbox.fileExists) {
        dropbox.linkToDropbox();
      }
    } else {
      this.isFirstRun = true;
      
      if (cloudSync && dropbox.exists && dropbox.fileExists) {
        dropbox.linkFromDropbox();
        this.data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      } else {
        if (defaultConfigFile) {
          this.defaultPath = path.resolve(defaultConfigFile);
          this.data = JSON.parse(fs.readFileSync(this.defaultPath, 'utf-8'));

          if (firstRunCallback && typeof firstRunCallback === 'function') {
            firstRunCallback();
          }
        } else {
          this.data = {};
        }

        this.save();

        if (cloudSync && dropbox.exists && !dropbox.fileExists) {
          dropbox.linkToDropbox();
        }
      }
    }
  };
};
