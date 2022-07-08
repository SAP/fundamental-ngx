import {
    AfterViewChecked,
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

import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import equal from 'fast-deep-equal';

import { CardType, CLASS_NAME } from './constants';
import { Subscription } from 'rxjs';
import { getCardModifierClassNameByCardType } from './utils';
import { FD_CARD_CONTAINER } from './card.tokens';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: CLASS_NAME.cardCompact
            }
        })
    ]
})
export class CardComponent implements OnChanges, AfterViewChecked, OnInit, CssClassBuilder, OnDestroy {
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

    /** Reference to the card container element */
    @ContentChild(FD_CARD_CONTAINER)
    cardContainer: { containsList: boolean };

    /** @hidden */
    class: string;

    /** @hidden */
    get classList(): string[] {
        return [
            CLASS_NAME.card,
            this.cardType ? getCardModifierClassNameByCardType(this.cardType) : '',
            this.cardContainer?.containsList ? CLASS_NAME.cardList : ''
        ];
    }

    /** @hidden */
    private _previousClassList: string[];

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
    ngAfterViewChecked(): void {
        if (!equal(this._previousClassList, this.classList)) {
            this.buildComponentCssClass();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        this._previousClassList = this.classList;
        return this.classList;
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
