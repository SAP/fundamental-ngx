# Fundamental Library for Angular

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fplatform.svg)](//www.npmjs.com/package/@fundamental-ngx.platform)
[![Minified Size](https://badgen.net/bundlephobia/min/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/%40fundamental-ngx%2Fplatform)](https://bundlephobia.com/result?p=%40fundamental-ngx%2Fplatform)
[![Build Status](https://travis-ci.org/SAP/fundamental-ngx.svg?branch=main)](https://travis-ci.org/SAP/fundamental-ngx)
[![Coverage Status](https://coveralls.io/repos/github/SAP/fundamental-ngx/badge.svg?branch=main)](https://coveralls.io/github/SAP/fundamental-ngx?branch=main)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)

## Description

The `@fundamental-ngx/platform` is built on top of the `@fundamental-ngx/core` to enhance existing functionality and
to provide a higher abstraction for the components by hiding most of the internal implementation details. The goal is
to create a layer which is closer to application development and not to the library creators.

Since there is a plan to generate UI programatically then components must be instantiable (they cannot be directives).

## Design

Each component that is developed here needs to have corresponding [technical specification](https://github.com/SAP/fundamental-ngx/wiki/Platform-Library-Home), where we need to agree on several things:

-   Component Signature
-   We try to capture common things among components
-   Functionality
-   We decide how much extensible the component needs to be.

As already mentioned above platform the goal is try to be closer to application developer as well as make it more ready for
enterprise use.

-   Defining component model and how we work with data
-   Pre-defined layouts (Dashboard, detail page, main/detail page, Search/result page).

This `Platform UI library` is not going to be only about UI but it needs to also capture other aspects:

-   Application state UI
-   Bootstrapping and Configuration
-   Communication with the backend system.

### Example:

This example captures several things:

a). How we abstract from assembly that me as developer I don't deal with layouting of elements for labels, contrals, hints, etc..

b). Assembly like this gives pretty big space in terms of different layouts that we want to support in the application (1 column, 2 columns)

c). If we need to group information into sections

d). How we are handling and forms errors

e). Dropdown usage. Everything is heppening inside the component that manages the iteration of the items we just pass list of values.

```html
<fdp-form-group
    [isFiveZoneLayout]="true"
    labelLayout="floating"
    [formGroup]="fg"
    [errorHanlding]="'navigate'"
    (onSubmit)="save($event)"
    (navigateToError)="onGoToError($event)"
>
    <fdp-form-field label="email" id="email" zone="left">
        <fdp-input type="email" placeholder="email" [required]="true"></fdp-input>
    </fdp-form-field>

    <fdp-form-field
        reqiuire="true"
        label="My Favorite Colors"
        id="colors"
        hint="Pick one of your favorite color"
        zone="right"
    >
        <fdp-select [list]="myColors"></fdp-select>
    </fdp-form-field>

    <fdp-form-field label="Description" id="desription" zone="bottom">
        <fdp-text-area [autoSizeEnabled]="true"></fdp-text-area>
    </fdp-form-field>
</fdp-form-group>
```

```html
<fdp-form-group [isFiveZoneLayout]="true" labelLayout="floating" [formGroup]="fg" [errorHanlding]="'navigate'">
    <fdp-form-section title="Basic Information">
        <fdp-form-field label="email" id="email" zone="left">
            <fdp-input type="email" placeholder="email" [required]="true"></fdp-input>
        </fdp-form-field>
        <fdp-form-field
            reqiuire="true"
            label="My Favorite Colors"
            id="colors"
            hint="Pick one of your favorite color"
            zone="right"
        >
            <fdp-select [list]="myColors"></fdp-select>
        </fdp-form-field>
    </fdp-form-section>
    <fdp-form-field label="Description" id="desription" zone="bottom">
        <fdp-text-area [autoSizeEnabled]="true"></fdp-text-area>
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

    Version 0.32.0 brings new way of importing individual modules, which is prefered way.

    ```typescript
    import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
    ```

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

## Tests

Fundamental Library for Angular makes use of Jasmine and Karma for its unit tests.

Run `ng test platform`. Append `--code-coverage` to generate code coverage documentation.

For models prior to 0.11.1 use `fundamental-ngx`

### Using Jest for running tests in the host application

If you're using Jest for running tests in the host application some additional steps needed to be done due to the Jest issues with importing ES modules.

1. Install `lodash` package as the development dependency.
   `npm i -D lodash`
   Using yarn?
   `yarn add -D lodash`
   Don't worry, as we're installing package as the development dependency it won't increase build size.

2. Adjust Jest config (`jest.config.js`) by adding these lines:
    ```
    moduleNameMapper: {
      "^lodash-es$": "lodash"
    },
    ```

That's it, now your tests should be working fine. In case of any issues please raise the issue in the github repository.

## Versioning

The `@fundamental-ngx/platform` library follows [Semantic Versioning](https://semver.org/). These components strictly adhere to the `[MAJOR].[MINOR].[PATCH]` numbering system (also known as `[BREAKING].[FEATURE].[FIX]`).

For models prior to 0.11.1 use `fundamental-ngx`

Merges to the `main` branch will be published as a prerelease. Prereleases will include an **rc** version (_e.g._ `[MAJOR].[MINOR].[PATCH]-rc.[RC]`).

## Known Issues

Please see [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/main/NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.
