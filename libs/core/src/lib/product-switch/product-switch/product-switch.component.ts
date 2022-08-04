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

    /**
     * @deprecated use i18n capabilities instead
     * Input to set the aria label */
    @Input()
    ariaLabel: string;

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;
}
