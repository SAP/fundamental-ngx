import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    BasePopoverClass,
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import {
    FD_PRODUCT_SWITCH_COMPONENT,
    ProductSwitchButtonDirective,
    ProductSwitchComponent
} from '@fundamental-ngx/core/product-switch';
import { Placement } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ToolHeaderButtonDirective } from '../directives/tool-header-button.directive';

@Component({
    selector: 'fdb-tool-header-product-switch',
    imports: [
        ButtonComponent,
        FdTranslatePipe,
        PopoverBodyComponent,
        PopoverComponent,
        PopoverControlComponent,
        ToolHeaderButtonDirective,
        ProductSwitchComponent,
        ProductSwitchButtonDirective
    ],
    template: `
        <fd-product-switch
            [placement]="placement"
            [closeOnEscapeKey]="closeOnEscapeKey"
            [closeOnOutsideClick]="closeOnOutsideClick"
            [(isOpen)]="isOpen"
            (isOpenChange)="isOpenChange.emit($event)"
            [disabled]="disabled"
            [triggers]="triggers"
            [focusTrapped]="false"
            [focusAutoCapture]="true"
            [noArrow]="noArrow"
            [disableScrollbar]="true"
        >
            <button
                *fdProductSwitchButton
                fd-button
                fdbToolHeaderButton
                [attr.aria-label]="'coreProductSwitch.ariaLabel' | fdTranslate"
                [attr.title]="'coreProductSwitch.ariaLabel' | fdTranslate"
                glyph="grid"
                fdType="transparent"
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
    standalone: true
})
export class ToolHeaderProductSwitchComponent extends BasePopoverClass {
    /** Placement of a popover. */
    @Input()
    override placement: Placement = 'bottom-end';

    /** Whether the product switch is disabled. */
    @Input()
    override disabled = false;
}
