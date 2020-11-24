import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';
import {Placement} from 'popper.js';
import { BasePopoverClass } from '../../popover/base/base-popover.class';

@Component({
    selector: 'fd-product-switch',
    templateUrl: './product-switch.component.html',
    styleUrls: ['./product-switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSwitchComponent extends BasePopoverClass {
    @Input ()
    placement: Placement = 'bottom-end'

    /**Input to set the aria label */
    @Input ()
    ariaLabel = 'popover-button';

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;
}
