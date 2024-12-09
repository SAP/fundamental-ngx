import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { BaseButton, ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { FD_BUTTON_BAR_COMPONENT } from '../tokens';

let randomButtonBarId = 0;

@Component({
    selector: 'fd-button-bar',
    template: `
        <button
            fd-button
            [id]="id"
            [type]="type"
            [glyphPosition]="glyphPosition"
            [glyph]="glyph"
            [fdType]="fdType"
            [label]="label"
            [attr.title]="title"
            [ariaLabel]="ariaLabel"
            [fdMenu]="fdMenu"
            [disabled]="disabled"
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
    imports: [ButtonComponent]
})
export class ButtonBarComponent extends BaseButton {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth = false;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Default value is set to 'transparent'
     */
    @Input()
    fdType: ButtonType = 'transparent';

    /** adding title to the button */
    @Input()
    title: string;

    /** the aria-labelledby ids to be associated with this element */
    @Input()
    ariaLabelledby: string;

    /** id for this element */
    @Input()
    set id(value: string | null | undefined) {
        this._id = value;
    }

    get id(): string {
        return this._id || this._defaultId;
    }

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    _barElement = true;

    /** @hidden */
    @HostBinding('style.pointer-events')
    get pointerEvents(): string {
        return this.disabled ? 'none' : 'auto';
    }

    /** @hidden */
    @ViewChild(ButtonComponent)
    _buttonComponent: ButtonComponent;
    /** @hidden */
    _id: string | null | undefined;

    /** @hidden */
    private readonly _defaultId = `fd-button-bar-id-${randomButtonBarId++}`;
}
