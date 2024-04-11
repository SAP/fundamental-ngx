import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    contentChild,
    input
} from '@angular/core';

import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { CLASS_NAME, CardType } from './constants';
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
    imports: [],
    host: {
        '[attr.id]': 'id()',
        '[attr.role]': 'role()',
        '[attr.aria-labelledby]': 'cardTitle()?.id()'
    }
})
export class CardComponent implements OnChanges, OnInit, CssClassBuilder, OnDestroy {
    /** @hidden */
    cardTitle = contentChild(FD_CARD_TITLE);

    /**
     * text for the card badge
     */
    badge = input<string>();

    /**
     * whether the card is in loading state
     * default: false
     */
    isLoading = input(false);

    /**
     * set the Caard type
     * options: 'object' | 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'quickView' | 'linkList'
     * default: 'standard'
     *
     */
    cardType = input<CardType>('standard');

    /**
     * card id
     * if not set, a default value is provided
     */
    id = input('fd-card-id-' + cardId++);

    /**
     * card role
     * default: 'region'
     */
    role = input('region');

    /** @hidden */
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.card, this.cardType() ? getCardModifierClassNameByCardType(this.cardType()) : ''];
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
}
