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
            dismissible: true,
            type: 'warning',
            data: {
                alertText: 'Example Error Alert Text'
            }
        });
    }

    openErrorComponentAsContentAlert() {
        this.alertService.open('lol u suck', {
            dismissible: true,
            type: 'success',
            data: {
                alertText: 'Example Error Alert Text'
            }
        });
    }
    constructor(private alertService: AlertService) {}
}
