# dot-file-config

npm package for saving app's config in json dot-file

## Install

```
$ npm install dot-file-config --save
```

## Usage

```javascript
var config = require('dot-file-config')('.your-app-name', 'default-config-file', firstRunCallback);

config.path // path to config file
config.defaultPath // absolute path to default config file (argument can be relative)
config.data // your config
config.save() // persist config.data back to dot-file
```

`firstRunCallback` called if default-config-file is defined and dot-file is not exists

## Roadmap

- [ ] Default messages on first run and api to set custom
- [ ] Yaml configs support

## Changelog

__0.0.2:__

- [x] `firstRunCallback`
