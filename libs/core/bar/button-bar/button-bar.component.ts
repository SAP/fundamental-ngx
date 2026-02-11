import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Component, input, viewChild } from '@angular/core';
import { BaseButton, ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { FD_BUTTON_BAR_COMPONENT } from '../tokens';

let randomButtonBarId = 0;

@Component({
    selector: 'fd-button-bar',
    template: `
        <button
            fd-button
            [id]="id()"
            [type]="type()"
            [glyphPosition]="glyphPosition()"
            [glyph]="glyph()"
            [fdType]="fdType()"
            [label]="label()"
            [attr.title]="title()"
            [ariaLabel]="ariaLabel()"
            [fdMenu]="fdMenu()"
            [disabled]="disabled()"
        >
            <ng-content></ng-content>
        </button>
    `,
    providers: [
        {
            provide: FD_BUTTON_BAR_COMPONENT,
            useExisting: ButtonBarComponent
        }
    ],
    imports: [ButtonComponent],
    host: {
        class: 'fd-bar__element',
        '[class.fd-bar__element--full-width]': 'fullWidth()',
        '[style.pointer-events]': 'disabled() ? "none" : "auto"'
    }
})
export class ButtonBarComponent extends BaseButton {
    /** Whether the element should take the whole width of the container. */
    readonly fullWidth = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Default value is set to 'transparent'
     */
    readonly fdType = input<ButtonType>('transparent');

    /** adding title to the button */
    readonly title = input<string | undefined>();

    /** the aria-labelledby ids to be associated with this element */
    readonly ariaLabelledby = input<string | undefined>();

    /** id for this element */
    readonly id = input(`fd-button-bar-id-${randomButtonBarId++}`);

    /** @hidden */
    readonly buttonComponent = viewChild(ButtonComponent);
}
