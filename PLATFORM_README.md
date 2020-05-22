# Fundamental Library for Angular

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fplatform.svg)](//www.npmjs.com/package/@fundamental-ngx.platform)
[![Minified Size](https://badgen.net/bundlephobia/min/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Build Status](https://travis-ci.org/SAP/fundamental-ngx.svg?branch=master)](https://travis-ci.org/SAP/fundamental-ngx)
[![Coverage Status](https://coveralls.io/repos/github/SAP/fundamental-ngx/badge.svg?branch=master)](https://coveralls.io/github/SAP/fundamental-ngx?branch=master)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)

## Description

The `@fundamental-ngx/platform` is built on top of the `@fundamental-ngx/core` to enhance existing functionality.

Provide a higher abstraction for the components by hiding most of the internal implementation details which boosts developer productivity.

Components must be instantiable programmatically.

Enterprise readiness:

1. Working with data( reactive stream over the array, Data sources over the reactive steam)

2. Layouts (Dashboard, detail page, master/detail page, Search/result page).

It is not about UI:

1. Application state UI
    2. Bootstrapping and Configuration
    3. Communication with the backend system.

Example:

This example captures several things:

a). How we abstract form assembly that me as developer I dont deal with layouting of elements for labels, controls, hints, etc..

b). Assembly like this gives pretty big space in terms of different layouts that we want to support in the application (1 colum, 2 colums)

c). If we need to group information into sections

d). How we are handling and forms errors

e). Dropdown usage. Everything is happening inside the component that manages the iteration of the items we just pass list of values.

```
<fdp-form-group [isFiveZoneLayout]="true" labelLayout="floating"
                    [formGroup]="fg" [errorHanlding]="'navigate'"
                    (onSubmit)="save($event)" (navigateToError)="onGoToError($event)">

    <fdp-form-field label="email" id="email" zone="left">
        <fdp-input type="email" placeholder="email" [required]="true"></fdp-input>
    </fdp-form-field>

    <fdp-form-field reqiuire="true" label="My Favorite Colors" id="colors" hint="Pick one of your favorite color" zone="right">
        <fdp-select [list]="myColors"></fdp-select>
    </fdp-form-field>

    <fdp-form-field label="Description" id="desription" zone="bottom">
        <fdp-text-area [autoSizeEnabled]="true"></fdp-text-area>
    </fdp-form-field>
    </fdp-form-group>
```

```
    <fdp-form-group [isFiveZoneLayout]="true" labelLayout="floating"
                        [formGroup]="fg" [errorHanlding]="'navigate'">
        
        <fdp-form-section title="Basic Information">
        <fdp-form-field label="email" id="email" zone="left">
            <fdp-input type="email" placeholder="email" [required]="true"></fdp-input>
        </fdp-form-field>
        <fdp-form-field reqiuire="true"
                        label="My Favorite Colors"
                        id="colors" hint="Pick one of your favorite color" zone="right">
            <fdp-select [list]="myColors"></fdp-select>
        </fdp-form-field>
    </fdp-form-section>
        <fdp-form-field label="Description" id="desription" zone="bottom">
            <fdp-text-area [autoSizeEnabled]="true"></fdp-text-area>
        </fdp-form-field>
    </fdp-form-group>
```

## API Reference

See [Component Documentation](https://sap.github.io/fundamental-ngx/docs/platform/home) for examples and API details.

## Requirements

To download and use Fundamental Library for Angular, you will first need to install the [node package manager](https://www.npmjs.com/get-npm).

Fundamental Library for Angular is intended for use with Angular 8 or newer.

Prior knowledge of Angular is recommended.

## Getting Started

For an existing Angular CLI application,

1. **Install Fundamental-NGX.**
   `ng add @fundamental-ngx/platform`
   For models prior to 0.11.1 use `fundamental-ngx`

    _If you do not use the Angular CLI or if this command does not work for you, please see the [full installation guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide)._

2. **Import the modules you want to use.**

    To add the entire library, add the following import to your main application module.

    ```javascript

    import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

    @NgModule({
        ...
        imports: [FundamentalNgxPlatformModule],
    })
    export class DemoModule { }
    ```

    To include an individual Angular Fundamental component in your application, you only need to import the relevant module.

    For example, to use Link, add the following import to your main application module.

    ```javascript
    import { PlatformLinkModule } from '@fundamental-ngx/platform';
    ```

    Note: Be careful while importing the entire `FundamentalNgxPlatformModule` as it loads all modules; we recommend to only import relevant modules as needed.

    For models prior to 0.11.1 use `fundamental-ngx`

    ```javascript
    import { PlatformLinkModule } from '@fundamental-ngx/platform';

    @NgModule({
    ...
    imports: [PlatformLinkModule],
    })
    export class DemoModule { }
    ```

3. **Add the component to your HTML.**

    ```html
    <fdp-link [href]="'http://www.google.com'" [title]="'Extra info as tooltip text and aria-label'">
        Standard Link
    </fdp-link>
    ```

4. **To add support for i18n**

    To mark a text for translation, use [Angular's i18n marker](https://angular.io/guide/i18n#mark-text-with-the-i18n-attribute).

    For example, to translate the button text, add `i18n` on the element `fdp-button`:

    ```html
    <fdp-button i18n="@@emphasizedBtn" [type]="'emphasized'">Emphasized Button</fdp-button>
    ```

    It is recommended to give ID to the marker like `@@emphasizedBtn` for easier tracking in the extracted `messages.xlf` file.

    Note: Some components allow you to provide data imperatively through an array of objects like `[list]="seasons"` in the below example:

    ```html
    <fdp-radio-group [id]="'radio1'" [name]="'radio1'" [list]="seasons" [value]="'Summer'" formControlName="example1">
    </fdp-radio-group>
    ```

    When data is provided like this (probably coming from a db or backend server), it is left to the application to provide for the translated
    text. Providing i18n markers as shown in the previous example will not work as this is a limitation of Angular's i18n for now.

## Tests

Fundamental Library for Angular makes use of Jasmine and Karma for its unit tests.

Run `ng test @fundamental-ngx/platform`. Append `--code-coverage` to generate code coverage documentation.

For models prior to 0.11.1 use `fundamental-ngx`

## Versioning

The `@fundamental-ngx/platform` library follows [Semantic Versioning](https://semver.org/). These components strictly adhere to the `[MAJOR].[MINOR].[PATCH]` numbering system (also known as `[BREAKING].[FEATURE].[FIX]`).

For models prior to 0.11.1 use `fundamental-ngx`

Merges to the `master` branch will be published as a prerelease. Prereleases will include an **rc** version (_e.g._ `[MAJOR].[MINOR].[PATCH]-rc.[RC]`).

## Known Issues

Please see [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/master/CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/master/NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.
