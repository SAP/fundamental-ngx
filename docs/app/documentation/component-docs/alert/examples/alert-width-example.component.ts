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
        }
    `]
})
export class AlertWidthExampleComponent {

    constructor(public alertService: AlertService) {}

    openDynamicAlert() {
        const alertContent = 'This dismissible information-type alert with customizable width of 75%.';
        this.alertService.open(alertContent, {
            type: 'information',
            dismissible: true,
            duration: 7500
        });
    }
}
