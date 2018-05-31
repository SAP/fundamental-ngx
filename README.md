# NgxFundamental

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

### Usage

While this project is still in development, it will be stored on the private SAP hybris npm registry.  If you have not set up your `~/.npmrc` node configuration to pull from this registry, you'll need to follow the instructions at <https://repository.hybris.com/webapp/#/home> to do so.  Log in and search for "npm-repository" in the "Set Me Up" search box for details.

Then, to install the library, run: 

`npm install --save fundamental-ngx`

This will add Angular Fundamental to your node_modules dependencies.

Next we need to include the Fundamental UI CSS in your Angular application.  Open your `angular.json` file and add the following to the `styles` array:

`"./node_modules/fundamental-ui/dist/fundamental-ui.css"`

Note the path may be different if your CLI configuration is not in the root of your project directory or if you have set a custom root.

To include an Angular Fundamental component in your application, we'll need to import it in your app or module declaration.  For example, if we wanted to use Alerts, we would add

`import { AlertModule } from 'fundamental-ngx/alert/alert.module';`

to the file that declares the module we're adding alerts to.  It can also be added to the app declaration to be used site-wide.  Additionally, you'll need to add `AlertModule` to your module's `imports` array.

Lastly, simply add the component to your HTML!  

`
      <fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)">
        A dismissible warning type alert.
      </fd-alert>
`

### Demo Application

This repository contains a demo application in the `docs/` directory.  Simply run `ng serve` from the root of the repository to serve the app locally.  The demo app utilizes the Angular Fundamental source code in this repository, so changes you make to any component's source will be reflected in the demo app.
