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
    ViewChildren
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FocusKeyManager } from '@angular/cdk/a11y';

import { RtlService } from '../utils/services/rtl.service';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';

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
    fdCardDef: number = cardRank++;

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    /** @hidden */
    @ContentChildren(CardDefinitionDirective)
    cards: QueryList<CardDefinitionDirective>;

    /** @hidden */
    @ViewChildren(FixedCardLayoutItemComponent)
    cardContainers: QueryList<FixedCardLayoutItemComponent>;

    /** @hidden */
    @ViewChild('layout')
    layout: ElementRef;

    /** Drag drop behavior can be disabled */
    @Input()
    disableDragDrop: boolean;

    /** Drag start delay in milliseconds */
    @Input()
    dragStartDelay = DRAG_START_DELAY;

    /** Event to emit, when layout changes */
    @Output()
    layoutChange: EventEmitter<Layout> = new EventEmitter<Layout>();

    /** Event to emit on Card dragged and dropped */
    @Output()
    cardDraggedDropped: EventEmitter<CardDropped> = new EventEmitter<CardDropped>();

    /** Array of CardDefinitionDirective Array.To make Table kind of layout.*/
    public columns: CardColumn[];

    /** handles rtl service
     * @hidden */
    public dir: string;

    /** @hidden Number of Columns in layout */
    private _numberOfColumns: number;

    /** @hidden */
    private _previousNumberOfColumns: number;

    /** @hidden */
    private _cardsArray: Array<CardDefinitionDirective>;

    /** @hidden An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<FixedCardLayoutItemComponent>;

    constructor(private readonly _changeDetector: ChangeDetectorRef, @Optional() private _rtlService: RtlService) {}

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
    dragDrop(event: CdkDragDrop<CardDefinitionDirective[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const targetData = event.container.data[event.currentIndex];
            event.container.data[event.currentIndex] = event.previousContainer.data[event.previousIndex];
            event.previousContainer.data[event.previousIndex] = targetData;
        }

        // Need to adjust rank after drag and drop
        this._adjustCardRank(
            event.container.data[event.currentIndex],
            event.previousContainer.data[event.previousIndex]
        );

        this.cardDraggedDropped.emit(
            new CardDropped(
                event.container,
                event.previousContainer,
                event.previousIndex,
                event.currentIndex,
                this._numberOfColumns,
                this._cardsArray
            )
        );
    }

    /** Distribute cards on window resize */
    public updateLayout(): void {
        this._numberOfColumns = this._getNumberOfColumns();
        if (this._previousNumberOfColumns !== this._numberOfColumns) {
            this._previousNumberOfColumns = this._numberOfColumns;
            this._renderLayout();
        }
    }

    /** Return available width for fd-card-layout */
    public getWidthAvailable(): number {
        return this.layout.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden */
    private _accessibilitySetup(): void {
        this._keyboardEventsManager = new FocusKeyManager(this.cardContainers).withWrap();
    }

    /** @hidden Method to update rank after cards are dragged */
    private _adjustCardRank(draggedCard: CardDefinitionDirective, replacedCard: CardDefinitionDirective): void {
        const draggedCardRank = draggedCard.fdCardDef;
        draggedCard.fdCardDef = replacedCard.fdCardDef;
        replacedCard.fdCardDef = draggedCardRank;
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            this.dir = 'ltr';
        }
        this._rtlService.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl: boolean) => {
            this.dir = isRtl ? 'rtl' : 'ltr';
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
        this.cards.changes.subscribe(() => this._renderLayout());
    }

    /** @hidden Returns number of columns that can fit in current available width for fd-card-layout */
    private _getNumberOfColumns(): number {
        let columnCount: number;

        // get fd-card-layout width and calculate how many cards can fit into it
        const availableLayoutWidth = this.getWidthAvailable();
        const numberOfCardsWithNoGap = Math.floor(availableLayoutWidth / CARD_MINIMUM_WIDTH);
        const requiredWidthWithGap =
            numberOfCardsWithNoGap * CARD_MINIMUM_WIDTH + (numberOfCardsWithNoGap - 1) * CARD_GAP_WIDTH;

        if (requiredWidthWithGap > availableLayoutWidth) {
            columnCount = numberOfCardsWithNoGap - 1;
        } else {
            columnCount = numberOfCardsWithNoGap;
        }

        // minimum number of column to 1
        columnCount = columnCount ? columnCount : 1;
        this.layoutChange.emit(new Layout(columnCount, availableLayoutWidth));
        return columnCount;
    }

    /**
     * @hidden Renders layout on column changes.
     */
    private _renderLayout(): void {
        // convert latest cards queryList to Array of cards
        this._cardsArray = this.cards.toArray();
        this._initializeColumns(this._numberOfColumns);
        this._distributeCards(this.columns);
        this._changeDetector.detectChanges();
    }

    /**
     * @hidden Initialize columns with empty arrays
     */
    private _initializeColumns(numberOfColumns: number): void {
        this.columns = [];
        for (let i = 0; i < numberOfColumns; i++) {
            this.columns.push([]);
        }
    }

    /**
     * @hidden Redistribute cards among columns
     */
    private _distributeCards(columns: CardColumn[]): void {
        const numberOfColumns = columns.length;
        // sort cards based on rank then create layout
        this._cardsArray?.sort(comparator);
        this._cardsArray?.forEach((card, i) => {
            const index = i % numberOfColumns;
            columns[index].push(card);
        });

        function comparator(firstCard: CardDefinitionDirective, secondCard: CardDefinitionDirective): number {
            return firstCard.fdCardDef - secondCard.fdCardDef;
        }
    }
}
