import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

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
    constructor(public readonly elementRef: ElementRef) {}

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-table__icon',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.navigation ? 'fd-table__icon--navigation' : '',
            this.class
        ];
    }
}
