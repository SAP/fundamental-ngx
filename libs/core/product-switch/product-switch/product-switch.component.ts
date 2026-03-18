import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    input,
    model,
    output,
    signal
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective, ContentDensityMode } from '@fundamental-ngx/core/content-density';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent,
    TriggerConfig
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
        NgTemplateOutlet,
        ContentDensityDirective
    ],
    host: {
        '[class.fd-popover-custom--disabled]': 'disabled()'
    }
})
export class ProductSwitchComponent {
    /** Placement of the product switch dropdown. */
    readonly placement = input<Placement>('bottom-end');

    /** Whether the product switch is disabled. */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Whether the product switch should close when the escape key is pressed. */
    readonly closeOnEscapeKey = input(true, { transform: booleanAttribute });

    /** Whether the product switch should close when a click is made outside its boundaries. */
    readonly closeOnOutsideClick = input(true, { transform: booleanAttribute });

    /** Whether the product switch dropdown should have an arrow. */
    readonly noArrow = input(true, { transform: booleanAttribute });

    /** Whether to wrap content with fd-scrollbar directive. */
    readonly disableScrollbar = input(false, { transform: booleanAttribute });

    /** The trigger events that will open/close the product switch. */
    readonly triggers = input<(string | TriggerConfig)[]>(['click']);

    /** Whether the product switch should trap focus within its boundaries. */
    readonly focusTrapped = input(false, { transform: booleanAttribute });

    /** Whether the product switch should automatically move focus into the trapped region. */
    readonly focusAutoCapture = input(false, { transform: booleanAttribute });

    /** Two-way binding for product switch open state. */
    readonly isOpen = model(false);

    /** Event emitted right before the product switch is being opened. */
    readonly beforeOpen = output<void>();

    /** Event emitted when the product switch open state changes. */
    readonly isOpenChange = output<boolean>();

    /** @hidden */
    contentDensity = signal<ContentDensityMode>(ContentDensityMode.COZY);

    /** @hidden */
    protected readonly customProductSwitchButton = contentChild(ProductSwitchButtonDirective);
}
