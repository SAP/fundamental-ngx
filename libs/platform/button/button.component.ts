import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ModuleDeprecation, Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';
import { ButtonType, ButtonComponent as CoreButtonComponent, GlyphPosition } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { ButtonModel } from './button.model';
import { FDP_BUTTON } from './tokens';

/**
 * @deprecated
 * Button component is deprecated. Use `fd-button` from `@fundamental-ngx/core` instead.
 */
@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    providers: [
        {
            provide: FDP_BUTTON,
            useExisting: ButtonComponent
        }
    ],
    imports: [CoreButtonComponent],
    host: {
        role: 'button'
    }
})
export class ButtonComponent extends BaseComponent implements ButtonModel {
    /** Position of glyph related to text */
    @Input()
    glyphPosition: GlyphPosition = 'before';

    /**
     * Text rendered inside button component
     */
    @Input()
    label: string;

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph: string;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /**
     * @deprecated
     * Use `fdType` property.
     * The buttonType of the button. Types includes
     'standard','positive', 'negative', 'attention', 'ghost',
     'transparent', 'emphasized','menu'.
     *Leave empty for default (standard button).'*/
    @Input()
    set buttonType(value: ButtonType) {
        this.fdType = value;
    }

    get buttonType(): ButtonType {
        return this.fdType;
    }

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
     * Default value is set to 'standard'
     */
    @Input()
    fdType: ButtonType = 'standard';

    /** Whether button is in toggled state. */
    @Input()
    toggled: Nullable<boolean>;

    /** arialabel, tooltip for button, intended to be used when the button only contains an icon */
    @Input()
    title: Nullable<string>;

    /** @deprecated use toggled input property instead
     * aria-selected for acccesiblity to the native HTML button
     */
    @Input()
    set ariaSelected(value: Nullable<boolean>) {
        warnOnce('Property ariaSelected is deprecated. Use `toggled` input property instead.');
        this._ariaSelected = value;
    }

    get ariaSelected(): Nullable<boolean> {
        return this._ariaSelected;
    }

    /** aria-disabled for acccesiblity to
     *  the native HTML button*/
    @Input()
    ariaDisabled: Nullable<boolean>;

    /**
     * propagate aria-expanded for accessiblity to
     * the native HTML button
     */
    @Input()
    ariaExpanded: Nullable<boolean>;

    /**
     * propagate aria-controls for accessiblity to
     * the native HTML button
     */
    @Input()
    ariaControlsId: Nullable<string>;

    /** @deprecated use toggled input property instead
     * propagate aria-pressed for accessiblity to the native HTML button
     */
    @Input()
    set ariaPressed(value: Nullable<boolean>) {
        warnOnce('Property ariaPressed is deprecated. Use `toggled` input property instead.');
        this._ariaPressed = value;
    }

    get ariaPressed(): Nullable<boolean> {
        return this._ariaPressed;
    }

    /** Specifies the type to
     *  the native HTML button */
    @Input()
    type: Nullable<string>;

    /** Specifies an initial value to
     *  the native HTML button */
    @Input()
    value: Nullable<string>;

    /** Event sent when button is clicked */
    @Output()
    buttonClicked: EventEmitter<any> = new EventEmitter();

    /**
     * Take host element out of tab order, so that child button can
     * be properly focused on.
     */
    @HostBinding('attr.tabindex')
    tabIndex = '-1';

    /** @hidden */
    private _ariaSelected: Nullable<boolean>;

    /** @hidden */
    private _ariaPressed: Nullable<boolean>;

    /** @hidden */
    constructor() {
        super();
        warnOnce(
            "Platform's ButtonComponent is deprecated and will be removed in the next major release. Consider using Core's ButtonComponent instead."
        );
    }

    /**
     *  Handles button click
     */
    public onBtnClick($event: any): void {
        this.buttonClicked.emit($event);
    }
}

export class DeprecatedButtonAriaSelected implements ModuleDeprecation {
    /** @hidden */
    message = 'ariaSelected input property is deprecated.';

    /** @hidden */
    alternative = {
        name: 'Use [toggled] input property instead',
        link: ['/platform', 'button'],
        fragment: 'state'
    };
}

export class DeprecatedButtonAriaPressed implements ModuleDeprecation {
    /** @hidden */
    message = 'ariaPressed input property is deprecated.';

    /** @hidden */
    alternative = {
        name: 'Use [toggled] input property instead',
        link: ['/platform', 'button'],
        fragment: 'state'
    };
}
