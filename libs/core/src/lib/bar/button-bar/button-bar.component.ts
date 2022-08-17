import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import { BaseButton, ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';

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
    `
})
export class ButtonBarComponent extends BaseButton implements OnDestroy {
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

    /** Aria label attribute value. */
    @Input()
    ariaLabel: Nullable<string | null>;

    /** the aria-labelledby ids to be associated with this element */
    @Input()
    ariaLabelledby: string;

    /** @hidden */
    private readonly _defaultId = `fd-button-bar-id-${randomButtonBarId++}`;

    /** id for this element */
    @Input()
    get id(): string {
        return this._id || this._defaultId;
    }

    set id(value: string | null | undefined) {
        this._id = value;
    }

    _id: string | null | undefined;

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    _barElement = true;

    @HostBinding('style.pointer-events')
    get pointerEvents(): string {
        return this._disabled ? 'none' : 'auto';
    }

    /** @hidden */
    @ViewChild(ButtonComponent)
    _buttonComponent: ButtonComponent;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(private _cdRef: ChangeDetectorRef) {
        super();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
