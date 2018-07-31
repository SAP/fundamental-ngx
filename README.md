# Fundamental NGX - Angular components for [Fundamental UI](https://github.com/SAP/fundamental)

## Description

Fundamental NGX is a set of Angular components that utilize the Fundamental UI library, making it easy to start developing Angular Fundamental apps.

## Requirements

To download and use this library, you first need to install the node package manager.
https://www.npmjs.com/get-npm

Fundamental NGX is intended for use with Angular 5 or newer. You should have some knowledge of Angular before using this library.

## Download and Installation

#### 1. Download Fundamental NGX and its peer dependencies:

`npm install --save @ng-bootstrap/ng-bootstrap fundamental-ui@1.0.0 fundamental-ngx`

#### 2. Include the Fundamental UI CSS in your Angular application. Open your `angular.json` file and add the following to the `styles` array:

`"./node_modules/fundamental-ui/dist/fundamental-ui.css"`

Note the path may be different if your CLI configuration is not in the root of your project directory or if you have set a custom root.

#### 3. You can import all of Fundamental NGX at once, or you can import individual components as you need them. To import the whole library, add:

`import { FundamentalNgxModule } from 'fundamental-ngx';`

To your app's module definition. Also add `FundamentalNgxModule` to the `imports` array in the @NgModule declaration.

To include an individual Angular Fundamental component in your application, you only need to import the relevant module. For example, to use Alerts, add

`import { AlertModule } from 'fundamental-ngx/alert/alert.module';`

to the file that declares the module you're adding alerts to. It can also be added to the app module declaration to be used site-wide. You also need to add `AlertModule` to your app or module's `imports` array.

#### 4. Add the component to your HTML.

`<fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)"> A dismissible warning type alert. </fd-alert>`

## Demo Application

This repository contains a demo application in the `docs/` directory. Run `ng serve` from the root of the repository to serve the app locally. The demo app utilizes the Angular Fundamental source code in this repository, so changes you make to any component's source will be reflected in the demo app.

## Known Issues

Click [here](https://github.com/SAP/fundamental-ngx/issues) to view the current issues.

## How to obtain support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues)

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](./CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

## License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-ngx/blob/master/LICENSE.txt)
