import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

export type ButtonType =
    | ''
    | 'standard'
    | 'positive'
    | 'negative'
    | 'attention'
    | 'half'
    | 'ghost'
    | 'transparent'
    | 'emphasized'
    | 'menu';
export type ButtonOptions = 'light' | 'emphasized' | 'menu';

// TODO remove in 0.17.0
function replaceLightWithTransparent(option: string): string {
    return option.replace('light', 'transparent');
}

// TODO remove in 0.17.0
export function getOptionCssClass(options: ButtonOptions | ButtonOptions[]): string {
    if (Array.isArray(options)) {
        return options.map(option => `fd-button--${this.replaceLightWithTransparent(option)}`).join(' ');
    }
    return `fd-button--${this.replaceLightWithTransparent(options)}`;
}

/**
 * Button directive, used to enhance standard HTML buttons.
 * 
 * ``` selector: button[fd-button], a[fd-button] ```
 * 
 * ```html
 * <button fd-button>Button Text</button>
 * <a fd-button>Button Text</a>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button[fd-button], a[fd-button]',
    exportAs: 'fd-button',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, CssClassBuilder {
    private _class: string = '';
    /** The property allows user to pass additional css classes
     */
    @Input() set class(userClass: string) {
        this._class = userClass;
        this._change();
    }

    private _glyph: string;
    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input() set glyph(icon: string) {
        this._glyph = icon;
        this._change();
    }

    private _compact: boolean = false;
    /** Whether to apply compact mode to the button. 
     * Default value is set to false
    */
    @Input() set compact(isComact: boolean) {
        this._compact = isComact;
        this._change();
    }

    private _type: ButtonType;
    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
    */
    @Input() set fdType(type: ButtonType) {
        this._type = type;
        this._change();
    }

    private _menu: boolean = false;
    /** Whether to apply menu mode to the button.
     * Default value is set to false
    */
    @Input() set fdMenu(menu: boolean) {
        this._menu = menu;
        this._change();
    }

    private _options: ButtonOptions | ButtonOptions[];
    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.'
     * @deprecated 
     * Will be removed in 0.17.0. 
     * Use 'fdType' instead.
     */
    @Input() options(opt: ButtonOptions | ButtonOptions[]) {
        console.warn(`fd-button options property is deprecated and will be removed in 0.17.0.
        Please follow the breaking changes.`);
        this._options = opt;
        this._change();
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) { }

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnInit(): void {
        this._change();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-button',
            this._type ? `fd-button--${this._type}` : '',
            this._compact ? 'fd-button--compact' : '',
            this._menu ? `fd-button--menu` : '',
            this._options ? getOptionCssClass(this._options) : '',
            this._glyph ? `sap-icon--${this._glyph}` : '',
            this._class
        ]
            .filter(x => x !== '')
            .join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    private _change(): void {
        this.buildComponentCssClass();
    }
}
