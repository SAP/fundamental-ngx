import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { RtlService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';

export type ResizeDirection = 'vertical' | 'horizontal' | 'both';

// Card resizes in step of fixed values. values are in pixel
export const horizontalResizeStep = 320;

// vertical resize step
export const verticalResizeStep = 16;

// gap of 1rem between the cards
export const gap = 16;

// threshold offset for horizontal resizing.
export const horizontalResizeOffset = 160;

// threshold offset for vertical resizing.
export const verticalResizeOffset = 8;

// state of card. Increasing width, no change or decreasing width.
export type CardState = 1 | 0 | -1;

// card is given numeric value, on which sorting of cards is done
let cardRank = 1;
let cardUniqueId = 0;

@Component({
    selector: 'fd-resizable-card-item',
    templateUrl: 'resizable-card-item.component.html',
    styleUrls: ['./resizable-card-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ResizableCardItemComponent implements FocusableOption, OnDestroy {
    /** Card properties from the config */
    @Input()
    set config(config: ResizableCardItemConfig) {
        this._config = config;
        this._initialSetup();
        this._cd.detectChanges();
    }
    get config(): ResizableCardItemConfig {
        return this._config;
    }

    /** set uinque id for the card */
    @Input()
    itemId = `fd-card-item-${cardUniqueId++}`;

    /** set title of the card */
    @Input()
    title: string;

    /**
     * Serial order of card.
     * cards are sorted based on ranks before displaying layout.
     * card with lower rank will be displayed first in layout than the card with higher rank.
     */
    @Input()
    set rank(rankValue: number) {
        // determine max value between user given value and default value
        this._rank = rankValue ? rankValue : cardRank++;
        if (rankValue > cardRank) {
            cardRank = rankValue;
        }
    }
    get rank(): number {
        return this._rank;
    }

    /**
     * Number of column span card width takes.
     * It will be in step of 20rem.
     */
    @Input()
    set cardWidthColSpan(colSpan: number) {
        this._cardWidthColSpan = colSpan;
        this._setCardWidth();
    }
    get cardWidthColSpan(): number {
        return this._cardWidthColSpan;
    }

    /**
     * Number of row span, card height takes.
     * It will be in the step of 1rem.
     */
    @Input()
    set cardHeightRowSpan(rowSpan: number) {
        this._cardHeightRowSpan = rowSpan;
        this._setCardHeight();
    }
    get cardHeightRowSpan(): number {
        return this._cardHeightRowSpan;
    }

    /**
     * Number of row span card mini header height takes.
     * Mini Header: The smallest representation of the card is the header.
     * The card can be collapsed to only its header height.
     */
    @Input()
    set cardMiniHeaderRowSpan(rowSpan: number) {
        this._cardMiniHeaderRowSpan = rowSpan;
        this._setCardMiniHeaderHeight();
    }
    get cardMiniHeaderRowSpan(): number {
        return this._cardMiniHeaderRowSpan;
    }

    /**
     * Number of row span card mini content height takes.
     * Mini Content: The minimum height for the card content depends on the card type,
     * and must be as high as the smallest representation of the content.
     */
    @Input()
    set cardMiniContentRowSpan(rowSpan: number) {
        this._cardMiniContentRowSpan = rowSpan;
        this._setCardMiniContentHeight();
    }
    get cardMiniContentRowSpan(): number {
        return this._cardMiniContentRowSpan ?? 0;
    }

    /** Card can be set to resizable=false, to restrict card resize */
    @Input()
    resizable = true;

    /** Set left position for the card */
    @Input()
    @HostBinding('style.left.px')
    left: Nullable<number>;

    /** Set right position for the card */
    @Input()
    @HostBinding('style.right.px')
    right: Nullable<number>;

    /** Set top position for the card*/
    @Input()
    @HostBinding('style.top.px')
    top = 0;

    /** @hidden while resizing this value will change to a greater value */
    @HostBinding('style.z-index')
    zIndex = 0;

    /** @hidden */
    @HostBinding('style.position')
    position = 'absolute';

    /** @hidden transition animation when layout re-draws */
    @HostBinding('class.fd-resizable-card-layout__draw-transition')
    reDrawAnimation = true;

    /** Emits when card is still resizing */
    @Output()
    resizing: EventEmitter<ResizedEvent> = new EventEmitter<ResizedEvent>();

    /** Emits when card resize is completed */
    @Output()
    resized: EventEmitter<ResizedEvent> = new EventEmitter<ResizedEvent>();

    /** Emits when card height is reduced to show only header */
    @Output()
    miniHeaderReached: EventEmitter<ResizedEvent> = new EventEmitter<ResizedEvent>();

    /** Emits when minimum height of card content area is reached */
    @Output()
    miniContentReached: EventEmitter<ResizedEvent> = new EventEmitter<ResizedEvent>();

    /** show corner resize icon on hover over card */
    showingResizeIcon = false;

    /** show border when card is resizing */
    showBorder = false;

    /** starting column position of card. starts with 0 */
    startingColumnPosition: number;

    /** card width in px. Default value to 20rem */
    cardWidth: number = horizontalResizeStep;

    /** card height in px */
    cardHeight: number;

    /** Mini-header height of card */
    cardMiniHeaderHeight: number;

    /** Mini-content height of card to display minimum valid content */
    cardMiniContentHeight: number;

    /** Outer resize indication border width for the card */
    resizeIndicationBorderWidth = 0;

    /**
     * Denotes if card is currently expanding or contracting horizontally.
     * +1 denotes increasing, -1 denotes decreasing and 0 denotes card-state has not changed horizontally.
     */
    cardState: CardState = 0;

    /** Change in rank from previous value*/
    prevRank = 0;

    /** @hidden Default width of card is 20rem ie. 1 column */
    private _cardWidthColSpan = 1;

    /** @hidden */
    private _cardHeightRowSpan: number;

    /** @hidden helps in vertical step change event emit */
    private _prevCardHeightRowSpan: number;

    /** @hidden */
    private _cardMiniHeaderRowSpan: number;

    /** @hidden */
    private _cardMiniContentRowSpan?: number;

    /** @hidden config values for card */
    private _config: ResizableCardItemConfig;

    /** @hidden previous cursor x position */
    private _prevX: number;

    /** @hidden previous cursor y position */
    private _prevY: number;

    /** @hidden */
    private _prevCardWidth: number;

    /** @hidden */
    private _prevCardHeight: number;

    /** @hidden flag to control resize */
    private _resize = false;

    /** @hidden */
    private _resizeDirection: ResizeDirection;

    /** @hidden */
    private _maxColumn: number;

    /**
     * @hidden stores original width span of card.
     * It may reduce on small screen, so have to restore using this.
     */
    private _originalCardWidthSpan = 0;

    /** @hidden */
    private _rank: number;

    /** @hidden */
    private _rtl = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        @Optional() private readonly _rtlService: RtlService
    ) {
        if (this._rtlService) {
            this._subscriptions.add(this._rtlService.rtl.subscribe((value) => (this._rtl = value)));
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * When resize handler is pressed and resizing may start.
     * @param event: MouseEvent
     * @param resizeDirection: which handler is pressed to resize
     */
    onMouseDown(event: MouseEvent, resizeDirection: ResizeDirection): void {
        event.preventDefault();
        if (!this.resizable) {
            return;
        }

        this.showingResizeIcon = true;
        this._resize = true;
        this._prevX = event.clientX;
        this._prevY = event.clientY;
        this._prevCardWidth = this.cardWidth;
        this._prevCardHeight = this.cardHeight;
        this._resizeDirection = resizeDirection;
    }

    /**
     * @hidden When mouse moves to resize the card.
     * using window:mousemove so, resize will happen smoothly
     * @param event: MouseEvent
     */
    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        event.preventDefault();
        if (!this.resizable) {
            return;
        }

        // saves from un-necessary resize
        if (!this._resize) {
            return;
        }

        if (!this.showBorder) {
            this.showBorder = true;
        }

        // resizing card will go over other cards
        this.zIndex = 1;

        const { clientX, clientY } = event;
        switch (this._resizeDirection) {
            case 'both':
                this._horizontalResizing(clientX);
                this._verticalResizing(clientY);
                break;
            case 'horizontal':
                this._horizontalResizing(clientX);
                break;
            case 'vertical':
                this._verticalResizing(clientY);
                break;
            default:
                this._horizontalResizing(clientX);
                this._verticalResizing(clientY);
        }

        const cardWidthColSpan = Math.floor(this.cardWidth / horizontalResizeStep);
        const cardWidthWithColumn = cardWidthColSpan * horizontalResizeStep + cardWidthColSpan * gap;

        const horizontalResizeThresholdReached = this.cardWidth - cardWidthWithColumn > horizontalResizeOffset;

        if (clientX > this._prevX) {
            // increasing width
            this.cardState = 1;

            if (horizontalResizeThresholdReached) {
                const futureCardWidth = (cardWidthColSpan + 1) * horizontalResizeStep + cardWidthColSpan * gap;
                this.resizeIndicationBorderWidth = futureCardWidth - this.cardWidth;
            } else {
                this.resizeIndicationBorderWidth = 0;
            }
        } else if (clientX < this._prevX) {
            // decreasing width
            this.cardState = -1;
            if (horizontalResizeThresholdReached) {
                const futureCardWidth = (cardWidthColSpan + 1) * horizontalResizeStep + cardWidthColSpan * gap;
                this.resizeIndicationBorderWidth = futureCardWidth - this.cardWidth;
            } else {
                this.resizeIndicationBorderWidth = 0;
            }
        }

        this._prevX = clientX;
        this._prevY = clientY;
        this._cd.detectChanges();

        // Emits resizing event.
        this.resizing.emit(this.getResizedEventObject());
    }

    /**
     * when resizing of card stops
     * @param event: MouseEvent
     */
    @HostListener('document: mouseup', ['$event'])
    onMouseUp(): void {
        if (!this.resizable) {
            return;
        }
        // if card was not resizing
        if (!this._resize) {
            return;
        }

        // increase/decrease width of card in order of 20rem
        if (Math.abs(this.cardWidth - this._prevCardWidth) > 0) {
            this._horizontalStepResizing();
        }

        // increase/decrease height of card in order of 1rem
        if (Math.abs(this.cardHeight - this._prevCardHeight) > 0) {
            this._verticalStepResizing();
        }

        this._stopResizing();
        this._cd.markForCheck();
    }

    /** Sets focus on the element */
    focus(): void {
        const header = this._elementRef.nativeElement.querySelector('.fd-card__header');
        header?.focus();
    }

    /** Shows resize icon */
    showResizeIcon(): void {
        if (!this.resizable) {
            return;
        }
        this.showingResizeIcon = true;
    }

    /** Hides resize icon */
    hideResizeIcon(): void {
        if (!this._resize) {
            this.showingResizeIcon = false;
        }
    }

    /** Returns max width for card, based on layout size passed */
    getMaxColSpan(layoutSize: string): number {
        switch (layoutSize) {
            case 'sm':
                this._maxColumn = 1;
                break;
            case 'md':
                this._maxColumn = 2;
                break;
            case 'lg':
                this._maxColumn = 3;
                break;
            case 'xl':
                this._maxColumn = 4;
                break;
            default:
                this._maxColumn = 1;
        }
        return this._maxColumn;
    }

    /** Update card width if it exceeds column span based on layout */
    verifyUpdateCardWidth(layoutSize: string): void {
        const widthColSpan = this._config?.cardWidthColSpan || this.cardWidthColSpan;
        // storing original width of card.
        // used to restore width on window resize from small to large
        this._originalCardWidthSpan = !this._originalCardWidthSpan ? widthColSpan : this._originalCardWidthSpan;
        this._maxColumn = this.getMaxColSpan(layoutSize);
        if (widthColSpan > this._maxColumn) {
            this.cardWidthColSpan = this._maxColumn;
            this._setCardWidth();
            // Emits resized event.
            this.resized.emit(this.getResizedEventObject());
        } else {
            // keep card width minimum, so it can fit in screen.
            this.cardWidthColSpan = Math.min(this._maxColumn, this._originalCardWidthSpan);
            this._setCardWidth();
            // Emits resized event.
            this.resized.emit(this.getResizedEventObject());
        }
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** Returns ResizedEvent object to emit. */
    getResizedEventObject(): ResizedEvent {
        const newCardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
        const newCardWidthColSpan = Math.floor(this.cardWidth / horizontalResizeStep);
        const newCardWidth = newCardWidthColSpan * horizontalResizeStep + newCardWidthColSpan * gap;

        const horizontalResizeThresholdReached = this.cardWidth - newCardWidth > horizontalResizeOffset;
        const newCardColSpan = horizontalResizeThresholdReached ? newCardWidthColSpan + 1 : newCardWidthColSpan;
        return new ResizedEvent(
            this,
            this._prevCardWidth,
            this._prevCardHeight,
            this.cardWidth,
            this.cardHeight,
            this._cardWidthColSpan,
            this._cardHeightRowSpan,
            newCardColSpan,
            newCardHeightRowSpan
        );
    }

    /** @hidden Return previous height row span of the card */
    get previousCardHeightRowSpan(): number {
        return this._prevCardHeightRowSpan;
    }

    /** @hidden Set card properties using config received */
    private _initialSetup(): void {
        this.cardWidthColSpan = this._config?.cardWidthColSpan || this.cardWidthColSpan;
        this.cardHeightRowSpan = this._config?.cardHeightRowSpan || this.cardHeightRowSpan;
        this.title = this._config?.title || this.title;
        this.rank = this._config?.rank || this.rank;
        this.cardMiniHeaderRowSpan = this._config?.cardMiniHeaderRowSpan || this.cardMiniHeaderRowSpan;
        this.cardMiniContentRowSpan = this._config?.cardMiniContentRowSpan || this.cardMiniContentRowSpan;
        this.resizable = this._config.resizable || this.resizable;
    }

    /** @hidden Returns true when resize offset is crossed */
    private _horizontalResizeWithOffset(): void {
        // positive value indicates that width has increased
        const widthIncrement = this.cardWidth - this._prevCardWidth;
        const cardSpan = Math.floor(this.cardWidth / horizontalResizeStep);
        const cardSpanFraction = this.cardWidth % horizontalResizeStep;

        // when width increases
        if (widthIncrement > 0) {
            if (widthIncrement < horizontalResizeOffset + gap) {
                // widthIncrement is less than offset, do not increase width
                this.cardWidth = this._prevCardWidth;
            } else {
                // check value of cardSpanFraction, including gaps in cards
                let isCardSpanFractionCrossingOffset = false;
                isCardSpanFractionCrossingOffset = cardSpanFraction - (cardSpan - 1) * gap > horizontalResizeOffset;
                this.cardWidth = isCardSpanFractionCrossingOffset
                    ? (cardSpan + 1) * horizontalResizeStep
                    : cardSpan * horizontalResizeStep;
            }
        } else {
            // when width decreases
            if (Math.abs(widthIncrement) < horizontalResizeOffset) {
                // widthIncrement is less than offset, do not decrease width
                this.cardWidth = this._prevCardWidth;
            } else {
                // check value of cardSpanFraction, including gaps in cards
                let isCardSpanFractionCrossingOffset = false;
                isCardSpanFractionCrossingOffset = cardSpanFraction - cardSpan * gap > horizontalResizeOffset;
                this.cardWidth = isCardSpanFractionCrossingOffset
                    ? (cardSpan + 1) * horizontalResizeStep
                    : cardSpan * horizontalResizeStep;
            }
        }
    }

    /**
     * @hidden make horizontal resize only on step of 20rem
     */
    private _horizontalStepResizing(): void {
        this._horizontalResizeWithOffset();

        // Add inner gap in  cardWidth if width is more than 1 column
        if (this.cardWidth > horizontalResizeStep) {
            this.cardWidth = this.cardWidth + (this.cardWidth / horizontalResizeStep - 1) * gap;
        }
        this.cardWidthColSpan = Math.floor(this.cardWidth / horizontalResizeStep);
    }

    /**
     * @hidden make vertical resize only on step of 1rem
     */
    private _verticalStepResizing(): void {
        // positive value indicates that height has increased
        const cardHeightSpan = Math.floor(this.cardHeight / verticalResizeStep);
        const cardSpanFraction = this.cardHeight % verticalResizeStep;
        this.cardHeight =
            cardSpanFraction > verticalResizeOffset
                ? (cardHeightSpan + 1) * verticalResizeStep
                : cardHeightSpan * verticalResizeStep;

        this.cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
    }

    /**
     * @hidden Resize card horizontally by checking boundary condition
     * @param xPosition: current x-position of cursor
     */
    private _horizontalResizing(xPosition: number): void {
        const difference = this._prevX - xPosition;
        this.cardWidth = this._rtl ? this.cardWidth + difference : this.cardWidth - difference;

        const totalIndentation = (this._maxColumn - 1) * gap;
        const maxCardWidtWithoutIndentation = this._maxColumn * horizontalResizeStep;

        const maxCardWidth = this._rtl
            ? maxCardWidtWithoutIndentation - totalIndentation
            : maxCardWidtWithoutIndentation + totalIndentation;

        if (this.cardWidth > maxCardWidth) {
            this.cardWidth = maxCardWidth;
        } else if (this.cardWidth < horizontalResizeStep) {
            this.cardWidth = horizontalResizeStep;
        }
    }

    /**
     * @hidden Resize card vertically.
     * takes care of mini-header height and mini-content height
     * @param yPosition: current y-position of cursor
     */
    private _verticalResizing(yPosition: number): void {
        let reachingMiniHeader = false;

        if (this.cardHeight === this.cardMiniHeaderHeight) {
            // if card height is already at mini-header height
            if (this._prevY - yPosition > 0) {
                // decreasing height
                // if miniHeader height reached, stop resizing
                this.cardHeight = this.cardMiniHeaderHeight;
                this._prevCardHeightRowSpan = this._cardHeightRowSpan;
                this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
            } else {
                // increasing height
                this.cardHeight = this.cardMiniHeaderHeight + this.cardMiniContentHeight;
                this._prevCardHeightRowSpan = this._cardHeightRowSpan;
                this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
                this._stopResizing();
                this.miniContentReached.emit(this.getResizedEventObject());
            }
        } else if (this.cardHeight < this.cardMiniContentHeight + this.cardMiniHeaderHeight) {
            // if card height is between mini-header and mini-content
            if (this._prevY - yPosition < 0) {
                this.cardHeight = this.cardMiniHeaderHeight + this.cardMiniContentHeight;
                this._prevCardHeightRowSpan = this._cardHeightRowSpan;
                this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
                this._stopResizing();
                this.miniContentReached.emit(this.getResizedEventObject());
            }
        } else if (
            this.cardHeight === this.cardMiniContentHeight + this.cardMiniHeaderHeight &&
            this._prevY - yPosition > 0
        ) {
            // decreasing height
            // height decreasing after reaching mini-content. this needs to differentiate
            // from height decreasing and reaching to mini-content.
            reachingMiniHeader = true;
            this.cardHeight = this.cardMiniHeaderHeight;
            this._prevCardHeightRowSpan = this._cardHeightRowSpan;
            this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
            // miniHeader height reached, stop resizing
            this._stopResizing();
            this.miniHeaderReached.emit(this.getResizedEventObject());
        } else {
            this.cardHeight = this.cardHeight - (this._prevY - yPosition);
            this._prevCardHeightRowSpan = this._cardHeightRowSpan;
            this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
        }

        // stop resizing on miniContent height
        if (
            this.cardHeight <= this.cardMiniContentHeight + this.cardMiniHeaderHeight &&
            this._prevY - yPosition > 0 &&
            !reachingMiniHeader
        ) {
            this.cardHeight = this.cardMiniContentHeight + this.cardMiniHeaderHeight;
            this._prevCardHeightRowSpan = this._cardHeightRowSpan;
            this._cardHeightRowSpan = Math.floor(this.cardHeight / verticalResizeStep);
            this.miniContentReached.emit(this.getResizedEventObject());
            this._stopResizing();
        }

        // while corner resize, width might have increased and reached to mini-content height.
        // so, on mini-content resize will stop, but have to do step resizing for vertical and horizontal.
        if (!this._resize) {
            // increase/decrease width of card in order of 20rem
            if (Math.abs(this.cardWidth - this._prevCardWidth) > 0) {
                this._horizontalStepResizing();
            }

            // increase/decrease height of card in order of 1rem
            if (Math.abs(this.cardHeight - this._prevCardHeight) > 0) {
                this._verticalStepResizing();
            }
        }
    }

    /** @hidden reset involved variables while resizing */
    private _stopResizing(): void {
        if (this._resize) {
            this.cardState = 0;
            this.resizeIndicationBorderWidth = 0;
            this._resize = false;
            this.zIndex = 0;
            this.showBorder = false;
            this.resized.emit(this.getResizedEventObject());
        }
    }

    /** @hidden Returns cardWidth based on card column span */
    private _setCardWidth(): void {
        this.cardWidth = this._cardWidthColSpan * horizontalResizeStep + (this._cardWidthColSpan - 1) * gap;
        this._cd.markForCheck();
    }

    /** @hidden Returns cardHeight based on card row span */
    private _setCardHeight(): void {
        this.cardHeight = this._cardHeightRowSpan * verticalResizeStep;
        this._cd.markForCheck();
    }

    /** @hidden Returns card mini header height */
    private _setCardMiniHeaderHeight(): void {
        this.cardMiniHeaderHeight = this._cardMiniHeaderRowSpan * verticalResizeStep;
        this._cd.markForCheck();
    }

    /** @hidden Returns card mini content height */
    private _setCardMiniContentHeight(): void {
        this.cardMiniContentHeight = this.cardMiniContentRowSpan * verticalResizeStep;
        this._cd.markForCheck();
    }
}

/** Config interface for card properties */
export interface ResizableCardItemConfig {
    title?: string;
    rank?: number;
    cardWidthColSpan?: number;
    cardHeightRowSpan?: number;
    cardMiniHeaderRowSpan?: number;
    cardMiniContentRowSpan?: number;
    resizable?: boolean;
}

/** Object to emit on resize complete */
export class ResizedEvent {
    /**
     * Object to emit on resize complete
     * @param card
     * @param prevCardWidth Previous card width
     * @param prevCardHeight Previous card height
     * @param cardWidth Current card width
     * @param cardHeight Current card height
     * @param cardWidthColSpan Current card width column span
     * @param cardHeightRowSpan Current card height row span
     * @param newCardWidthColSpan New card width column span
     * @param newCardHeightRowSpan New card height row span
     */
    constructor(
        public card: ResizableCardItemComponent,
        public prevCardWidth: number,
        public prevCardHeight: number,
        public cardWidth: number,
        public cardHeight: number,
        public cardWidthColSpan: number,
        public cardHeightRowSpan: number,
        public newCardWidthColSpan: number,
        public newCardHeightRowSpan: number
    ) {}
}
