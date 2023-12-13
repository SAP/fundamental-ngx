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

import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { CardType, CLASS_NAME } from './constants';
import { getCardModifierClassNameByCardType } from './utils';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    standalone: true,
    imports: []
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

    /** @ignore */
    class: string;

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.card, this.cardType ? getCardModifierClassNameByCardType(this.cardType) : ''];
    }
}
