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
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

const CARD_MINIMUM_WIDTH = 320; // 320px = 20rem, max card width
const CARD_GAP_WIDTH = 16; // 16px = 1rem
const DRAG_START_DELAY = 200; // in ms

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

export interface Layout {
    numberOfColumns?: number;
    screenSize: number;
}

export interface CardDropped {
    previousIndex: number;
    currentIndex: number;
    layoutColumns: number;
    items: CardDefinitionDirective[];
}

type CardColumn = CardDefinitionDirective[];

@Component({
    selector: 'fd-fixed-card-layout',
    templateUrl: './fixed-card-layout.component.html',
    styleUrls: ['./fixed-card-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-fixed-card-layout'
    }
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
    @ViewChildren('dropList', { read: CdkDropList })
    _cardWrappers: QueryList<CdkDropList>;

    /** @hidden */
    @ViewChild('layout')
    _layout: ElementRef;

    /** @hidden */
    _cardsArray: Array<CardDefinitionDirective>;

    /** @hidden Number of Columns in layout */
    _numberOfColumns: number;

    /** @hidden */
    _cardColumns: CardColumn[];

    /** @hidden*/
    _containerHeight: number;

    /** @hidden handles rtl service */
    _dir = 'ltr';

    /** @hidden Return available width for fixed card layout */
    get _availableWidth(): number {
        return this._layout.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden */
    private _previousNumberOfColumns: number;

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<FixedCardLayoutItemComponent>;

    /** @hidden */
    private _cardMinimumWidth = CARD_MINIMUM_WIDTH;

    /** @hidden */
    private _shouldCalculateContainerHeight = false;

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
        this._processCards();

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

    /** Distribute cards on window resize */
    updateLayout(): void {
        this._numberOfColumns = getNumberOfColumns(this._availableWidth, this.cardMinimumWidth);

        this.layoutChange.emit({
            numberOfColumns: this._numberOfColumns,
            screenSize: this._availableWidth
        });

        if (this._previousNumberOfColumns !== this._numberOfColumns) {
            this._previousNumberOfColumns = this._numberOfColumns;

            this._updateColumns();
        }
    }

    /** @hidden Calculate container height basing on the card wrapper columns */
    _calculateContainerHeight(): void {
        const wrapperColumns = this._cardColumns.map((column) =>
            column.map(
                (card) => this._cardWrappers.find((wrapper) => wrapper.getSortedItems()[0].data === card).element
            )
        );

        const columnsHeights = wrapperColumns
            .map((column) => column.map((card) => card.nativeElement.getBoundingClientRect().height))
            .map((column) => column.reduce((height, cardHeight) => (height += cardHeight)));

        // +4 because it's the top & bottom borders of card placeholder (0,125rem * 2)
        this._containerHeight = Math.max(...columnsHeights) + 4;

        this._changeDetector.detectChanges();
    }

    /** @hidden */
    _enterPredicate = (): boolean => {
        // We should update container's height & its children rects (to react when drag moves into the list) before we entered any drop list.
        // That's why it's done here instead of cdkDropListEntered. As this predicate being called many times here is the optimization.
        if (this._shouldCalculateContainerHeight) {
            this._calculateContainerHeight();
            this._shouldCalculateContainerHeight = false;
        }

        return true;
    };

    /** @hidden */
    _onDropListExited(): void {
        this._shouldCalculateContainerHeight = true;
    }

    /** @hidden */
    _onDragDropped(event: CdkDragDrop<number, number>): void {
        if (event.container.data === event.previousContainer.data) {
            return;
        }

        const movedCard = event.previousContainer.getSortedItems()[0].data;
        const replacedCard = event.container.getSortedItems()[0].data;

        const movedCardColumn = this._cardColumns.find((column) =>
            column.find((card) => card.fdCardDef === movedCard.fdCardDef)
        );
        const replacedCardColumn = this._cardColumns.find((column) =>
            column.find((card) => card.fdCardDef === replacedCard.fdCardDef)
        );

        // If we dragged the card from the same column as the column we're dropping into
        // There may be a situation where the order shouldn't change but since there are a different drop lists it will change
        // We should prevent this
        if (movedCardColumn === replacedCardColumn && movedCardColumn.length === 2) {
            if (movedCard.fdCardDef < replacedCard.fdCardDef && event.previousContainer.data < event.container.data) {
                return;
            }

            if (movedCard.fdCardDef > replacedCard.fdCardDef && event.previousContainer.data > event.container.data) {
                return;
            }
        }

        this._processDragDrop(event.previousContainer.data, event.container.data, movedCard, replacedCard);
    }

    /** @hidden For the keyboard drag&drop directive */
    _customMoveFn = (group: CardColumn, indexFrom: number, indexTo: number): void => {
        const movedCard = group[indexFrom];
        const replacedCard = group[indexTo];

        const indexFromArray = this._cardsArray.findIndex((card) => card.fdCardDef === movedCard.fdCardDef);
        const indexToArray = this._cardsArray.findIndex((card) => card.fdCardDef === replacedCard.fdCardDef);

        this._processDragDrop(indexFromArray, indexToArray, movedCard, replacedCard);
    };

    /** @hidden For the keyboard drag&drop directive */
    _customTransferFn = (prevGroup: CardColumn, nextGroup: CardColumn, indexFrom: number, indexTo: number): void => {
        const movedCard = prevGroup[indexFrom];
        const replacedCard = nextGroup[indexTo];

        const indexFromArray = this._cardsArray.findIndex((card) => card.fdCardDef === movedCard.fdCardDef);
        const indexToArray = this._cardsArray.findIndex((card) => card.fdCardDef === replacedCard.fdCardDef);

        this._processDragDrop(indexFromArray, indexToArray, movedCard, replacedCard);
    };

    /** @hidden */
    _getGroupIndex(card: CardDefinitionDirective): number {
        if (!this._cardColumns) {
            return 0;
        }

        return this._cardColumns.findIndex((column) => column.find((_card) => _card.fdCardDef === card.fdCardDef));
    }

    /** @hidden */
    _getItemIndex(card: CardDefinitionDirective): number {
        if (!this._cardColumns) {
            return 0;
        }

        return this._cardColumns[this._getGroupIndex(card)].findIndex((_card) => _card.fdCardDef === card.fdCardDef);
    }

    /** @hidden */
    _isSingleInColumn(card: CardDefinitionDirective): boolean {
        return (
            this._cardColumns?.find((column) => column.find((_card) => _card.fdCardDef === card.fdCardDef)).length < 2
        );
    }

    /** @hidden Arranges cards on drop of dragged card */
    private _processDragDrop(
        prevIndex: number,
        newIndex: number,
        prevCard: CardDefinitionDirective,
        newCard: CardDefinitionDirective
    ): void {
        // moveItemInArray from CDK won't work as it changes order of other cards
        const replacedCard = this._cardsArray[newIndex];
        this._cardsArray[newIndex] = this._cardsArray[prevIndex];
        this._cardsArray[prevIndex] = replacedCard;

        adjustCardRank(prevCard, newCard);

        this.cardDraggedDropped.emit({
            previousIndex: prevIndex,
            currentIndex: newIndex,
            layoutColumns: this._numberOfColumns,
            items: this._cards.toArray()
        });

        this._updateColumns();
    }

    /** @hidden */
    private _accessibilitySetup(): void {
        this._keyboardEventsManager = new FocusKeyManager(this._cardContainers).withWrap();
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
        this._cards.changes.subscribe(() => {
            this._processCards();
            this._updateColumns();
        });
    }

    /** @hidden Renders layout on column changes */
    private _updateColumns(): void {
        this._setCardColumns();
        this._calculateContainerHeight();
    }

    /** @hidden */
    private _processCards(): void {
        this._cardsArray = this._cards
            .toArray()
            .sort((firstCard, secondCard) => firstCard.fdCardDef - secondCard.fdCardDef);

        this._changeDetector.detectChanges();

        this.updateLayout();
    }

    /** @hidden Distribute cards among columns to arrange them in "Z" flow */
    private _setCardColumns(): void {
        const columns: CardColumn[] = new Array(this._numberOfColumns).fill(0).map(() => new Array(0));

        this._cardsArray.forEach((card, i) => columns[i % this._numberOfColumns].push(card));

        this._cardColumns = columns;
    }
}

/** @hidden Returns number of columns that can fit in current available width for fd-card-layout */
function getNumberOfColumns(containerWidth: number, cardWidth: number): number {
    const numberOfCardsWithNoGap = Math.floor(containerWidth / cardWidth); // 960 / 320 = 3
    const requiredWidthWithGap = numberOfCardsWithNoGap * cardWidth + (numberOfCardsWithNoGap - 1) * CARD_GAP_WIDTH;
    const columnCount = requiredWidthWithGap > containerWidth ? numberOfCardsWithNoGap - 1 : numberOfCardsWithNoGap;

    return columnCount || 1;
}

/** @hidden Method to update rank after cards are dragged */
function adjustCardRank(draggedCard: CardDefinitionDirective, replacedCard: CardDefinitionDirective): void {
    const draggedCardRank = draggedCard.fdCardDef;
    draggedCard.fdCardDef = replacedCard.fdCardDef;
    replacedCard.fdCardDef = draggedCardRank;
}
