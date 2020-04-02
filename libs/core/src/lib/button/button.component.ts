import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit,
} from '@angular/core';
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
        return options.map((option) => `fd-button--${this.replaceLightWithTransparent(option)}`).join(' ');
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
    template: ` <ng-content></ng-content> `,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges, CssClassBuilder, OnInit {
    /** The property allows user to pass additional css classes
     */
    @Input()
    public class: string = '';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    public glyph: string = '';

    /** Whether to apply compact mode to the button.
     * Default value is set to false
     */
    @Input()
    public compact: boolean = false;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
     * Default value is set to 'standard'
     */
    @Input()
    public fdType: ButtonType = 'standard';

    /** Whether to apply menu mode to the button.
     * Default value is set to false
     */
    @Input()
    public fdMenu: boolean = false;

    private _options: ButtonOptions | ButtonOptions[];
    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.'
     * @deprecated
     * Will be removed in 0.17.0.
     * Use 'fdType' instead.
     */
    @Input()
    public options(opt: ButtonOptions | ButtonOptions[]) {
        console.warn(`fd-button options property is deprecated and will be removed in 0.17.0.
        Please follow the breaking changes.`);
        this._options = opt;
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    public ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    public buildComponentCssClass(): string {
        return [
            'fd-button',
            this.fdType ? `fd-button--${this.fdType}` : '',
            this.compact ? 'fd-button--compact' : '',
            this.fdMenu ? `fd-button--menu` : '',
            this._options ? getOptionCssClass(this._options) : '',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.class,
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
