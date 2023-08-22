import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { DisabledBehaviorDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fundamental-ngx-cdk-disabled-example',
    templateUrl: './default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonModule, DisabledBehaviorDirective, LinkComponent, FocusableListDirective, FocusableItemDirective]
})
export class DefaultExampleComponent {
    constructor() {}
}
