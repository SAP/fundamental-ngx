import { Component } from '@angular/core';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-default-example',
    templateUrl: './object-status-default-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    standalone: true,
    imports: [ObjectStatusModule]
})
export class ObjectStatusDefaultExampleComponent {}
