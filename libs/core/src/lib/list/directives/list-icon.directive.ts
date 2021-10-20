import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';

@Directive({
    selector: '[fdListIcon], [fd-list-icon]'
})
export class ListIconDirective implements OnChanges, OnInit {
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

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return ['fd-list__icon', this.glyph ? 'sap-icon--' + this.glyph : '', this.class];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
