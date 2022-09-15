import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { buffer, debounceTime, filter, map, tap } from 'rxjs/operators';
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil, resizeObservable } from '@fundamental-ngx/core/utils';
import { CarouselConfig, CarouselDirective, CarouselItemDirective, PanEndOutput } from '@fundamental-ngx/core/carousel';

import { TimeColumnConfig } from './time-column-config';
import { SelectableViewItem } from '../models';
import { Nullable } from '@fundamental-ngx/core/shared';

let timeColumnUniqueId = 0;

export interface TimeColumnItemOutput<T> {
    value: T;
    after?: boolean;
}

@Component({
    selector: 'fd-time-column',
    templateUrl: './time-column.component.html',
    styleUrls: ['./time-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-time__col'
    }
})
export class TimeColumnComponent<K, T extends SelectableViewItem<K> = SelectableViewItem<K>>
    implements AfterViewInit, OnInit, OnDestroy, OnChanges
{
    /** items in row */
    @Input()
    rows: T[] = [];

    /**
     * @Input When set to false, hides the buttons that increment
     * and decrement the corresponding columns.
     */
    @Input()
    spinners = true;

    /** Currently chosen, centered time column item */
    @Input()
    set activeValue(activeItem: T | undefined) {
        if (!activeItem) {
            // omitting "null" and "undefined"
            return;
        }
        if (this._viewInit$.value && this._activeValue !== activeItem) {
            this._pickTime(this._getItem(activeItem), false);
        }
        this._activeValue = activeItem;
    }

    get activeValue(): T {
        return this._activeValue;
    }

    /** Defines if column is active, it has impact on behavior and visual  */
    @Input()
    set active(value: boolean) {
        this._active = value;
        if (value && this._viewInit$.value) {
            this._changeDetRef.detectChanges();
            this._pickTime(this._getItem(this.activeValue), false);
            this._focusIndicator();
        }
    }

    get active(): boolean {
        return this._active;
    }

    /** Whether time column is meridian */
    @Input()
    @HostBinding('class.fd-time__col--period')
    meridian = false;

    /** Id of column, initiated with some default value */
    @Input()
    id: string = 'fd-time-column-' + timeColumnUniqueId++;

    /** I18n and labels */
    @Input()
    timeConfig: Nullable<TimeColumnConfig>;

    /** I18n and labels */
    @Input()
    columnTranslationsPreset: 'seconds' | 'minutes' | 'hours' | 'period';

    /**
     * Offset for carousel directive, active item is always the first one.
     * In case of having more items in carousel than 1, middle element should be active
     */
    @Input()
    get offset(): number {
        return this._offset$.value;
    }

    set offset(value: number) {
        this._offset$.next(value);
    }

    /**
     * Quantity of the elements to be shown at the same time in column
     */
    @Input()
    set elementsAtOnce(value: number) {
        this._elementsAtOnce$.next(value);
    }

    /** Event emitted, when active item is changed, by carousel */
    @Output()
    activeValueChange: EventEmitter<TimeColumnItemOutput<T>> = new EventEmitter<TimeColumnItemOutput<T>>();

    /** Event emitted, when certain column is activated */
    @Output()
    activeStateChange: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(CarouselDirective)
    carousel: CarouselDirective;

    /** @hidden */
    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    /** @hidden */
    @ViewChild('indicator', { read: ElementRef })
    indicator: ElementRef;

    wrapperHeight: number;

    /**
     * Time to wait in milliseconds after the last keydown before
     * focusing or selecting option based on numeric/alpha keys.
     * @hidden
     */
    typeaheadDebounceInterval = 750;

    /** @hidden */
    config: CarouselConfig;

    internalTranslationConfig: TimeColumnConfig | null = null;

    /** @hidden */
    get currentIndicatorId(): string {
        return this.id + '-current-indicator';
    }

    /** @hidden */
    get currentIndicatorValueId(): string {
        return this.currentIndicatorId + '-value';
    }

    /** @hidden */
    private _elementsAtOnce$ = new BehaviorSubject(7);

    /** @hidden */
    private _offset$ = new BehaviorSubject(3);

    /** @hidden */
    private _active = false;

    /** @hidden */
    private _queryKeyDownEvent: Subject<string> = new Subject<string>();

    /** @hidden */
    private _activeValue: T;

    /** @hidden */
    private _activeCarouselItem: CarouselItemDirective;

    /** @hidden */
    private _isDragging = false;

    /** @hidden */
    private _viewInit$ = new BehaviorSubject<boolean>(false);

    private _resize$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden
     * logs numeric key inputs to set time using keyboard input.
     */
    private _keyLog: string[] = [];

    /** @hidden
     * Timeout variable used to set timeout for subsequent numeric key input to set time.
     */
    private _numericInputTimeout: ReturnType<typeof setTimeout>;

    /** @hidden */
    constructor(private _changeDetRef: ChangeDetectorRef, private _elmRef: ElementRef) {
        this._subscriptions.add(
            combineLatest([this._viewInit$, this._elementsAtOnce$, this._offset$, this._resize$])
                .pipe(
                    filter(([viewInit]) => viewInit),
                    tap(([, elementsAtOnce, offset]) => {
                        const averageHeight =
                            this.items.toArray().reduce((acc, next) => acc + next.getHeight(), 0) / this.items.length;
                        this.wrapperHeight = averageHeight * elementsAtOnce;
                        const visibleButNotSelectedElements = Math.floor(elementsAtOnce / 2);
                        if (offset === 0) {
                            this.items.first.element.style.marginTop = `${
                                visibleButNotSelectedElements * averageHeight
                            }px`;
                            this.items.last.element.style.marginBottom = `${
                                visibleButNotSelectedElements * averageHeight
                            }px`;
                        }

                        if (this.activeValue) {
                            this._pickTime(this._getItem(this.activeValue), false);
                        }

                        this._changeDetRef.detectChanges();
                    })
                )
                .subscribe()
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._subscriptions.add(this._elementsAtOnce$.pipe(tap(() => this._setUpCarouselConfiguration())).subscribe());
        this._setUpQuerySubscription();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscriptions.add(
            resizeObservable(this._elmRef.nativeElement).subscribe(() => {
                this._resize$.next(true);
            })
        );
        this._viewInit$.next(true);
    }

    /** @hidde */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.columnTranslationsPreset) {
            this._updateInternalTranslationConfig();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('click')
    onItemClick(): void {
        this.activeStateChange.emit();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this.scrollDown();
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            this.scrollUp();
            event.preventDefault();
        } else if (KeyUtil.isKeyType(event, 'numeric')) {
            this._numericKeyInputHandler(event);
        } else if (KeyUtil.isKeyType(event, 'alphabetical')) {
            this._alphaKeyInputHandler(event);
        }
    }

    /** @hidden */
    @HostListener('wheel', ['$event'])
    mouseScrollHandler(event: WheelEvent): void {
        event.preventDefault();
        if (this._active) {
            event.deltaY > 0 ? this.scrollDown() : this.scrollUp();
        }
    }

    /** @hidden */
    spinnerButtonKeyupHandle(event: KeyboardEvent, upButton?: boolean): void {
        if (KeyUtil.isKeyCode(event, SPACE)) {
            if (upButton) {
                this.scrollUp();
            } else {
                this.scrollDown();
            }

            event.stopPropagation();
            event.preventDefault();
        }
    }

    /** @hidden */
    setValueOfActive(): void {
        if (this._active) {
            this._setUpInitialValue();
        }
    }

    /** It prevents from accidentally change the item by click event */
    handleDrag(isDragging: boolean): void {
        this._isDragging = isDragging;
    }

    /** Method that handles active item change */
    activeChangedHandle(output: PanEndOutput): void {
        const array = this.items.toArray();
        let index: number = array.findIndex((__item) => __item === output.item) + this.offset;

        if (index >= array.length) {
            index = index - array.length;
        }

        const _item = array[index];

        this._activeValue = _item.value;

        this.activeValueChange.emit({
            value: this._activeValue,
            after: output.after
        });

        this._activeCarouselItem = _item;
    }

    /** Method that changes active item and triggers carousel scroll */
    pick(item: CarouselItemDirective, index: number): void {
        const currentIndex: number = this.items.toArray().findIndex((_item) => _item === this._activeCarouselItem);
        /** To prevent from switching time, when it's being dragged */
        if (!this._isDragging) {
            this._pickTime(item, true, true, currentIndex < index);
        }
    }

    /** Method triggered by keyboard, or increment button */
    scrollUp(event?: MouseEvent): void {
        /** Keyboard events in reactive forms, shouldn't trigger this method */
        if (event && !event.clientX) {
            return;
        }
        let index: number = this.items.toArray().findIndex((_item) => _item === this._activeCarouselItem);
        if (index > 0) {
            index--;
        } else {
            index = this.rows.length - 1;
        }

        this._pickTime(this.items.toArray()[index], true, true, false);
    }

    /** Method triggered by keyboard, or decrement button */
    scrollDown(): void {
        let index: number = this.items.toArray().findIndex((_item) => _item === this._activeCarouselItem);
        if (index < this.rows.length - 1) {
            index++;
        } else {
            index = 0;
        }

        this._pickTime(this.items.toArray()[index], true, true, true);
    }

    /** Focus on column */
    focus(): void {
        this.indicator?.nativeElement.focus();
    }

    /**
     * Create id for column item
     * @param index column item index
     * @returns column item id
     * @hidden
     */
    _createColumnItemIdByIndex(index: number): string {
        return this.id + index;
    }

    /**
     * On focus callback
     * @hidden
     */
    _onFocusIndicator(): void {
        this.activeStateChange.emit();
    }

    /** @hidden
     * handles alphabetical key inputs to set period.
     */
    private _alphaKeyInputHandler(event: KeyboardEvent): void {
        if (event.key === 'a' || event.key === 'A') {
            this._pickTimeOnValue('AM');
        } else if (event.key === 'p' || event.key === 'P') {
            this._pickTimeOnValue('PM');
        }
    }

    /** @hidden
     * handles numeric key inputs to set time.
     */
    private _numericKeyInputHandler(event: KeyboardEvent): void {
        const lastItemValue = this.items.last.value.value; // value of last item in column

        this._numericInputTimeout && clearTimeout(this._numericInputTimeout);
        this._keyLog.push(event.key);
        const inputValue = parseInt(this._keyLog.join(''), 10); // converts keyLog elements to a number

        if (inputValue * 10 > lastItemValue || this._keyLog.length === lastItemValue.toString().length) {
            this._pickTimeOnValue(inputValue);
        } else {
            this._numericInputTimeout = setTimeout(() => {
                this._pickTimeOnValue(inputValue);
            }, 500);
        }
    }

    /** @hidden
     * set the time for given item value. used by _numericKeyInputHandler.
     */
    private _pickTimeOnValue(value: string | number): void {
        this._pickTime(
            this.items.find((item) => item.value.value === value),
            false,
            true,
            false
        );
        this._keyLog = []; // clear key log
    }

    /**
     * Method triggered by keyboard, or decrement button
     * Args:
     * item => picked carousel item, that should be centered
     * smooth => defines if transition time should be included in transform
     * emitEvent => defines if EventEmitter should be triggered by this change, set to false, when changed from outside
     * after => Defines if value was incremented/decremented, needed for hours to trigger AM/PM change
     * @hidden
     */
    private _pickTime(item?: CarouselItemDirective, smooth?: boolean, emitEvent?: boolean, after?: boolean): void {
        if (!item) {
            return;
        }

        if (this.active) {
            this._triggerCarousel(item, smooth);
        }

        this._activeCarouselItem = item;
        this._activeValue = item.value;

        if (emitEvent) {
            this.activeValueChange.emit({
                value: item.value,
                after
            });
        }
    }

    /**
     * Returns item with passed value
     * @hidden
     */
    private _getItem(_item: T): CarouselItemDirective | undefined {
        return this.items.find((item) => item.value === _item);
    }

    /** @hidden */
    private _triggerCarousel(item: CarouselItemDirective, smooth?: boolean): void {
        const array = this.items.toArray();
        let index: number = array.findIndex((_item) => _item === item) - this.offset;

        if (index < 0) {
            index = array.length + index;
        }

        this.carousel.goToItem(array[index], smooth);
    }

    /**
     * Focus current indicator, which allows to handle keydown events inside column
     * @hidden
     */
    private _focusIndicator(): void {
        document.getElementById(this.currentIndicatorId)?.focus();
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
            this._queryKeyDownEvent
                .pipe(
                    buffer(trigger),
                    map((keys) => keys.join('')),
                    map((value) => this._getValue(value)),
                    map((value) => this._getItem(value))
                )
                .subscribe((item) => this._pickTime(item, false, true))
        );
    }

    /** @hidden */
    private _setUpCarouselConfiguration(): void {
        const config: CarouselConfig = {
            gestureSupport: true,
            vertical: true,
            elementsAtOnce: this._elementsAtOnce$.value,
            transition: '150ms'
        };
        if (!this.meridian) {
            config.infinite = true;
        }
        this.config = config;
    }

    /** @hidden */
    private _setUpInitialValue(): void {
        if (!this._activeValue) {
            this._activeValue = this.items.first.value;
        }
        this._pickTime(this._getItem(this._activeValue), false);
    }

    /** @hidden */
    private _updateInternalTranslationConfig(): void {
        switch (this.columnTranslationsPreset) {
            case 'hours':
                this.internalTranslationConfig = {
                    increaseLabel: 'coreTime.increaseHoursLabel',
                    label: 'coreTime.hoursLabel',
                    decreaseLabel: 'coreTime.decreaseHoursLabel',
                    navigationInstruction: 'coreTime.navigationInstruction'
                };
                break;
            case 'minutes':
                this.internalTranslationConfig = {
                    increaseLabel: 'coreTime.increaseMinutesLabel',
                    label: 'coreTime.minutesLabel',
                    decreaseLabel: 'coreTime.decreaseMinutesLabel',
                    navigationInstruction: 'coreTime.navigationInstruction'
                };
                break;
            case 'seconds':
                this.internalTranslationConfig = {
                    increaseLabel: 'coreTime.increaseSecondsLabel',
                    label: 'coreTime.secondsLabel',
                    decreaseLabel: 'coreTime.decreaseSecondsLabel',
                    navigationInstruction: 'coreTime.navigationInstruction'
                };
                break;
            case 'period':
                this.internalTranslationConfig = {
                    increaseLabel: 'coreTime.increasePeriodLabel',
                    label: 'coreTime.periodLabel',
                    decreaseLabel: 'coreTime.decreasePeriodLabel',
                    navigationInstruction: 'coreTime.navigationInstruction'
                };
                break;

            default:
                this.internalTranslationConfig = null;
                break;
        }
        this._changeDetRef.markForCheck();
    }
}
