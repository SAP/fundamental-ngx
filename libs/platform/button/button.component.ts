import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from '@angular/core';

import { ModuleDeprecation, Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';
import { ButtonType, ButtonComponent as CoreButtonComponent, GlyphPosition } from '@fundamental-ngx/core/button';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

/**
 * @deprecated
 * Button component is deprecated. Use `fd-button` from `@fundamental-ngx/core` instead.
 */
@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    standalone: true,
    imports: [CoreButtonComponent]
})
export class ButtonComponent extends BaseComponent implements AfterViewInit {
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

    /** The buttonType of the button. Types includes
     'standard','positive', 'negative', 'attention', 'ghost',
     'transparent', 'emphasized','menu'.
     *Leave empty for default (standard button).'*/
    @Input()
    buttonType: ButtonType = 'standard';

    /** Whether button is in toggled state. */
    @Input()
    toggled: Nullable<boolean>;

    /** arialabel, tooltip for truncated text
     * for acccesiblity of the element */
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

    /** Specifies a name to
     *  the native HTML button */
    @Input()
    name: string;

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
    constructor(
        protected _changeDetector: ChangeDetectorRef,
        private _elementRef: ElementRef
    ) {
        super(_changeDetector);
        warnOnce(
            "Platform's ButtonComponent is deprecated and will be removed in the next major release. Consider using Core's ButtonComponent instead."
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._elementRef.nativeElement.childNodes[0].classList.add('fd-ellipsis');
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
