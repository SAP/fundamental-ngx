import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

/**
 * Applies a thumb styles
 */
@Directive({
    selector: '[fdFeedInputAvatar]',
    standalone: true
})
export class FeedInputAvatarDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** @hidden */
    @Input()
    placeholder: boolean;

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
        return ['fd-feed-input__thumb', this.placeholder ? `fd-avatar--placeholder` : '', this.class];
    }
}
