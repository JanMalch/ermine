# Ermine [![Netlify Status](https://api.netlify.com/api/v1/badges/f2357bcb-5919-4809-96a2-5770e88d97db/deploy-status)](https://app.netlify.com/sites/ermine/deploys)

[Ermine](https://ermine.netlify.com/) is a simple web app that allows you to browse any GitHub repository in an IDE look.
You can easily open multiple files with syntax highlighting for a huge amount of languages, or view images and CSV tables!
Over 190 languages are supported for highlighting, with the help of [Prism.js](https://prismjs.com/).

>Check out the [source code](https://ermine.netlify.com/view?url=JanMalch/ermine).

## How it's build

Ermine is built with [Angular 7](https://github.com/angular/angular), [Angular Material](https://github.com/angular/components) and [GitHub API v4](https://developer.github.com/v4/).

The development process makes use of various Continuous Integration providers.

| Provider | Status | Tasks |
|--|--|--|
| [Travis CI](https://travis-ci.org/) | [![Build Status](https://travis-ci.org/JanMalch/ermine.svg?branch=master)](https://travis-ci.org/JanMalch/ermine) | Runs linter, tests and deploy |
| [Code Climate](https://codeclimate.com/) | [![Maintainability](https://api.codeclimate.com/v1/badges/b04281b3b88c9a655db5/maintainability)](https://codeclimate.com/github/JanMalch/ermine/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b04281b3b88c9a655db5/test_coverage)](https://codeclimate.com/github/JanMalch/ermine/test_coverage) | Ensures highest code quality | 
| [snyk](https://snyk.io/) | [![Known Vulnerabilities](https://snyk.io/test/github/JanMalch/ermine/badge.svg)](https://snyk.io/test/github/JanMalch/ermine) | Checks dependencies for vulnerabilities 

## Documentation

The documentation is created with [Compodoc](https://compodoc.app/) and is available [here](https://janmalch.github.io/ermine/).
