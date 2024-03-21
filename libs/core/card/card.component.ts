import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';

import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { CardTitleDirective } from './card-title.directive';
import { CardType, CLASS_NAME } from './constants';
import { FD_CARD_TITLE } from './token';
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

    /** Card aria-labelledby  */
    @HostBinding('attr.aria-labelledby')
    cardTitleId: Nullable<string>;

    /** @hidden */
    @ContentChild(FD_CARD_TITLE, { static: true })
    cardTitle: CardTitleDirective;

    /** @hidden */
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();

        if (this.cardTitle) {
            this.cardTitleId = this.cardTitle.id;
        }
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
}
