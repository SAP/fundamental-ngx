import {
    Component,
    OnInit,
    Renderer2,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding
} from '@angular/core';

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
export class CardComponent implements OnInit {
    /** Badge */
    @Input() badge: string;

    /**
     * Whether to apply compact mode
     */
    @Input()
    set compact(compact: boolean) {
        this._setCompact(compact);
    }
    get compact(): boolean {
        return this._compact;
    }

    /** Indicates when card should show a loader  */
    @Input()
    isLoading = false;

    /**
     * cardType can be 'object' | 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'quickView' | 'linkList'
     * to indicate what card's type it belongs to
     */
    @Input()
    set cardType(cardType: CardType) {
        this._setCardType(cardType);
    }
    get cardType(): CardType {
        return this._cardType;
    }

    /** Card Id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-card-id-' + cardId++;

    /** Card role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** @hidden */
    private _compact = false;

    /** @hidden */
    private _cardType: CardType;

    /** @hidden */
    private _cardTypeClassName: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {
        this._setCardType('standard');
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.card);
    }

    /**@hidden */
    private _setCompact(compact: boolean): void {
        this._compact = compact;
        const compactClassName = CLASS_NAME.cardCompact;

        if (compact) {
            this._addClassNameToHostElement(compactClassName);
        } else {
            this._removeClassNameToHostElement(compactClassName);
        }
    }

    /**@hidden */
    private _setCardType(cardType: CardType): void {
        if (cardType === this._cardType) {
            return;
        }

        this._cardType = cardType;

        if (this._cardTypeClassName) {
            this._removeClassNameToHostElement(this._cardTypeClassName);
        }

        this._cardTypeClassName = getCardModifierClassNameByCardType(cardType);
        if (this._cardTypeClassName) {
            this._addClassNameToHostElement(this._cardTypeClassName);
        }
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
