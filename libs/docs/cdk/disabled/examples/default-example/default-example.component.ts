import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DisabledBehaviorDirective, FocusableItemDirective, FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fdk-disabled-default-example',
    templateUrl: './default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, DisabledBehaviorDirective, LinkComponent, FocusableListDirective, FocusableItemDirective]
})
export class DefaultExampleComponent {
    constructor() {}
}
