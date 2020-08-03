import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit, HostBinding
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnChanges, CssClassBuilder, OnInit {
    /**
     * Native type of button element
     */
    @Input()
    @HostBinding('attr.type')
    type = 'button';

    /** The property allows user to pass additional css classes
     */
    @Input()
    public class = '';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    public glyph = '';

    /** Whether to apply compact mode to the button.
     * Default value is set to false
     */
    @Input()
    public compact = false;

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
    public fdMenu = false;

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
    buildComponentCssClass(): string[] {
        return [
            'fd-button',
            this.fdType ? `fd-button--${this.fdType}` : '',
            this.compact ? 'fd-button--compact' : '',
            this.fdMenu ? `fd-button--menu` : '',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
