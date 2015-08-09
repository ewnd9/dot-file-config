# dot-file-config

[![Build Status](https://travis-ci.org/ewnd9/dot-file-config.svg?branch=master)](https://travis-ci.org/ewnd9/dot-file-config)

npm package for saving app config in human readable/editable json dot-file
with support of [backup via dropbox](https://github.com/ewnd9/dropbox-symlink)

## Install

```
$ npm install dot-file-config --save
```

## Usage

```javascript
var config = require('dot-file-config')('.your-app-name', options);

config.path // path to config file
config.defaultPath // absolute path to default config file (argument can be relative)
config.data // your config
config.dropbox // see https://github.com/ewnd9/dropbox-symlink
config.isFirstRun // true when config didn't exist before
config.save() // persist config.data back to dot-file
```

### Options

- `defaultConfigFile` relative path to default config file
- `cloudSync` true by default, enable [symlinking config to Dropbox folder](https://github.com/ewnd9/dropbox-symlink)

## Roadmap

- [ ] Default messages on first run and api to set custom
- [ ] Yaml configs support

## Alternatives

- [configstore](https://github.com/yeoman/configstore)
- [text-db](https://github.com/asarode/text-db)
- [node-store](https://github.com/alexkwolfe/node-store)
- [jsop](https://github.com/typicode/jsop)
