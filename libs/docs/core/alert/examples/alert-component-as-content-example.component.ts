import { Component } from '@angular/core';
import { AlertContentComponent } from './alert-content.component';
import { AlertConfig, AlertService } from '@fundamental-ngx/core/alert';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'fd-alert-component-as-content-example',
    templateUrl: './alert-component-as-content-example.component.html',
    styleUrls: ['alert-component-as-content-example.component.scss'],
    providers: [DestroyedService]
})
export class AlertComponentAsContentExampleComponent {
    constructor(public alertService: AlertService, private readonly _destroy$: DestroyedService) {}

    openFromComponent(): void {
        this.alertService.open(AlertContentComponent, {
            type: 'warning',
            minWidth: '300px',
            mousePersist: true,
            duration: 7500,
            data: {
                label: 'This alert was opened by providing a component as content!'
            }
        } as AlertConfig);
    }

    openFromString(): void {
        const alertContent = 'This is the content! The alert is not dismissible, but will disappear after 7500ms.';
        this.alertService.open(alertContent, {
            type: 'information',
            dismissible: false,
            duration: 7500
        } as AlertConfig);
    }

    openFromTemplate(template): void {
        const alertRef = this.alertService.open(template, {
            type: 'success',
            duration: -1,
            data: {
                firstLine: 'This alert passes data to the template.',
                secondLine: 'It also has [duration]="-1" and will not disappear automatically.'
            }
        } as AlertConfig);

        alertRef.afterDismissed.pipe(takeUntil(this._destroy$)).subscribe(() => {
            // Do something after closing, receive data
            // You can also manually close this alert using alertRef.dismiss()
        });
    }
}
