import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-object-status-default-example',
    templateUrl: './object-status-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectStatusDefaultExampleComponent {
    sizes = ['normal', 'byline'];
}
