import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DisabledBehaviorDirective, FocusableItemDirective, FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { LinkComponent } from '@fundamental-ngx/core/link';

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
