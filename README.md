<p align="center">
  <img alt="Is Google Analytics anonymized" src="https://raw.githubusercontent.com/innovativeinnovation/is-google-analytics-anonymized/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  Check IP Anonymization of Google Analytics in a Web page.
</p>

<p align="center">
  <a href="https://travis-ci.org/innovativeinnovation/is-google-analytics-anonymized">
    <img alt="Travis Status" src="https://travis-ci.org/innovativeinnovation/is-google-analytics-anonymized.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/innovativeinnovation/is-google-analytics-anonymized?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/innovativeinnovation/is-google-analytics-anonymized/badge.svg?branch=master"/>
  </a>
  <a href="https://david-dm.org/innovativeinnovation/is-google-analytics-anonymized">
    <img alt="Dependencies Status" src="https://david-dm.org/innovativeinnovation/is-google-analytics-anonymized/status.svg"/>
  </a>
  <a href="https://raw.githubusercontent.com/innovativeinnovation/is-google-analytics-anonymized/master/LICENSE">
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
npm i is-google-analytics-anonymized -g
```

### Usage

```console
is-google-analytics-anonymized
Usage: is-google-analytics-anonymized <url>

Commands:
  url  URL to check

Options:
  -h, --help     Show help                 [boolean]
  -v, --version  Show version number       [boolean]
  
Examples:
  is-google-analytics-anonymized https://www.epfl.ch
  is-google-analytics-anonymized https://apple.com
```

API
---

### Install

```bash
npm i is-google-analytics-anonymized --save
```

### Usage

```javascript
var isGoogleAnalyticsAnonymized = require('is-google-analytics-anonymized');

isGoogleAnalyticsAnonymized('https://www.epfl.ch', function(error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
  // {
  //   trackers: [{
  //     id: 'UA-4833294-1',
  //     anonymized: true
  //   }],
  //   hasError: false,
  //   errorMsg: '',
  //   url: 'https://www.epfl.ch/'
  // }
});
```

Screenshot
----------

![command line screenshot](https://raw.githubusercontent.com/innovativeinnovation/is-google-analytics-anonymized/master/docs/readme/screenshot.png)

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

Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.  
Modified work (c) William Belle, 2018-2019.

See the [LICENSE](LICENSE) file for more details.
