<p align="center">
      <a href="https://github.com/SAP/fundamental-ngx" target="_blank" rel="noopener noreferrer">
            <img src="./assets/images/readme/temp_logo_sap_2.png" alt="Fundamental NGX logo">
      </a>
</p>

<p align="center">
      Fundamental NGX is a lightweight Angular component library for <a href="https://github.com/SAP/fundamental">SAP Fiori Fundamentals</a>.
</p>

<p align="center">
      <a href="https://travis-ci.org/SAP/fundamental-ngx">
            <img src="https://travis-ci.org/SAP/fundamental-ngx.svg?branch=develop" alt="Build Status">
      </a>
      <a href="https://www.npmjs.com/package/fundamental-ngx">
            <img src="https://badge.fury.io/js/fundamental-ngx.svg" alt="npm version">
      </a>
      <a href="https://ui-fundamentals.slack.com">
            <img src="https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack" alt="Slack Community">
      </a>
</p>


<p align="center">
:open_book:
<strong><a href="https://sap.github.io/fundamental-ngx/docs/home">Component Documentation</a></strong>
:open_book:
</p>

## Description

Fundamental NGX is a set of [Angular](https://angular.io/) components that implement the styles and patterns of the [SAP Fiori Fundamentals library](https://sap.github.io/fundamental/). SAP Fiori Fundamentals is a design system and HTML/CSS component library that is used to build consistent user experiences throughout the SAP product family. Fundamental NGX facilitates the use of this library for Angular.

The library is currently in beta and under heavy development.

## Requirements

To download and use Fundamental NGX, you will first need to install the [node package manager](https://www.npmjs.com/get-npm).

Fundamental NGX is intended for use with Angular 5 or newer.

Prior knowledge of Angular is recommended.

## Getting Started

For an existing Angular application,

1. **Install Fundamental-ngx and Fiori Fundamentals.**

      `npm install --save fiori-fundamentals fundamental-ngx`

2. **Include Fiori Fundamentals CSS in the `styles` array of the `angular.json` file.**

      `"./node_modules/fiori-fundamentals/dist/fiori-fundamentals.css"`

      *Note the path may be different if your CLI configuration is not in the root of your project directory or if you have set a custom root.*

3. **Import the modules you want to use.**

      To add the entire library, add

      `import { FundamentalNgxModule } from 'fundamental-ngx';`

      to your app's module definition. Also add `FundamentalNgxModule` to the `imports` array in the @NgModule declaration.

      To include an individual Angular Fundamental component in your application, you only need to import the relevant module. 
  
      For example, to use Alerts, add 

      `import { AlertModule } from 'fundamental-ngx/alert/alert.module';`

      to the file that declares the module you're adding alerts to. It can also be added to the app module declaration to be used site-wide. You also need to add `AlertModule` to your app or module's `imports` array.

4. **Add the component to your HTML.**

      `<fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)"> A warning type alert. </fd-alert>`

## Demo Application

The documentation serves as a demo application in the `docs/` directory. Run `ng serve` from the root of the repository to serve the app locally. The demo application utilizes the Angular Fundamental source code in this repository, so changes you make to any component source will be reflected in the demo app.

View the live demo [here](https://github.com/SAP/fundamental-ngx/tree/develop/docs).

## Tests

Fundamental NGX makes use of Jasmine and Karma for its unit tests. 

Run `ng test fundamental-ngx`. Append `--code-coverage` to generate code coverage documentation.

## Known Issues

There are no known major issues. 

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues) or write an email to fundamental@sap.com.

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](./CONTRIBUTING.md) documentation for contribution guidelines. Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

Check out the [NEW_COMPONENT.md](./NEW_COMPONENT.md) guide on building a new component for the library and creating the necessary documentation for your new component.

## License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v.2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-ngx/blob/master/LICENSE.txt).

## Similar Projects

[Fundamental-react](https://github.com/SAP/fundamental-react)

[Fundamental-vue](https://github.com/SAP/fundamental-vue)
