import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Placement } from '@fundamental-ngx/core/shared';
import { BasePopoverClass } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchComponent extends BasePopoverClass {
    @Input()
    placement: Placement = 'bottom-end';

    /** Input to set the aria label */
    @Input()
    ariaLabel = 'Product Switch';

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;
}
