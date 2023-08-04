import { Component, DestroyRef } from '@angular/core';
import { AlertContentComponent } from './alert-content.component';
import { AlertConfig, AlertService } from '@fundamental-ngx/core/alert';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fd-alert-component-as-content-example',
    templateUrl: './alert-component-as-content-example.component.html',
    styleUrls: ['alert-component-as-content-example.component.scss']
})
export class AlertComponentAsContentExampleComponent {
    constructor(public alertService: AlertService, private readonly _destroyRef: DestroyRef) {}

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

        alertRef.afterDismissed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            // Do something after closing, receive data
            // You can also manually close this alert using alertRef.dismiss()
        });
    }
}
