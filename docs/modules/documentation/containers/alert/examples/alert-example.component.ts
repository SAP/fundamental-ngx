import { Component } from '@angular/core';
import { AlertService } from '../../../../../../library/src/lib/alert/alert.service';
@Component({
    selector: 'fd-alert-example',
    templateUrl: './alert-example.component.html',
    styles: [
        `
            .fd-button {
                display: block;
                margin: 10px;
            }
        `
    ]
})
export class AlertExampleComponent {

    constructor(private alertService: AlertService) {}

    closeAlert(id: string) {
        console.log(`Alert with id ${id} has triggered a close event!`);
    }

    showAlert(alert) {
        this.alertService.open(alert);
    }

}
