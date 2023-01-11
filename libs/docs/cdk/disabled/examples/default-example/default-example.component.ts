import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-cdk-disabled-example',
    templateUrl: './default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultExampleComponent {
    constructor() {}
}
