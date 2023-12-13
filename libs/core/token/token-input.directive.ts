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

    /** @ignore */
    readonly elementRef = inject(ElementRef);

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tokenizer__input', this.class];
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
