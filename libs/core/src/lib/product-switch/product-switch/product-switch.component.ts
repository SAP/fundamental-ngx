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
    set ariaLabel(value: string) {
        console.warn(
            "Property ariaLabel is deprecated. Use i18n capabilities 'coreProductSwitch.ariaLabel' key instead."
        );
        this._ariaLabel = value;
    }

    get ariaLabel(): string {
        return this._ariaLabel;
    }

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;

    /** @hidden */
    private _ariaLabel: string;
}
