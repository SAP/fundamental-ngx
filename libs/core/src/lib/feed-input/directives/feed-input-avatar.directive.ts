import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core';

/**
 * Applies a thumb styles
 */
@Directive({
    selector: '[fdFeedInputAvatar]',
})
export class FeedInputAvatarDirective implements OnInit, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** @hidden */
    @Input()
    placeholder: boolean;

    constructor(private _elementRef: ElementRef) {}

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
            'fd-feed-input__thumb',
            this.placeholder ? `sap-icon` : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
