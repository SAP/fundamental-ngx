import { Component } from '@angular/core';
import { AlertRef } from '@fundamental-ngx/core';
@Component({
    selector: 'fd-alert-inline-example',
    templateUrl: './alert-inline-example.component.html',
    styleUrls: ['alert-inline-example.component.scss']
})
export class AlertInlineExampleComponent {
    constructor (
        public alertRef: AlertRef
    ) {}

}
