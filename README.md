# Fundamental NGX - Angular components for [Fundamental UI](https://github.com/SAP/fundamental)

## Description
### Requirements
### Download and Installation
### Configuration
## Limitations
At the time this version was released, there are no known limitations

### Known Issues
## How to obtain support
If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues)

### Contributing
In case you want to contribute, please, check the [CONTRIBUTING.md](./CONTRIBUTING.md) doc for contribution guidelines.

### To-Do (upcoming changes)
### License

### Usage
We need to include the Fundamental UI CSS in your Angular application.  Open your `angular.json` file and add the following to the `styles` array:

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
