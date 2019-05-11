import { Component } from '@angular/core';

@Component({
    selector: 'fd-alert-example',
    templateUrl: './alert-example.component.html',
    styles: [
        `
            fd-alert {
                margin-bottom: 12px;
            }
            fd-alert:last-child {
                margin: 0;
            }
        `
    ]
})
export class AlertExampleComponent {}
