import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';

export type FooterPosition = 'start' | 'end';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-layout-panel-footer',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class LayoutPanelFooterComponent implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /**
     * Footer variations, can be start (left aligned), end (right aligned) or null for default.
     * The default value will render the content of the footer in the middle.
     */
    @Input() position: Nullable<FooterPosition>;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-layout-panel__footer',
            this.position ? `fd-layout-panel__footer--${this.position}` : '',
            this.class
        ];
    }
}
