import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

const CARD_MINIMUM_WIDTH = 320; // in px; 20rem max card size
const CARD_GAP_WIDTH = 16; // gap=1rem==16px
const DRAG_START_DELAY = 200;
let cardRank = 1;

@Directive({ selector: '[fdCardDef]' })
export class CardDefinitionDirective {
    /**
     * Behaves like rank of card.
     * Useful in creating layout again after drag and drop.
     */
    @Input()
    set fdCardDef(value: NumberInput) {
        if (!value) {
            return;
        }

        this._fdCardDef = coerceNumberProperty(value);
    }
    get fdCardDef(): number {
        return this._fdCardDef;
    }

    /** @hidden */
    private _fdCardDef: number = cardRank++;

    /** @hidden */
    constructor(public template: TemplateRef<any>) {}
}

class Layout {
    constructor(public numberOfColumns: number, public screenSize: number) {}
}

class CardDropped {
    constructor(
        public container: CdkDropList,
        public prevContainer: CdkDropList,
        public previousIndex: number,
        public currentIndex: number,
        public layoutColumns: number,
        public items: CardDefinitionDirective[]
    ) {}
}

type CardColumn = CardDefinitionDirective[];

@Component({
    selector: 'fd-fixed-card-layout',
    templateUrl: './fixed-card-layout.component.html',
    styleUrls: ['./fixed-card-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FixedCardLayoutComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    /** Drag drop behavior can be disabled */
    @Input()
    disableDragDrop: boolean;

    /** Drag start delay in milliseconds, default to 200ms for safe scrolling on mobile with touchscreen */
    @Input()
    dragStartDelay = DRAG_START_DELAY;

    /** Card's minimum width in pixels. */
    @Input()
    set cardMinimumWidth(value: number) {
        this._cardMinimumWidth = coerceNumberProperty(value);

        // If component is ready, do the recalculation.
        if (this._layout) {
            this.updateLayout();
        }
    }
    get cardMinimumWidth(): number {
        return this._cardMinimumWidth;
    }

    /** Event to emit, when layout changes */
    @Output()
    layoutChange: EventEmitter<Layout> = new EventEmitter<Layout>();

    /** Event to emit on Card dragged and dropped */
    @Output()
    cardDraggedDropped: EventEmitter<CardDropped> = new EventEmitter<CardDropped>();

    /** @hidden */
    @ContentChildren(CardDefinitionDirective)
    _cards: QueryList<CardDefinitionDirective>;

    /** @hidden */
    @ViewChildren(FixedCardLayoutItemComponent)
    _cardContainers: QueryList<FixedCardLayoutItemComponent>;

    /** @hidden */
    @ViewChildren('cardWrapper', { read: ElementRef })
    _cardWrappers: QueryList<ElementRef>;

    /** @hidden */
    @ViewChild('layout')
    _layout: ElementRef;

    /** @hidden */
    _cardsArray: Array<CardDefinitionDirective>;

    /** @hidden */
    _columns: CardColumn[];

    /** @hidden */
    _cardWrapperColumns: ElementRef[][];

    /** @hidden*/
    _containerHeight: number;

    /** @hidden handles rtl service */
    _dir = 'ltr';

    /** @hidden Return available width for fixed card layout */
    get _availableWidth(): number {
        return this._layout.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden Number of Columns in layout */
    private _numberOfColumns: number;

    /** @hidden */
    private _previousNumberOfColumns: number;

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<FixedCardLayoutItemComponent>;

    /** @hidden */
    private _cardMinimumWidth = CARD_MINIMUM_WIDTH;

    /** @hidden An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _changeDetector: ChangeDetectorRef,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenOnResize();
        this._subscribeToRtl();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnCardsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        /** Create column layout when view is initialized */
        this.updateLayout();
        this._accessibilitySetup();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        /**
         * Update column layout when orientation of screen changes.
         * actual width is returned when view is stable. In AfterViewInit, correct value does not come.
         */
        this.updateLayout();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        event.stopImmediatePropagation();

        if (this._keyboardEventsManager) {
            this._keyboardEventsManager.onKeydown(event);
        }
    }

    /** Arranges cards on drop of dragged card */
    _onDragDrop(event: CdkDragDrop<number, number>): void {
        moveItemInArray(this._cardsArray, event.previousContainer.data, event.container.data);

        // Need to adjust rank after drag and drop
        this._adjustCardRank(
            event.item.data,
            // each container always has only 1 item
            event.container.getSortedItems()[0].data
        );

        this.cardDraggedDropped.emit(
            new CardDropped(
                event.container,
                event.previousContainer,
                event.previousContainer.data,
                event.container.data,
                this._numberOfColumns,
                this._cardsArray
            )
        );
    }

    /** Distribute cards on window resize */
    updateLayout(): void {
        this._numberOfColumns = this._getNumberOfColumns();

        if (this._previousNumberOfColumns !== this._numberOfColumns) {
            this._previousNumberOfColumns = this._numberOfColumns;

            this._renderLayout();
        }
    }

    /** @hidden */
    private _accessibilitySetup(): void {
        this._keyboardEventsManager = new FocusKeyManager(this._cardContainers).withWrap();
    }

    /** @hidden Method to update rank after cards are dragged */
    private _adjustCardRank(draggedCard: CardDefinitionDirective, replacedCard: CardDefinitionDirective): void {
        const draggedCardRank = draggedCard.fdCardDef;
        draggedCard.fdCardDef = replacedCard.fdCardDef;
        replacedCard.fdCardDef = draggedCardRank;
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';
            this._changeDetector.detectChanges();
        });
    }

    /** @hidden Listen window resize and distribute cards on column change */
    private _listenOnResize(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(60), takeUntil(this._onDestroy$))
            .subscribe(() => this.updateLayout());
    }

    /** @hidden Listen card change and distribute cards on column change */
    private _listenOnCardsChange(): void {
        this._cards.changes.subscribe(() => this._renderLayout());
    }

    /** @hidden Returns number of columns that can fit in current available width for fd-card-layout */
    private _getNumberOfColumns(): number {
        const availableLayoutWidth = this._availableWidth;
        const numberOfCardsWithNoGap = Math.floor(availableLayoutWidth / this.cardMinimumWidth); // 960 / 320 = 3
        const requiredWidthWithGap =
            numberOfCardsWithNoGap * this.cardMinimumWidth + (numberOfCardsWithNoGap - 1) * CARD_GAP_WIDTH;

        let columnCount =
            requiredWidthWithGap > availableLayoutWidth ? numberOfCardsWithNoGap - 1 : numberOfCardsWithNoGap;
        columnCount = columnCount || 1;

        this.layoutChange.emit(new Layout(columnCount, availableLayoutWidth));

        return columnCount;
    }

    /** @hidden Renders layout on column changes */
    private _renderLayout(): void {
        const cardColumns = this._getCardColumns();

        this._cardsArray = [].concat(...cardColumns);

        // to render cards & be able to limit container height
        this._changeDetector.detectChanges();

        this._setCardWrapperColumns(cardColumns);
        this._calculateContainerHeight();

        // to update layout after setting container height
        this._changeDetector.detectChanges();
    }

    /** @hidden Distribute cards among columns to arrange them in "Z" flow */
    private _getCardColumns(): CardColumn[] {
        const cardsArray = this._cards
            .toArray()
            .sort((firstCard, secondCard) => firstCard.fdCardDef - secondCard.fdCardDef);
        const numberOfColumns = this._getNumberOfColumns();
        const columns: CardColumn[] = new Array(numberOfColumns).fill(0).map(() => new Array(0));

        cardsArray.forEach((card, i) => columns[i % numberOfColumns].push(card));

        return columns;
    }

    /** @hidden Set card wrapper columns accordingly to card columns, needed to limit container height basing on card wrapper columns */
    private _setCardWrapperColumns(cardColumns: CardColumn[]): void {
        const wrapperColumns: ElementRef[][] = new Array(cardColumns.length).fill(0).map(() => new Array(0));

        let currColumnIndex = 0;

        this._cardsArray.forEach((card, index) => {
            if (!cardColumns[currColumnIndex].find((_card) => _card === card)) {
                currColumnIndex++;
            }

            wrapperColumns[currColumnIndex].push(this._cardWrappers.get(index));
        });

        this._cardWrapperColumns = wrapperColumns;
    }

    /** @hidden Calculate container height basing on the card wrapper columns */
    _calculateContainerHeight(): void {
        const columnsHeights = this._cardWrapperColumns
            .map((column) => column.map((card) => card.nativeElement.getBoundingClientRect().height))
            .map((column) => column.reduce((height, cardHeight) => (height += cardHeight)));

        this._containerHeight = Math.max(...columnsHeights);
    }
}
