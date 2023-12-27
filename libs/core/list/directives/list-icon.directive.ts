import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont, fdBuildIconClass } from '@fundamental-ngx/core/icon';

@Directive({
    selector: '[fdListIcon], [fd-list-icon]',
    standalone: true
})
export class ListIconDirective implements OnChanges, OnInit, CssClassBuilder {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** Role attribute for list icon */
    @Input()
    @HostBinding('attr.role')
    role = 'presentation';

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-list__icon', this.glyph ? fdBuildIconClass(this.glyphFont, this.glyph) : '', this.class];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
