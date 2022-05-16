import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ContentChild } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CLASS_NAME } from './constants';
import { FD_CARD_CONTAINER } from './card.tokens';
import { FD_LIST } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-card-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FD_CARD_CONTAINER, useExisting: CardContentComponent }]
})
export class CardContentComponent implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** @hidden */
    @ContentChild(FD_LIST)
    set containsList(list: any) {
        this._containsList = !!list;
    }

    get containsList(): any {
        return this._containsList;
    }

    /** @hidden */
    private _containsList: boolean;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardContent];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
