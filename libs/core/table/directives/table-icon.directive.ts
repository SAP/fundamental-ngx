import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont, fdBuildIconClass } from '@fundamental-ngx/core/icon';

@Directive({
    selector: '[fdTableIcon], [fd-table-icon]',
    standalone: true
})
export class TableIconDirective implements OnChanges, CssClassBuilder, OnInit {
    /** @hidden */
    @HostBinding('class.fd-table__icon')
    fdTableIconClass = true;

    /** The property allows user to pass additional css classes
     */
    @Input()
    class = '';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph = '';

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Whether or no icon is used as navigation  */
    @Input()
    navigation = false;

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-table__icon',
            this.glyph ? fdBuildIconClass(this.glyphFont, this.glyph) : '',
            this.navigation ? 'fd-table__icon--navigation' : '',
            this.class
        ];
    }

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
}
