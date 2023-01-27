import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Placement } from '@fundamental-ngx/core/shared';
import { BasePopoverClass } from '@fundamental-ngx/core/popover';
import { FD_PRODUCT_SWITCH_COMPONENT } from '../tokens';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_PRODUCT_SWITCH_COMPONENT,
            useExisting: ProductSwitchComponent
        }
    ]
})
export class ProductSwitchComponent extends BasePopoverClass {
    /** Placement of a popover. */
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
