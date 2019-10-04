import { Component } from '@angular/core';
@Component({
    selector: 'fd-alert-inline-example',
    templateUrl: './alert-inline-example.component.html',
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
export class AlertInlineExampleComponent {}
