import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
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
    NgZone,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';

const CARD_MINIMUM_WIDTH = 320; // in px; 20rem max card size
const CARD_GAP_WIDTH = 16; // gap=1rem==16px

@Directive({ selector: '[fdCardDef]' })
export class CardDefinitionDirective {
    constructor(public template: TemplateRef<any>) {}
}

class Layout {
    constructor(public noOfColumns: number, public screenSize: number) {}
}

class CardDropped {
    constructor(public container: CdkDropList, public previousIndex: number, public currentIndex: number) {}
}

type CardColumn = CardDefinitionDirective[];

@Component({
    selector: 'fd-fixed-card-layout',
    templateUrl: './fixed-card-layout.component.html',
    styleUrls: ['./fixed-card-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutComponent implements AfterContentInit, AfterViewInit {
    /** @hidden */
    @ContentChildren(CardDefinitionDirective)
    cards: QueryList<CardDefinitionDirective>;

    /** @hidden */
    @ViewChild('layout')
    layout: ElementRef;

    /** Drag drop behaviour can be disabled */
    @Input()
    disableDragDrop: boolean;

    /** Event to emit, when layout changes */
    @Output()
    layoutChange: EventEmitter<Layout> = new EventEmitter<Layout>();

    /** Event to emit on Card dragged and dropped */
    @Output()
    cardDraggedDropped: EventEmitter<CardDropped> = new EventEmitter<CardDropped>();

    /** Array of CardDefinitionDirective Array.To make Table kind of layout.*/
    public columns: CardColumn[];
    /** @hidden Number of Columns in layout */
    private numberOfColumns = 3;
    /** @hidden */
    private previousNumberOfColumns: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this.ngZone.runOutsideAngular(() => {
            this.numberOfColumns = this._getNumberOfColumns();
        });
        if (this.previousNumberOfColumns !== this.numberOfColumns) {
            this.ngZone.run(() => {
                this.previousNumberOfColumns = this.numberOfColumns;
                this._renderLayout();
            });
        }
    }

    constructor(private readonly _cd: ChangeDetectorRef, private readonly ngZone: NgZone) {}

    /** @hidden */
    ngAfterContentInit(): void {
        // subscribe to number of card change
        this.cards.changes.subscribe(() => this._renderLayout());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.numberOfColumns = this._getNumberOfColumns();

        // initialise previousNumberOfColumns with starting numberOfColumns
        this.previousNumberOfColumns = this.numberOfColumns;
        this._renderLayout();
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

    /** Return available width for fd-card-layout */
    public getWidthAvailable(): number {
        return this.layout.nativeElement.getBoundingClientRect().width;
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

        // minumum number of column to 1
        columnCount = columnCount ? columnCount : 1;
        this.layoutChange.emit(new Layout(columnCount, availableLayoutWidth));
        return columnCount;
    }

    /**
     * @hidden Renders layout on column changes.
     */
    private _renderLayout(): void {
        this._initializeColumns(this.numberOfColumns);
        this._distributeCards(this.cards, this.columns);
        this._cd.detectChanges();
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
        const length = columns.length;
        cards?.forEach((card, i) => {
            const index = i % length;
            columns[index].push(card);
        });
    }
}
