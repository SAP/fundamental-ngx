# Fundamental NGX

[![npm version](https://badge.fury.io/js/fundamental-ngx.svg)](//www.npmjs.com/package/fundamental-ngx)
[![Minified Size](https://badgen.net/bundlephobia/min/fundamental-ngx)](https://bundlephobia.com/result?p=fundamental-ngx)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/fundamental-ngx)](https://bundlephobia.com/result?p=fundamental-ngx)
[![Build Status](https://travis-ci.org/SAP/fundamental-ngx.svg?branch=master)](https://travis-ci.org/SAP/fundamental-ngx)
[![Coverage Status](https://coveralls.io/repos/github/SAP/fundamental-ngx/badge.svg?branch=master)](https://coveralls.io/github/SAP/fundamental-ngx?branch=master)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)

## Description

The `fundamental-ngx` library is a set of [Angular](https://angular.io/) components built using [SAP Fundamental Styles](https://sap.github.io/fundamental-styles/).

The SAP Fundamental Styles library is a design system and HTML/CSS component library used to build modern product user experiences with the SAP look and feel.

## API Reference

See [Component Documentation](https://sap.github.io/fundamental-ngx/docs/home) for examples and API details.

## Requirements

To download and use Fundamental NGX, you will first need to install the [node package manager](https://www.npmjs.com/get-npm).

Fundamental NGX is intended for use with Angular 5 or newer.

Prior knowledge of Angular is recommended.

## Getting Started

For an existing Angular CLI application,

1. **Install Fundamental-NGX.**

    `ng add fundamental-ngx`
    
    *If you do not use the Angular CLI or if this command does not work for you, please see the [full installation guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide).*

3. **Import the modules you want to use.**

    To add the entire library, add the following import to your main application module.

    ```javascript
    import { FundamentalNgxModule } from 'fundamental-ngx';
    
    @NgModule({
        ...
        imports: [FundamentalNgxModule],
    })
    export class DemoModule { }
    ```

    To include an individual Angular Fundamental component in your application, you only need to import the relevant module.

    For example, to use Toggles, add the following import to your main application module.

    ```javascript
    import { ToggleModule } from 'fundamental-ngx';
    
    @NgModule({
        ...
        imports: [ToggleModule],
    })
     export class DemoModule { }
    ```

4. **Add the component to your HTML.**

    ```html
    <fd-toggle [size]="'l'" [(checked)]="checked">Large Toggle</fd-toggle>
    ```

## Tests

Fundamental NGX makes use of Jasmine and Karma for its unit tests.

Run `ng test fundamental-ngx`. Append `--code-coverage` to generate code coverage documentation.

## Versioning

The `fundamental-ngx` library follows [Semantic Versioning](https://semver.org/). These components strictly adhere to the `[MAJOR].[MINOR].[PATCH]` numbering system (also known as `[BREAKING].[FEATURE].[FIX]`).

Merges to the `master` branch will be published as a prerelease. Prereleases will include an **rc** version (_e.g._ `[MAJOR].[MINOR].[PATCH]-rc.[RC]`).

## Known Issues

Please see [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/master/CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/master/NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v.2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-ngx/blob/master/LICENSE.txt).

## Similar Projects

[Fundamental-react](https://github.com/SAP/fundamental-react) - React implementation of SAP Fundamental Styles

[Fundamental-vue](https://github.com/SAP/fundamental-vue) - Vue implementation of SAP Fundamental Styles
