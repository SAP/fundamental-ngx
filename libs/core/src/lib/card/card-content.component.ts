import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContentComponent implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardContent];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
