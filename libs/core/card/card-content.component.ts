import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CardContentComponent implements OnInit, CssClassBuilder {
    /** @ignore */
    class: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardContent];
    }
}
