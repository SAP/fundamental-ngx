import { ChangeDetectionStrategy, Component, contentChild, input, model, output } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective, ContentDensityMode } from '@fundamental-ngx/core/content-density';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverConfig,
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
    /**
     * Configuration object for popover settings.
     * When provided, these settings will be merged with individual input properties.
     * Individual inputs take precedence over config object values.
     */
    readonly config = input<PopoverConfig>({});

    /** Placement of a popover. */
    readonly placement = input<Placement>('bottom-end');

    /** Whether the product switch is disabled. */
    readonly disabled = input(false);

    /** Whether the popover should close when the escape key is pressed. */
    readonly closeOnEscapeKey = input(true);

    /** Whether the popover should close when a click is made outside its boundaries. */
    readonly closeOnOutsideClick = input(true);

    /** Whether the popover should have an arrow. */
    readonly noArrow = input(true);

    /** Whether to wrap content with fd-scrollbar directive. */
    readonly disableScrollbar = input(false);

    /** The trigger events that will open/close the popover. */
    readonly triggers = input<(string | TriggerConfig)[]>(['click']);

    /** Whether the popover should be focusTrapped. */
    readonly focusTrapped = input(false);

    /** Whether the popover should automatically move focus into the trapped region. */
    readonly focusAutoCapture = input(false);

    /** Two-way binding for open state. */
    readonly isOpen = model(false);

    /** Event emitted right before the popover is being opened. */
    readonly beforeOpen = output<void>();

    /** @hidden */
    _contentDensity: ContentDensityMode;

    /** @hidden */
    protected readonly customProductSwitchButton = contentChild(ProductSwitchButtonDirective);
}
