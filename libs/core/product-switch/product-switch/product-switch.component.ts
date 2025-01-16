import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    BasePopoverClass,
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ProductSwitchButtonDirective } from '../product-switch-button.directive';
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
    ],
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonComponent,
        PopoverBodyComponent,
        FdTranslatePipe,
        NgTemplateOutlet
    ]
})
export class ProductSwitchComponent extends BasePopoverClass {
    /** Placement of a popover. */
    @Input()
    placement: Placement = 'bottom-end';

    /** Whether the product switch is disabled. */
    @Input()
    disabled = false;

    /** @hidden */
    @ContentChild(ProductSwitchButtonDirective)
    customProductSwitchButton: ProductSwitchButtonDirective;
}
