import {
    Component,
    OnInit,
    OnChanges,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    OnDestroy,
    Optional,
    ContentChild,
    AfterViewChecked
} from '@angular/core';

import { ContentDensityService } from '@fundamental-ngx/core/utils';
import equal from 'fast-deep-equal';

import { CLASS_NAME, CardType } from './constants';
import { Subscription } from 'rxjs';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { getCardModifierClassNameByCardType } from './utils';
import { FD_CARD_CONTAINER } from './card.tokens';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, AfterViewChecked, OnInit, CssClassBuilder, OnDestroy {
    /** Badge */
    @Input() badge: string;

    /**
     * Whether to apply compact mode
     */
    @Input()
    compact?: boolean;

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
            this.compact ? CLASS_NAME.cardCompact : '',
            this.cardContainer?.containsList ? CLASS_NAME.cardList : ''
        ];
    }

    /** @hidden */
    private _previousClassList: string[];

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

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
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this.buildComponentCssClass();
                })
            );
        }
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
