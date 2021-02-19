import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { applyCssClass, CssClassBuilder, getRandomColorAccent, Size } from '../../utils/public_api';
import { AvatarGroupOverflowButtonColor } from '../avatar-group.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-overflow-button]'
})
export class AvatarGroupOverflowButtonDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** The size of the overflow button.
     * Should be the same as the Avatar Group and Avatar size.
     * Options include: *xs*, *s*, *m*, *l* and *xl* (default: *s*). */
    @Input()
    size: Size = 's';

    /** A number from 1 to 10 representing the background color of the Avatar Group's overflow button.
     * Options include: *neutral*, *random*, *1*, *2*, *3*, *4*, *5*, *6*, *7*, *8*, *9*, *10* (default: *neutral*). */
    @Input()
    color: AvatarGroupOverflowButtonColor = 'neutral';

    /** @hidden */
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
            'fd-button',
            'fd-avatar-group__more-button',
            this.color ? this._getMoreButtonColorCssClass() : '',
            this.size ? `fd-avatar-group__more-button--${this.size}` : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    private _getMoreButtonColorCssClass(): string {
        if (this.color === 'random') {
            return `fd-avatar-group__more-button--accent-color-${getRandomColorAccent()}`;
        }

        if (!Number.isNaN(parseInt(this.color as string, 10))) {
            return `fd-avatar-group__more-button--accent-color-${this.color}`;
        }
    }
}
