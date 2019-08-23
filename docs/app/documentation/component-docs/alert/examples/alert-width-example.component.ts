import { Component } from '@angular/core';
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
export class AlertWidthExampleComponent {}
