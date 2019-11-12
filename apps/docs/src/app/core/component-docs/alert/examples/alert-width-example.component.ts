import { Component } from '@angular/core';
import { AlertService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-alert-width-example',
    templateUrl: './alert-width-example.component.html',
    styleUrls: ['alert-width-example.component.scss']
})
export class AlertWidthExampleComponent {

    constructor(public alertService: AlertService) {}

    openAlert1() {
        const alertContent = 'A dismissible warning-type alert with customizable width of 250px.';
        this.alertService.open(alertContent, {
            type: 'warning',
            width: '250px',
            dismissible: true,
            duration: 7500
        });
    }

    openAlert2() {
        const alertContent = 'A non-dismissible information-type alert with customizable width of 550px';
        this.alertService.open(alertContent, {
            type: 'information',
            width: '550px',
            dismissible: false,
            duration: 7500
        });
    }

    openAlert3() {
        const alertContent = 'A dismissible success-type alert with customizable width of 70vw';
        this.alertService.open(alertContent, {
            type: 'success',
            width: '70vw',
            dismissible: true,
            duration: 7500
        });
    }

    openAlert4() {
        const alertContent = ' A non-dismissible error-type alert with customizable (default) width of 100vw';
        this.alertService.open(alertContent, {
            type: 'error',
            width: '100vw',
            dismissible: false,
            duration: 7500
        });
    }
}
