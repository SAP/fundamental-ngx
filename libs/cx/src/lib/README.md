# @Fundamental-NGX/CX

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fcx.svg)](//www.npmjs.com/package/@fundamental-ngx/cx)
![Build Status](https://github.com/SAP/fundamental-ngx/actions/workflows/on-push-or-pull.yml/badge.svg?branch=main)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/cx?label=npm%20downloads)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Content

-   [1. Description](#1)
-   [2. Requirements](#2)
-   [3. Versioning](#3)
-   [4. Getting Started](#4)
-   [5. Known Issues](#5)
-   [6. Support](#6)
-   [7. Contributing](#7)
-   [8. License](https://github.com/SAP/fundamental-ngx/blob/main/LICENSE.txt)
-   [9. Similar Projects](#8)

## <a name="1"></a>1. Description

The `@fundamental-ngx/cx` library is a set of [Angular](https://angular.io/) components built using [Fundamental Library Styles](https://sap.github.io/fundamental-styles/).

The Fundamental Library Styles is a design system and HTML/CSS component library used to build modern product user experiences with the SAP look and feel.

See [Component Documentation](https://sap.github.io/fundamental-ngx/docs/home) for examples and API details.

## <a name="2"></a>2. Requirements

To download and use Fundamental Library for Angular, you will first need to install the [node package manager](https://www.npmjs.com/get-npm).

Fundamental Library for Angular is intended for use with Angular 8 or newer.

Prior knowledge of Angular is recommended, to use the fundamental-ngx library.

## <a name="3"></a>3. Versioning

Check the [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes) for the latest patches changes.

## <a name="4"></a>4. Getting Started

For an existing Angular CLI application,

0. **Video tutorial**
   [How to use the Fundamental Core Library](https://www.youtube.com/watch?v=i4VIiuzD2Fg)

1. **Install Fundamental-NGX.**
   `ng add @fundamental-ngx/cx`
   For models prior to 0.10 use `fundamental-ngx`

    _If you do not use the Angular CLI or if this command does not work for you, please see the [full installation guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide)._

1. **Edit your tsconfig.**
   Edit the `target` in your `tsconfig.json` to `es5`. The library is incompatible with later versions.
1. **Import the modules you want to use.**

    To add the entire library, add the following import to your main application module.

    ```typescript
    import { FundamentalNgxCxModule } from '@fundamental-ngx/cx';

    @NgModule({
        ...
        imports: [FundamentalNgxCxModule],
    })
    export class DemoModule { }
    ```

    To include an individual Angular Fundamental component in your application, you only need to import the relevant module.

    For example, to use Switchs, add the following import to your main application module.

    ```typescript
    import { CheckboxModule } from '@fundamental-ngx/cx';
    ```

## <a name="5"></a>5. Known Issues

Please see [Issues](https://github.com/SAP/fundamental-ngx/issues).

## <a name="6"></a>6. Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## <a name="7"></a>7. Contributing

If you want to contribute, please check the [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/main/NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.
