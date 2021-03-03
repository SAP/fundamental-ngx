import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Placement } from '../../popover/popover-position/popover-position';
import { BasePopoverClass } from '../../popover/base/base-popover.class';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchComponent extends BasePopoverClass {
    @Input ()
    placement: Placement = 'bottom-end';

    /** Input to set the aria label */
    @Input ()
    ariaLabel = 'Product Switch';

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;
}
