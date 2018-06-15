# Fundamental NGX - Angular components for [Fundamental UI](https://github.com/SAP/fundamental)

## Description
Fundamental NGX is a set of Angular components that utilize the Fundamental UI library, making it easy to get started developing Angular Fundamental apps.

## Requirements
In order to download and use this library, you'll need to install the node package manager.
https://www.npmjs.com/get-npm

Fundamental NGX is intended for use with Angular 5 or newer.  We assume the user has some knowledge of Angular before using this library.

## Download and Installation
Download Fundamental NGX and its peer dependencies:
`npm install --save @ng-bootstrap/ng-bootstrap fundamental-ui normalize.css fundamental-ngx`

Next you'll need to include the Fundamental UI CSS in your Angular application.  Open your `angular.json` file and add the following to the `styles` array:

`"./node_modules/fundamental-ui/dist/fundamental-ui.css"`

Note the path may be different if your CLI configuration is not in the root of your project directory or if you have set a custom root.

You have the option of importing all of Fundamental NGX at once, or you can import individual components as you need them.  To import the whole library, add:

`import { FundamentalNgxModule } from 'fundamental-ngx';`

To your app's module definition.  Also add `FundamentalNgxModule` to the `imports` array in the @NgModule declaration.

To include an individual Angular Fundamental component in your application, we only need to import the relevant module.  For example, if we wanted to use Alerts, we would add

`import { AlertModule } from 'fundamental-ngx/alert/alert.module';`

to the file that declares the module we're adding alerts to.  It can also be added to the app module declaration to be used site-wide.  Additionally, you'll need to add `AlertModule` to your app or module's `imports` array.

Lastly, simply add the component to your HTML!  

`
      <fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)">
        A dismissible warning type alert.
      </fd-alert>
`

## Demo Application
This repository contains a demo application in the `docs/` directory.  Simply run `ng serve` from the root of the repository to serve the app locally.  The demo app utilizes the Angular Fundamental source code in this repository, so changes you make to any component's source will be reflected in the demo app.

## Known Issues
Click [here](https://github.com/SAP/fundamental-ngx/issues) to view the current issues.

## How to obtain support
If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues)

## Contributing
In case you want to contribute, please, check the [CONTRIBUTING.md](./CONTRIBUTING.md) doc for contribution guidelines.

## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues)
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-ngx/blob/master/LICENSE.txt)
