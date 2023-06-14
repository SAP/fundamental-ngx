import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdListIcon], [fd-list-icon]'
})
export class ListIconDirective implements OnChanges, OnInit, CssClassBuilder {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** Role attribute for list icon */
    @Input()
    @HostBinding('attr.role')
    role = 'presentation';

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-list__icon', this.glyph ? 'sap-icon--' + this.glyph : '', this.class];
    }
}
