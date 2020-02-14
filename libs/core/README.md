# @Fundamental-NGX/Core

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fcore.svg)](//www.npmjs.com/package/@fundamental-ngx/core)
[![Minified Size](https://badgen.net/bundlephobia/min/%40fundamental-ngx%2Fcore)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fcore)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/%40fundamental-ngx%2Fcore)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fcore)
[![Build Status](https://travis-ci.org/SAP/fundamental-ngx.svg?branch=master)](https://travis-ci.org/SAP/fundamental-ngx)
[![Coverage Status](https://coveralls.io/repos/github/SAP/fundamental-ngx/badge.svg?branch=master)](https://coveralls.io/github/SAP/fundamental-ngx?branch=master)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)

## Content
* [1. Description](#1)
* [2. Requirements](#2)
* [3. Versioning](#3)
* [4. Getting Started](#4)
* [5. Known Issues](#5)
* [6. Support](#6)
* [7. Contributing](#7)
* [8. License](#8)
* [9. Similar Projects](#9)

## <a name="1"></a>1. Description

The `@fundamental-ngx/core` library is a set of [Angular](https://angular.io/) components built using [SAP Fundamental Styles](https://sap.github.io/fundamental-styles/).

The SAP Fundamental Styles library is a design system and HTML/CSS component library used to build modern product user experiences with the SAP look and feel.

See [Component Documentation](https://sap.github.io/fundamental-ngx/docs/home) for examples and API details.

## <a name="2"></a>2. Requirements

To download and use Fundamental Library for Angular, you will first need to install the [node package manager](https://www.npmjs.com/get-npm).

Fundamental Library for Angular is intended for use with Angular 8 or newer.

Prior knowledge of Angular is recommended, to use the fundamental-ngx library.

## <a name="3"></a>3. Versioning

npm package [fundamental-ngx](https://npmjs.com/package/fundamental-ngx) version `0.10.0` is compiled with Angular 7. It supports Angular 6 and 7 versions.
 This version is not supported by bug fixes. 

npm package [@fundamental-ngx/core](https://www.npmjs.com/package/@fundamental-ngx/core) version `0.11.x` is compiled with Angular 8.
It supports Angular 8 version and newer. This version will have merged some bug-fixes.

npm package [@fundamental-ngx/core](https://www.npmjs.com/package/@fundamental-ngx/core) version `0.12.y` is compiled with Angular 8.
It supports the current Angular 8 version and newer. This version also can be used along with enabled IVY.

npm package [@fundamental-ngx/core](https://www.npmjs.com/package/@fundamental-ngx/core) version `0.13.z` is compiled with Angular 8.
It supports the current Angular 8 version and newer. This version also can be used along with enabled IVY.

Check the [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes) for the latest patches changes.


## <a name="4"></a>4. Getting Started

For an existing Angular CLI application,

0. **Video tutorial**
[How to use the Fundamental Core Library](https://www.youtube.com/watch?v=i4VIiuzD2Fg)

1. **Install Fundamental-NGX.**
   `ng add @fundamental-ngx/core`
   For models prior to 0.10 use `fundamental-ngx`

    _If you do not use the Angular CLI or if this command does not work for you, please see the [full installation guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide)._

2. **Import the modules you want to use.**

    To add the entire library, add the following import to your main application module.

    ```javascript
    import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

    @NgModule({
        ...
        imports: [FundamentalNgxCoreModule],
    })
    export class DemoModule { }
    ```

    To include an individual Angular Fundamental component in your application, you only need to import the relevant module.

    For example, to use Toggles, add the following import to your main application module.

    ```javascript
    import { ToggleModule } from '@fundamental-ngx/core’';
    ```

    For models prior to 0.10 use `fundamental-ngx`

    ```
    import { ToggleModule } from '@fundamental-ngx/core';

    @NgModule({
        ...
        imports: [ToggleModule],
    })
    export class DemoModule { }
    ```

3. **Add the component to your HTML.**

    ```html
    <fd-toggle [size]="'l'" [(checked)]="myValue">Large Toggle</fd-toggle>
    ```


## <a name="5"></a>5. Known Issues

Please see [Issues](https://github.com/SAP/fundamental-ngx/issues).

## <a name="6"></a>6. Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## <a name="7"></a>7. Contributing

If you want to contribute, please check the [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/master/CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/master/NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.

## <a name="8"></a>8. License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v.2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-ngx/blob/master/LICENSE.txt).

## <a name="9"></a>9. Similar Projects

[Fundamental-react](https://github.com/SAP/fundamental-react) - React implementation of SAP Fundamental Styles
