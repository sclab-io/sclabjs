---

# SCLABjs

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> SCLAB client side javascript NPM Module for integrate with a SITE created by [SCLAB Studio](https://www.sclab.io)

> [Documentation](https://docs.sclab.io)


## Install

```bash
npm install sclabjs
```

## Usage

```ts
import { Sclab } from 'sclabjs';

// client side
Sclab.init("https://userSiteCode.sclab.io", ()=>{
  // ready

  // login
  Sclab.login('abc@sclab.io', '1234', (result: boolean)=>{
    if(result){
      // move to user page
    }else{
      // login error
    }
  });
});
```

## Client APIs

### init(siteURL, apiToken?, callback?)

#### siteURL

Type: `string`

Published site url of your SITE.

#### callback

Type: `function`

callback function when sclabjs ready to use

### login(email, password, callback)

#### email

Type: `string`

email address

#### password

Type: `string`

user password

#### callback

Type: `function`

callback function when login complete

### loginWithToken(loginToken, callback)

#### loginToken

Type: `string`

loginToken from REST API

#### callback

Type: `function`

callback function when login complete

### logout(callback)

#### callback

Type: `function`

callback function when logout complete


### kill()

clear Sclab

[build-img]:https://github.com/sclab-io/sclabjs/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/sclab-io/sclabjs/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/sclabjs
[downloads-url]:https://www.npmtrends.com/sclabjs
[npm-img]:https://img.shields.io/npm/v/sclabjs
[npm-url]:https://www.npmjs.com/package/sclabjs
[issues-img]:https://img.shields.io/github/issues/sclab-io/sclabjs
[issues-url]:https://github.com/sclab-io/sclabjs/issues
[codecov-img]:https://codecov.io/gh/sclab-io/sclabjs/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/sclab-io/sclabjs
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
