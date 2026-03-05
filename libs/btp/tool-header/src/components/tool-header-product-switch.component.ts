import { Component, input, model, output } from '@angular/core';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TriggerConfig } from '@fundamental-ngx/core/popover';
import {
    FD_PRODUCT_SWITCH_COMPONENT,
    ProductSwitchButtonDirective,
    ProductSwitchComponent
} from '@fundamental-ngx/core/product-switch';
import { Placement } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fdb-tool-header-product-switch',
    imports: [
        ButtonComponent,
        FdTranslatePipe,
        ProductSwitchComponent,
        ProductSwitchButtonDirective,
        ToolHeaderButtonDirective
    ],
    template: `
        <fd-product-switch
            [placement]="placement()"
            [closeOnEscapeKey]="closeOnEscapeKey()"
            [closeOnOutsideClick]="closeOnOutsideClick()"
            [(isOpen)]="isOpen"
            [disabled]="disabled()"
            [triggers]="triggers()"
            [focusTrapped]="focusTrapped()"
            [focusAutoCapture]="focusAutoCapture()"
            [noArrow]="noArrow()"
            [disableScrollbar]="disableScrollbar()"
        >
            <button
                *fdProductSwitchButton
                fd-button
                fdbToolHeaderButton
                [attr.aria-label]="'coreProductSwitch.ariaLabel' | fdTranslate"
                [attr.title]="'coreProductSwitch.ariaLabel' | fdTranslate"
                glyph="grid"
            ></button>
            <ng-content></ng-content>
        </fd-product-switch>
    `,
    providers: [
        {
            provide: FD_PRODUCT_SWITCH_COMPONENT,
            useExisting: ToolHeaderProductSwitchComponent
        }
    ],
    host: {
        '[class.fd-popover-custom--disabled]': 'disabled()'
    }
})
export class ToolHeaderProductSwitchComponent {
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
    readonly disableScrollbar = input(true);

    /** The trigger events that will open/close the popover. */
    readonly triggers = input<(string | TriggerConfig)[]>(['click']);

    /** Whether the popover should be focusTrapped. */
    readonly focusTrapped = input(false);

    /** Whether the popover should automatically move focus into the trapped region. */
    readonly focusAutoCapture = input(true);

    /** Two-way binding for isOpen state */
    readonly isOpen = model(false);

    /** Event emitted right before the popover is being opened. */
    readonly beforeOpen = output<void>();
}
