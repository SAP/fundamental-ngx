import {
    AfterContentInit,
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
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, takeUntil } from 'rxjs/operators';

import { resizeObservable, RtlService } from '@fundamental-ngx/core/utils';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

const PX_IN_REM = 16;
const CARD_MINIMUM_WIDTH = 320; // 320px = 20rem
const CARD_GAP_WIDTH = 16; // 16px = 1rem
const DRAG_START_DELAY = 200; // in ms
const MAX_COLUMNS = 10;

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

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColumnsWidthConfig = { [C in Columns]?: number };

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
export class FixedCardLayoutComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    /** Drag drop behavior can be disabled */
    @Input()
    disableDragDrop: boolean;

    /** Drag start delay in milliseconds, default to 200ms for safe scrolling on mobile with touchscreen */
    @Input()
    dragStartDelay = DRAG_START_DELAY;

    /** Card's minimum width in pixels. */
    @Input()
    set cardMinimumWidth(value: NumberInput) {
        const coercedValue = coerceNumberProperty(value);

        if (coercedValue < CARD_MINIMUM_WIDTH) {
            return;
        }

        this._cardMinimumWidth = coercedValue;
    }
    get cardMinimumWidth(): number {
        return this._cardMinimumWidth;
    }

    /** Config with the width ratios that should take every column. Flex-grow principe. Missed values set to 0. s*/
    @Input()
    columnsWidthConfig: ColumnsWidthConfig;

    /** Limit the number of columns. Default is 10. */
    @Input()
    maxColumns = MAX_COLUMNS;

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
    @ViewChildren(CdkDropList)
    _dropList: QueryList<CdkDropList>;

    /** @hidden */
    @ViewChildren(CdkDrag)
    _dragList: QueryList<CdkDrag>;

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

    /** @hidden first number is the CardDefinition rank, i.e. id */
    _groupIndexes = new Map<number, number>();

    /** @hidden first number is the CardDefinition rank, i.e. id */
    _itemIndexes = new Map<number, number>();

    /** @hidden first number is the CardDefinition rank, i.e. id */
    _singleItemColumns = new Set<number>();

    /** @hidden */
    _columnsWidth = new Map<number, number>();

    /** @hidden Return available width for fixed card layout */
    get _availableWidth(): number {
        return this._layout.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden */
    _placeholderMargin: { [klass: string]: string };

    /** @hidden */
    private _previousNumberOfColumns: number;

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<FixedCardLayoutItemComponent>;

    /** @hidden */
    private _cardMinimumWidth = CARD_MINIMUM_WIDTH;

    /** @hidden */
    private _shouldCalculateContainerHeight = false;

    /** @hidden */
    private _viewInit = false;

    /** @hidden */
    private _cardColumnsSubscription = new Subscription();

    /** @hidden An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _changeDetector: ChangeDetectorRef,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscribeToRtl();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnCardsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._processCards();
        this._listenOnResize();
        this._accessibilitySetup();

        this._viewInit = true;
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._cards?.length || !this._viewInit) {
            return;
        }

        if ('maxColumns' in changes || 'cardMinimumWidth' in changes) {
            this.updateLayout();
        } else if ('columnsWidthConfig' in changes) {
            this._setColumnsWidth();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._cardColumnsSubscription.unsubscribe();

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
        if (!this._cards.length || !this._availableWidth) {
            return;
        }

        const possibleNumberOfColumns = getNumberOfColumns(this._availableWidth, this.cardMinimumWidth);

        this._numberOfColumns = Math.min(
            possibleNumberOfColumns,
            this._cards.length,
            this.maxColumns || MAX_COLUMNS,
            MAX_COLUMNS
        );

        this.layoutChange.emit({
            numberOfColumns: this._numberOfColumns,
            screenSize: this._availableWidth
        });

        if (this._previousNumberOfColumns !== this._numberOfColumns) {
            this._previousNumberOfColumns = this._numberOfColumns;
            this._updateColumns();
            return;
        }

        this._setColumnsWidth();
    }

    /** @hidden */
    _enterPredicate = (_: CdkDrag, drop: CdkDropList): boolean => {
        // We should update container's height & its children rects (to react when drag moves into the list) before we entered any drop list.
        // That's why it's done here instead of cdkDropListEntered. As this predicate being called many times here is the optimization.
        if (this._shouldCalculateContainerHeight) {
            this._shouldCalculateContainerHeight = false;

            // Placeholder doesn't have margin set yet but we need to count it
            // Margin will be set only if there are already items in container
            const additionalSpace = drop.getSortedItems().length ? PX_IN_REM : 0;

            this._calculateContainerHeight(additionalSpace);
        }

        return true;
    };

    /** @hidden */
    _onDropListExited(): void {
        this._shouldCalculateContainerHeight = true;
    }

    /** @hidden */
    _onDropListEntered(event: CdkDragEnter): void {
        const containerItemCardDef = (event.container.getSortedItems()[0].data as CardDefinitionDirective).fdCardDef;
        const dragItemCardDef = (event.item.data as CardDefinitionDirective).fdCardDef;

        this._setPlaceholderStyle(containerItemCardDef !== dragItemCardDef);
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
        if (movedCardColumn === replacedCardColumn && movedCardColumn?.length === 2) {
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
    _setPlaceholderStyle(value: boolean): void {
        this._placeholderMargin = value ? { 'margin-bottom': '1rem' } : {};
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
        resizeObservable(this._layout.nativeElement)
            .pipe(debounceTime(60), takeUntil(this._onDestroy$))
            .subscribe(() => this.updateLayout());
    }

    /** @hidden Listen card change and distribute cards on column change */
    private _listenOnCardsChange(): void {
        this._cards.changes
            .pipe(
                filter(() => this._viewInit),
                delay(0)
            )
            .subscribe(() => this._processCards());
    }

    /** @hidden Renders layout on column changes */
    private _updateColumns(): void {
        this._setCardColumns();
        this._setColumnsWidth(false);
        this._calculateContainerHeight();
    }

    /** @hidden */
    private _processCards(): void {
        this._cardsArray = this._cards
            .toArray()
            .sort((firstCard, secondCard) => firstCard.fdCardDef - secondCard.fdCardDef);

        this.updateLayout();
    }

    /** @hidden Distribute cards among columns to arrange them in "Z" flow */
    private _setCardColumns(): void {
        this._groupIndexes = new Map<number, number>();
        this._itemIndexes = new Map<number, number>();
        this._singleItemColumns = new Set<number>();

        const columns: CardColumn[] = new Array(this._numberOfColumns).fill(0).map(() => new Array(0));

        this._cardsArray.forEach((card, i) => {
            const currColumnIndex = i % this._numberOfColumns;
            const itemIndex = columns[currColumnIndex].length;

            columns[currColumnIndex].push(card);

            this._groupIndexes.set(card.fdCardDef, currColumnIndex);
            this._itemIndexes.set(card.fdCardDef, itemIndex);
        });

        this._cardColumns = columns;

        this._cardColumns.forEach((column) => {
            if (column.length > 0 && column.length < 2) {
                this._singleItemColumns.add(column[0].fdCardDef);
            }
        });

        this._listenToCardsSizeChange();
    }

    /** @hidden */
    private _setColumnsWidth(detectChanges = true): void {
        this._columnsWidth = new Map();

        const configPresent =
            this.columnsWidthConfig &&
            typeof this.columnsWidthConfig === 'object' &&
            Object.keys(this.columnsWidthConfig).length;

        if (!configPresent || !this._layout || this._numberOfColumns === 1) {
            return;
        }

        const fixedWidthModifiers = fixWidthModifiers(this.columnsWidthConfig, this._numberOfColumns);
        const totalWidthModifiers = fixedWidthModifiers.reduce((sum, width) => (sum += width), 0);
        const freeSpace = this._availableWidth - this.cardMinimumWidth * this._numberOfColumns;

        this._cardColumns.forEach((column, index) => {
            const columnWidth = Math.round(
                this.cardMinimumWidth + (freeSpace / totalWidthModifiers) * fixedWidthModifiers[index]
            );

            column.forEach((card) => this._columnsWidth.set(card.fdCardDef, columnWidth));
        });

        if (detectChanges) {
            this._changeDetector.detectChanges();
        }
    }

    /** @hidden Calculate container height basing on the card wrapper columns */
    private _calculateContainerHeight(additionalSpace: number = 0): void {
        this._changeDetector.detectChanges();

        const wrapperColumns = this._cardColumns.map((column) =>
            column
                .map((card) => this._dropList.find((wrapper) => wrapper.getSortedItems()[0].data === card)?.element)
                .filter((v): v is ElementRef<HTMLElement> => !!v)
        );

        const columnsHeights = wrapperColumns
            .map((column) => column.map((card) => card.nativeElement.getBoundingClientRect().height))
            .map((column) => column.reduce((height, cardHeight) => (height += cardHeight), 0));

        // +4px because it's the top & bottom borders of card placeholder
        this._containerHeight = Math.max(...columnsHeights) + 4 + additionalSpace;

        this._changeDetector.detectChanges();
    }

    /** @hidden */
    private _listenToCardsSizeChange(): void {
        this._cardColumnsSubscription.unsubscribe();
        this._cardColumnsSubscription = new Subscription();

        this._changeDetector.detectChanges();

        this._cardColumns.forEach((column) =>
            column
                .map((card) => this._dragList.find((wrapper) => wrapper.data === card)?.element)
                .filter((v): v is ElementRef<HTMLElement> => !!v)
                .forEach((card) => {
                    this._cardColumnsSubscription.add(
                        resizeObservable(card.nativeElement).subscribe(() => this._calculateContainerHeight())
                    );
                })
        );
    }
}

/** @hidden */
function fixWidthModifiers(config: ColumnsWidthConfig, numberOfColumns: number): number[] {
    const modifiers = new Array(numberOfColumns).fill(0);

    return modifiers.map((_, index) => {
        const columnWidthModifier = config[index + 1];

        if (!columnWidthModifier || columnWidthModifier < 0) {
            return 0;
        }

        return columnWidthModifier;
    });
}

/** @hidden Returns number of columns that can fit in current available width for fd-card-layout */
function getNumberOfColumns(containerWidth: number, cardWidth: number): number {
    containerWidth = containerWidth || 1;
    cardWidth = cardWidth || 1;

    const numberOfCardsWithNoGap = Math.max(Math.floor(containerWidth / cardWidth), 1); // Example: 960 / 320 = 3
    const requiredWidthWithGap = numberOfCardsWithNoGap * cardWidth + (numberOfCardsWithNoGap - 1) * CARD_GAP_WIDTH;
    const columnCount = requiredWidthWithGap > containerWidth ? numberOfCardsWithNoGap - 1 : numberOfCardsWithNoGap;

    return Math.max(columnCount, 1);
}

/** @hidden Method to update rank after cards are dragged */
function adjustCardRank(draggedCard: CardDefinitionDirective, replacedCard: CardDefinitionDirective): void {
    const draggedCardRank = draggedCard.fdCardDef;
    draggedCard.fdCardDef = replacedCard.fdCardDef;
    replacedCard.fdCardDef = draggedCardRank;
}
