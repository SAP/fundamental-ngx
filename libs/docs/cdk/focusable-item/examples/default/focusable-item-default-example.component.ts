import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-focusable-item-default-example',
    templateUrl: './focusable-item-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FocusableItemDefaultExampleComponent {}
