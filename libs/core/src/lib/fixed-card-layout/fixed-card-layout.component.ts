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
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { RtlService } from '../utils/services/rtl.service';

const CARD_MINIMUM_WIDTH = 320; // in px; 20rem max card size
const CARD_GAP_WIDTH = 16; // gap=1rem==16px
const DRAG_START_DELAY = 200;

@Directive({ selector: '[fdCardDef]' })
export class CardDefinitionDirective {
    constructor(public template: TemplateRef<any>) {}
}

class Layout {
    constructor(public numberOfColumns: number, public screenSize: number) {}
}

class CardDropped {
    constructor(public container: CdkDropList, public previousIndex: number, public currentIndex: number) {}
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
    /** @hidden */
    @ContentChildren(CardDefinitionDirective)
    cards: QueryList<CardDefinitionDirective>;

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

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

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

    /** @hidden Arranges cards on drop of dragged card */
    public dragDrop(event: CdkDragDrop<CardDefinitionDirective[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const targetData = event.container.data[event.currentIndex];
            event.container.data[event.currentIndex] = event.previousContainer.data[event.previousIndex];
            event.previousContainer.data[event.previousIndex] = targetData;
        }
        this.cardDraggedDropped.emit(new CardDropped(event.container, event.previousIndex, event.currentIndex));
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

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
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
        this._initializeColumns(this._numberOfColumns);
        this._distributeCards(this.cards, this.columns);
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
    private _distributeCards(cards: QueryList<CardDefinitionDirective>, columns: CardColumn[]): void {
        const numberOfColumns = columns.length;
        cards?.forEach((card, i) => {
            const index = i % numberOfColumns;
            columns[index].push(card);
        });
    }
}
