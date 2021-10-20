import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

/**
 * Applies a thumb styles
 */
@Directive({
    selector: '[fdFeedInputAvatar]'
})
export class FeedInputAvatarDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** @hidden */
    @Input()
    placeholder: boolean;

    constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

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
        return ['fd-feed-input__thumb', this.placeholder ? `sap-icon` : '', this.class];
    }

    /** @hidden */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
