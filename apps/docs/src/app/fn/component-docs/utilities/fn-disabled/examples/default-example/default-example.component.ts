import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-fn-disabled-example',
    templateUrl: './default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultExampleComponent {
    constructor() {}
}
