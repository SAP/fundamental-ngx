import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

export type ToolLayoutContentContainerBackground = '' | 'transparent' | 'list';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdb-tool-layout-content-container]',
    standalone: true
})
export class ToolLayoutContentContainerDirective implements OnChanges, OnInit, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;

    /**
     * the background of the Content Container
     * Available options: '' | 'transparent' | 'list'
     * Default background has the color var(--sapBackgroundColor)
     * List background will apply var(--sapGroup_ContentBackground) background to the content area
     */
    @Input()
    background: ToolLayoutContentContainerBackground;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-tool-layout__content-container',
            this.background ? `fd-tool-layout__content-container--${this.background}` : '',
            this.class
        ];
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
