import { Component } from '@angular/core';
import { AlertService } from '../../../../../../library/src/lib/alert/alert-service/alert.service';

@Component({
    selector: 'fd-alert-width-example',
    templateUrl: './alert-width-example.component.html',
    styles: [`
        fd-alert {
            margin-top: 12px;
        }
        fd-alert:first-child {
            margin: 0;
        }
        button {
            margin-top: 12px;
            margin-right: 12px;
        }
    `]
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
