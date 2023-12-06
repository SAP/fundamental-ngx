import { Directive, ElementRef, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdTokenizerInput], [fd-tokenizer-input]',
    standalone: true
})
export class TokenizerInputDirective implements OnInit, OnChanges, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tokenizer__input', this.class];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
