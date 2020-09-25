import {
    Component,
    OnInit,
    OnChanges,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding
} from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../utils/public_api';

import { CLASS_NAME, CardType } from './constants';
import { getCardModifierClassNameByCardType } from './utils';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, OnInit, CssClassBuilder {
    /** Badge */
    @Input() badge: string;

    /**
     * Whether to apply compact mode
     */
    @Input()
    compact: boolean;

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
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [
            CLASS_NAME.card,
            this.cardType ? getCardModifierClassNameByCardType(this.cardType) : null,
            this.compact ? CLASS_NAME.cardCompact : null
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
