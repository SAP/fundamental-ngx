import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CardType, CLASS_NAME } from './constants';
import { Subscription } from 'rxjs';
import { getCardModifierClassNameByCardType } from './utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()]
})
export class CardComponent implements OnChanges, OnInit, CssClassBuilder, OnDestroy {
    /** Badge */
    @Input() badge: string;

    /** Indicates when card should show a loader  */
    @Input()
    isLoading = false;

    /**
     * cardType can be 'object' | 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'quickView' | 'linkList'
     * to indicate what card's type it belongs to
     */
    @Input()
    cardType: CardType = 'standard';

    /** Card Id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-card-id-' + cardId++;

    /** Card role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** @hidden */
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _contentDensityObserver: ContentDensityObserver) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.card, this.cardType ? getCardModifierClassNameByCardType(this.cardType) : ''];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
