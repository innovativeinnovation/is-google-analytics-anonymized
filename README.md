<p align="center">
  <img alt="Is Google Analytics anonymized" src="https://raw.githubusercontent.com/epfl-devrun/is-google-analytics-anonymized/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  Check IP Anonymization of Google Analytics in a Web page.
</p>

<p align="center">
  <a href="https://travis-ci.org/epfl-devrun/is-google-analytics-anonymized">
    <img alt="Travis Status" src="https://travis-ci.org/epfl-devrun/is-google-analytics-anonymized.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/epfl-devrun/is-google-analytics-anonymized?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/epfl-devrun/is-google-analytics-anonymized/badge.svg?branch=master"/>
  </a>
  <a href='https://gemnasium.com/github.com/epfl-devrun/is-google-analytics-anonymized'>
    <img alt="Dependency Status" src="https://gemnasium.com/badges/github.com/epfl-devrun/is-google-analytics-anonymized.svg" />
  </a>
  <a href="https://raw.githubusercontent.com/epfl-devrun/is-google-analytics-anonymized/master/LICENSE">
    <img alt="Apache License 2.0" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/is-google-analytics-anonymized'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/is-google-analytics-anonymized.svg" />
  </a>
</p>

---

Command Line
------------

### Install

Install this globally and you'll have access to the
`is-google-analytics-anonymized` command anywhere on your system.

```bash
$ npm install -g is-google-analytics-anonymized
```

### Usage

```
$ is-google-analytics-anonymized
Usage: is-google-analytics-anonymized <url>

Commands:
  url  URL to check

Options:
  -h, --help     Show help                 [boolean]
  -v, --version  Show version number       [boolean]
```

API
---

### Install

```bash
$ npm install --save is-google-analytics-anonymized
```

### Usage

```javascript
var isGoogleAnalyticsAnonymized = require('is-google-analytics-anonymized');

isGoogleAnalyticsAnonymized('https://www.epfl.ch', function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});
```

Screenshot
----------

![Command line](https://raw.githubusercontent.com/epfl-devrun/is-google-analytics-anonymized/master/docs/readme/screenshot.png)

Contributing
------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Developer
---------

  * [William Belle](https://github.com/williambelle)

License
-------

Apache License 2.0

(c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.

See the [LICENSE](LICENSE) file for more details.
