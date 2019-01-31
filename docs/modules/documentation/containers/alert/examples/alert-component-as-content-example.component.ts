import { Component } from '@angular/core';
import { AlertService } from '../../../../../../library/src/lib/alert/alert.service';
import { AlertContentComponent } from './alert-content.component';

@Component({
    selector: 'fd-alert-component-as-content-example',
    template: `
        <button fd-button (click)="openWarningComponentAsContentAlert()">Launch Warning Component As Content Alert</button>
        <button fd-button (click)="openErrorComponentAsContentAlert()">Launch Error Component As Content Alert</button>
    `,
    styles: [
        `
            .fd-button {
                display: block;
                margin: 10px;
            }
        `
    ]
})
export class AlertComponentAsContentExampleComponent {
    openWarningComponentAsContentAlert() {
        this.alertService.open(AlertContentComponent, {
            alertText: 'Example Warning Alert Text',
            alertType: 'warning'
        });
    }

    openErrorComponentAsContentAlert() {
        this.alertService.open(AlertContentComponent, {
            alertText: 'Example Error Alert Text',
            alertType: 'error'
        });
    }
    constructor(private alertService: AlertService) {}
}
