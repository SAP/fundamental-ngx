import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { Size } from '@fundamental-ngx/cdk/utils';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { getRandomColorAccent } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { AvatarGroupOverflowButtonColor } from '../avatar-group.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-overflow-button]',
    standalone: true
})
export class AvatarGroupOverflowButtonDirective implements OnInit, OnChanges, CssClassBuilder {
    /** User's custom classes. */
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
    constructor(public readonly elementRef: ElementRef) {}

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
            (this.color && this._getMoreButtonColorCssClass()) || '',
            this.size ? `fd-avatar-group__more-button--${this.size}` : '',
            this.class
        ];
    }

    /** @hidden */
    private _getMoreButtonColorCssClass(): string | null {
        if (this.color === 'random') {
            return `fd-avatar-group__more-button--accent-color-${getRandomColorAccent()}`;
        }

        if (!Number.isNaN(parseInt(this.color as string, 10))) {
            return `fd-avatar-group__more-button--accent-color-${this.color}`;
        }
        return null;
    }
}
