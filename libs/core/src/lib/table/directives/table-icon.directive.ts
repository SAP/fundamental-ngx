import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

@Directive({
  selector: '[fdTableIcon], [fd-table-icon]'
})
export class TableIconDirective implements OnChanges, CssClassBuilder, OnInit {

    /** @hidden */
    @HostBinding('class.fd-table__icon')
    fdTableIconClass = true;

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

    /** Whether or no icon is used as navigation  */
    @Input()
    navigation = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    public buildComponentCssClass(): string {
        return [
            'fd-table__icon',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.navigation ? 'fd-table__icon--navigation' : '',
            this.class
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
