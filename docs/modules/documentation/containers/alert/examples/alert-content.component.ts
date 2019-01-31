import { Component, Input, ViewChild } from '@angular/core';
import { AlertComponent } from '../../../../../../library/src/lib/alert/alert.component';

@Component({
    selector: 'fd-alert-content',
    template: `
        <fd-alert [dismissible]="true" [type]="alertType" #alert>
            {{alertText}}
        </fd-alert>
    `
})
export class AlertContentComponent {
    @ViewChild('alert') alert: AlertComponent;

    @Input() alertText: string;

    @Input() alertType: string;
}
