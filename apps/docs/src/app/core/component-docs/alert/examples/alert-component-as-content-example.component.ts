import { Component } from '@angular/core';
import { AlertContentComponent } from './alert-content.component';
import { AlertService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-alert-component-as-content-example',
    templateUrl: './alert-component-as-content-example.component.html',
    styleUrls: ['alert-component-as-content-example.component.scss']
})
export class AlertComponentAsContentExampleComponent {
    constructor(public alertService: AlertService) {}

    openFromComponent() {
        this.alertService.open(AlertContentComponent, {
            type: 'warning',
            minWidth: '300px',
            mousePersist: true,
            duration: 7500,
            data: {
                label: 'This alert was opened by providing a component as content!'
            }
        });
    }

    openFromString() {
        const alertContent = 'This is the content! The alert is not dismissible, but will disappear after 7500ms.';
        this.alertService.open(alertContent, {
            type: 'information',
            dismissible: false,
            duration: 7500
        });
    }

    openFromTemplate(template): void {
        const alertRef = this.alertService.open(template, {
            type: 'success',
            duration: -1,
            data: {
                firstLine: 'This alert passes data to the template.',
                secondLine: 'It also has [duration]="-1" and will not disappear automatically.'
            }
        });

        alertRef.afterDismissed.subscribe((data) => {
            // Do something after closing, receive data
            // You can also manually close this alert using alertRef.dismiss()
        });
    }
}
