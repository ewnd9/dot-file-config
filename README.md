# dot-file-config

[![Build Status](https://travis-ci.org/ewnd9/dot-file-config.svg?branch=master)](https://travis-ci.org/ewnd9/dot-file-config)

npm package for saving app config in human readable/editable json dot-file

## Install

```
$ npm install dot-file-config --save
```

## Usage

```javascript
// main.js
var config = require('dot-file-config')('.your-app-name', 'default-config-file', firstRunCallback);

config.path // path to config file
config.defaultPath // absolute path to default config file (argument can be relative)
config.data // your config
config.save() // persist config.data back to dot-file

// component.js
var config = require('dot-file-config')('.your-app-name');

config.data // same as in main.js
```

`firstRunCallback` called if default-config-file is defined and dot-file is not exists

## Roadmap

- [ ] Default messages on first run and api to set custom
- [ ] Yaml configs support

## Changelog

### 0.0.2:

- [x] `firstRunCallback`

## Alternatives

- [configstore](https://github.com/yeoman/configstore)
- [text-db](https://github.com/asarode/text-db)
- [node-store](https://github.com/alexkwolfe/node-store)
- [jsop](https://github.com/typicode/jsop)
