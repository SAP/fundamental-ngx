import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core';

@Directive({
    selector: '[fd-object-identifier-title], [fdObjectIdentifierTitle]'
})
export class ObjectIdentifierTitleDirective implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the title is link */
    @Input()
    link = false;

    /** Whether the title should be bolded */
    @Input()
    bold = false;

    /** @hidden */
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
        return [
            'fd-object-identifier__title',
            this.link ? 'fd-object-identifier__title--link' : '',
            this.bold ? 'fd-object-identifier__title--bold' : ''
        ]
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
