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
    Optional
} from '@angular/core';

import { ContentDensityService } from '@fundamental-ngx/core/utils';

import { CLASS_NAME, CardType } from './constants';
import { Subscription } from 'rxjs';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { getCardModifierClassNameByCardType } from './utils';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, OnInit, CssClassBuilder, OnDestroy {
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

    /** @hidden */
    class: string;

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
        return [
            CLASS_NAME.card,
            this.cardType ? getCardModifierClassNameByCardType(this.cardType) : null,
            this.compact ? CLASS_NAME.cardCompact : null
        ].filter((v): v is string => !!v);
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
