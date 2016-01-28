# dot-file-config

[![Build Status](https://travis-ci.org/ewnd9/dot-file-config.svg?branch=master)](https://travis-ci.org/ewnd9/dot-file-config)

> A dot-file is generally any file whose name begins with a full stop. https://en.wikipedia.org/wiki/Dot-file

Manage application state via config in json dot-file

## Install

```
$ npm install dot-file-config --save
```

## Usage

```js
var config = require('dot-file-config')('.your-app-name', {
	defaultConfigFile: <String>, // relative path
	onFirstRun: <Function> // optional
});

config.path // path to config file
config.defaultPath // absolute path to default config file (argument can be relative)
config.data // content of dot-file
config.isFirstRun // true when config didn't exist before
config.save() // persist config.data back to dot-file
```

## Changelog

- `v0.6.0`

	- Removed symlinking to Dropbox
	- options' `firstRunCallback` renamed to `onFirstRun`

## Alternatives

- [configstore](https://github.com/yeoman/configstore)
- [text-db](https://github.com/asarode/text-db)
- [node-store](https://github.com/alexkwolfe/node-store)
- [jsop](https://github.com/typicode/jsop)
