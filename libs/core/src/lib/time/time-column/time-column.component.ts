import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input, OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { CarouselConfig, CarouselDirective } from '../../utils/directives/carousel/carousel.directive';
import { CarouselItemDirective } from '../../utils/directives/carousel/carousel-item.directive';
import { KeyUtil } from '../../utils/functions/key-util';
import { TimeColumnConfig } from './time-column-config';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime, map } from 'rxjs/operators';


let timeColumnUniqueId: number = 0;

@Component({
    selector: ' fd-time-column',
    templateUrl: './time-column.component.html',
    styleUrls: ['./time-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimeColumnComponent implements AfterViewInit, OnInit, OnDestroy {

    /** Popover workaround, before initialisation the carousel items can't return size */
    readonly InitialTimeHeight: number = 46;
    readonly InitialCompactTimeHeight: number = 28;

    /** items in row */
    @Input()
    rows: any[];

    /** items in row */
    @Input()
    compact: boolean = false;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigits: boolean = false;

    /** Active value  */
    @Input()
    set activeItem(value: any) {
        if (this._initialised && this._activeItem !== value) {
            this._pickTime(this._getItem(value), true);
        }
        this._activeItem = value;
    }

    get activeItem(): any {
        return this._activeItem;
    }

    /** Defines if column is active, it has impact on behaviour and visual  */
    @Input()
    set active(value: boolean) {
        this._active = value;
        if (value && this._initialised) {
            this._changeDetRef.detectChanges();
            this._pickTime(this._getItem(this.activeItem), false);
            this._focusIndicator();
        }
    }

    get active(): boolean {
        return this._active;
    }

    private _active: boolean = false;

    /** Whether time column is meridian */
    @Input()
    @HostBinding('class.fd-time__col--period')
    meridian: boolean = false;

    /** Id of column, initiated with some default value */
    @Input()
    id: string = 'fd-time-column-' + timeColumnUniqueId++;

    /** I18n and labels */
    @Input()
    timeConfig: TimeColumnConfig;

    /**
     * Offset for carousel directive, active item is always the first one.
     * In case of having more items in carousel than 1, middle element should be active
     */
    @Input()
    offset: number = 3;

    /** Event emitted, when active item is changed, by carousel */
    @Output()
    activeItemChange: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted, when previous column should be focused */
    @Output()
    focusPreviousColumn: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted, when next column should be focused */
    @Output()
    focusNextColumn: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted, when certain column is activated */
    @Output()
    activeStateChange: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted, when focus is lost from last button of column. It helps with focus trap */
    @Output()
    lastButtonTabKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @ViewChild(CarouselDirective)
    carousel: CarouselDirective;

    /** @hidden */
    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    /* Whether the action bar also has a back button. */
    @HostBinding('class.fd-time__col')
    fdTimeColClass: boolean = true;

    /**
     * Time to wait in milliseconds after the last keydown before focusing or selecting option based on numeric
     * keys.
     */
    typeaheadDebounceInterval: number = 250;

    config: CarouselConfig;
    currentIndicatorId: string = this.id + '-current-indicator';

    /** @hidden */
    private _queryKeyDownEvent: Subject<string> = new Subject<string>();

    /** @hidden */
    private _activeItem: any;

    /** @hidden */
    private _activeCarouselItem: CarouselItemDirective;

    /** @hidden */
    private _isDragging: boolean = false;

    /** @hidden */
    private _initialised: boolean = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    constructor(
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._setUpCarouselConfiguration();
        this._setUpQuerySubscription();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setUpInitialValue();
        this._initialised = true;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('click')
    onItemClick() {
        this.activeStateChange.emit();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.scrollDown();
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.scrollUp();
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowLeft')) {
            this.focusPreviousColumn.emit();
        } else if (KeyUtil.isKey(event, 'ArrowRight')) {
            this.focusNextColumn.emit();
        } else if (KeyUtil.isKeyType(event, 'numeric') || KeyUtil.isKeyType(event, 'alphabetical')) {
            this._queryKeyDownEvent.next(event.key)
        }
    }

    /** @hidden */
    handleLastButtonKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'Tab') && !event.shiftKey) {
            this.lastButtonTabKeyDown.emit(event);
        }
    }


    /** It prevents from accidentally change the item by click event */
    handleDrag(isDragging: boolean): void {
        if (!isDragging) {
            setTimeout(() => this._isDragging = false, 30);
        } else {
            this._isDragging = isDragging;
        }
    }

    /** Method that handles active item change */
    activeChangedHandle(item: CarouselItemDirective): void {
        const array = this.items.toArray();
        let index: number = array.findIndex(__item => __item === item) + this.offset;

        if (index > array.length) {
            index = index - array.length;
        }

        const _item = array[index];

        this._activeItem = _item.value;
        this.activeItemChange.emit(this._activeItem);
        this._activeCarouselItem = _item;
    }

    /** Method that changes active item and triggers carousel scroll */
    pick(value: any): void {
        /** To prevent from switching time, when it's being dragged */
        if (!this._isDragging) {
            this._pickTime(this._getItem(value), true, true);
        }
    }

    /** Method triggered by keyboard, or increment button */
    scrollUp(event?: MouseEvent): void {
        /** Keyboard events in reactive forms, shouldn't trigger this method */
        if (event && !event.clientX) {
            return;
        }
        let index: number = this.items
            .toArray()
            .findIndex(_item => _item === this._activeCarouselItem)
        ;

        if (index > 0) {
            index--;
        } else {
            index = this.rows.length - 1;
        }

        this._pickTime(this.items.toArray()[index], true, true);
    }

    /** Method triggered by keyboard, or decrement button */
    scrollDown(): void {
        let index: number = this.items
            .toArray()
            .findIndex(_item => _item === this._activeCarouselItem)
        ;

        if (index < this.rows.length - 1) {
            index++;
        } else {
            index = 0;
        }

        this._pickTime(this.items.toArray()[index], true, true);
    }

    /** Method triggered by keyboard, or decrement button */
    private _pickTime(item: CarouselItemDirective, smooth?: boolean, emitEvent?: boolean): void {
        if (!item) {
            // TODO: Throw Error
            return;
        }
        this._triggerCarousel(item, smooth);
        this._activeCarouselItem = item;
        this._activeItem = item.value;
        if (emitEvent) {
            this.activeItemChange.emit(this._activeItem);
        }
    }

    /** Returns item with passed value */
    private _getItem(value: any): CarouselItemDirective {
        return this.items.find(item => item.value === value);
    }

    /** @hidden */
    private _triggerCarousel(item: CarouselItemDirective, smooth?: boolean): void {
        const array = this.items.toArray();
        let index: number = array.findIndex(_item => _item === item) - this.offset;

        if (index < 0) {
            index = array.length + index;
        }

        this.carousel.goToItem(array[index], smooth);
    }

    /** Focus current indicator, which allows to handle keydown events inside column */
    private _focusIndicator(): void {
        if (document.getElementById(this.currentIndicatorId)) {
            document.getElementById(this.currentIndicatorId).focus();
        }
    }

    /** @hidden */
    private _getValue(value: string): any {
        if (!isNaN(Number(value))) {
            return Number(value);
        } else {
            return value;
        }
    }

    /** @hidden */
    private _setUpQuerySubscription(): void {
        const trigger = this._queryKeyDownEvent.pipe(debounceTime(this.typeaheadDebounceInterval));

        this._subscriptions.add(
            this._queryKeyDownEvent.pipe(
                buffer(trigger),
                map(keys => keys.join('')),
                map(value => this._getValue(value)),
                map(value => this._getItem(value))
            ).subscribe(item => this._pickTime(item, false, true))
        );
    }

    /** @hidden */
    private _setUpCarouselConfiguration(): void {
        if (!this.meridian) {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms', infinite: true };
        } else {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms' };
        }
    }

    /** @hidden */
    private _setUpInitialValue(): void {
        if (!this._activeItem) {
            this._activeItem = this.items.first.value;
        }
        this._pickTime(this._getItem(this._activeItem), true);
    }

}
