import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { CarouselConfig, CarouselDirective, PanEndOutput } from '../../utils/directives/carousel/carousel.directive';
import { CarouselItemDirective } from '../../utils/directives/carousel/carousel-item.directive';
import { KeyUtil } from '../../utils/functions/key-util';
import { TimeColumnConfig } from './time-column-config';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime, map } from 'rxjs/operators';


let timeColumnUniqueId = 0;


export interface TimeColumnItemOutput {
    value: any;
    after?: boolean;
}


@Component({
    selector: 'fd-time-column',
    templateUrl: './time-column.component.html',
    styleUrls: ['./time-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimeColumnComponent implements AfterViewInit, OnInit, OnDestroy {

    /** items in row */
    @Input()
    rows: any[];

    /** items in row */
    @Input()
    compact = false;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigits = false;

    /**
     * @Input When set to false, hides the buttons that increment and decrement the corresponding columns.
     */
    @Input()
    spinners = true;

    /** Currently chosen, centered time column item */
    @Input()
    set activeValue(value: any) {
        if (this._initialised && this._activeValue !== value) {
            this._pickTime(this._getItem(value), true);
        }
        this._activeValue = value;
    }

    get activeValue(): any {
        return this._activeValue;
    }

    /** Defines if column is active, it has impact on behaviour and visual  */
    @Input()
    set active(value: boolean) {
        this._active = value;
        if (value && this._initialised) {
            this._changeDetRef.detectChanges();
            this._pickTime(this._getItem(this.activeValue), false);
            this._focusIndicator();
        }
    }

    get active(): boolean {
        return this._active;
    }

    private _active = false;

    /** Whether time column is meridian */
    @Input()
    @HostBinding('class.fd-time__col--period')
    meridian = false;

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
    offset = 3;

    /** Event emitted, when active item is changed, by carousel */
    @Output()
    activeValueChange: EventEmitter<TimeColumnItemOutput> = new EventEmitter<TimeColumnItemOutput>();

    /** Event emitted, when certain column is activated */
    @Output()
    activeStateChange: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(CarouselDirective)
    carousel: CarouselDirective;

    /** @hidden */
    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    /* Whether the action bar also has a back button. */
    @HostBinding('class.fd-time__col')
    fdTimeColClass = true;

    /**
     * Time to wait in milliseconds after the last keydown before focusing or selecting option based on numeric/alpha
     * keys.
     */
    typeaheadDebounceInterval = 750;

    config: CarouselConfig;
    currentIndicatorId: string = this.id + '-current-indicator';

    /** @hidden */
    private _queryKeyDownEvent: Subject<string> = new Subject<string>();

    /** @hidden */
    private _activeValue: any;

    /** @hidden */
    private _activeCarouselItem: CarouselItemDirective;

    /** @hidden */
    private _isDragging = false;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    constructor(
        private _changeDetRef: ChangeDetectorRef
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._setUpCarouselConfiguration();
        this._setUpQuerySubscription();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initialised = true;
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
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.scrollDown();
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.scrollUp();
            event.preventDefault();
        } else if (KeyUtil.isKeyType(event, 'numeric') || KeyUtil.isKeyType(event, 'alphabetical')) {
            this._queryKeyDownEvent.next(event.key);
        }
    }

    /** @hidden */
    spinnerButtonKeydownHandle(event: KeyboardEvent, upButton?: boolean): void {
        if (KeyUtil.isKey(event, ' ')) {
            if (upButton) {
                this.scrollUp();
            } else {
                this.scrollDown()
            }

            event.stopPropagation();
            event.preventDefault();
        }
    }

    /** @hidden */
    public setValueOfActive(): void {
        if (this._active) {
            this._setUpInitialValue();
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
    activeChangedHandle(output: PanEndOutput): void {
        const array = this.items.toArray();
        let index: number = array.findIndex(__item => __item === output.item) + this.offset;

        if (index > array.length) {
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
        const currentIndex: number = this.items.toArray().findIndex(_item => _item === this._activeCarouselItem);
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
        let index: number = this.items
            .toArray()
            .findIndex(_item => _item === this._activeCarouselItem)
        ;

        if (index > 0) {
            index--;
        } else {
            index = this.rows.length - 1;
        }

        this._pickTime(this.items.toArray()[index], true, true, false);
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

        this._pickTime(this.items.toArray()[index], true, true, true);
    }

    /**
     * Method triggered by keyboard, or decrement button
     * Args:
     * item => picked carousel item, that should be centered
     * smooth => defines if transition time should be included in transform
     * emitEvent => defines if EventEmitter should be triggered by this change, set to false, when changed from outside
     * after => Defines if value was incremented/decremented, needed for hours to trigger AM/PM change
     */
    private _pickTime(item: CarouselItemDirective, smooth?: boolean, emitEvent?: boolean, after?: boolean): void {
        if (!item) {
            return;
        }
        this._triggerCarousel(item, smooth);
        this._activeCarouselItem = item;
        this._activeValue = item.value;
        if (emitEvent) {
            this.activeValueChange.emit({
                value: item.value,
                after: after
            });
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
            this.config = { gestureSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms', infinite: true };
        } else {
            this.config = { gestureSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms' };
        }
    }

    /** @hidden */
    private _setUpInitialValue(): void {
        if (!this._activeValue) {
            this._activeValue = this.items.first.value;
        }
        this._pickTime(this._getItem(this._activeValue), true);
    }

}
