import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
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


let timeColumnUniqueId: number = 0;

@Component({
    selector: 'fd-time-column',
    templateUrl: './time-column.component.html',
    styleUrls: ['./time-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TimeColumnComponent implements AfterViewInit, OnInit {
    /** items in row  */
    @Input()
    rows: any[];

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
            document.getElementById(this.currentIndicatorId).focus();
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

    /**
     * Offset for carousel directive, active item is always the first one.
     * In case of having more items in carousel than 1, middle element should be active
     */
    @Input()
    offset: number = 3;

    /** Event emitted, when active item is changed, by carousel */
    @Output()
    activeItemChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    focusPreviousColumn: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    focusNextColumn: EventEmitter<void> = new EventEmitter<void>();

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
    fdTimeColClass: boolean = true;


    config: CarouselConfig;
    currentIndicatorId: string = this.id + '-current-indicator';

    private _activeItem: any;
    private _activeCarouselItem: CarouselItemDirective;
    private _isDragging: boolean = false;
    private _initialised: boolean = false;

    constructor(
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (!this.meridian) {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms', infinite: true };
        } else {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms' };
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        console.log(this._activeItem);
        if (!this._activeItem) {
            this._activeItem = this.items.first.value;
        }
        this._pickTime(this._getItem(this._activeItem), true);
        this._initialised = true;
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
        } else if (KeyUtil.isKeyType(event, 'numeric')) {
            // TODO
            const value = Number(event.key);
            this._pickTime(this._getItem(value), false, true)
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
    scrollUp(): void {
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
            console.log('empty');
            // TODO: Throw Error
            return
        }
        this._triggerCarousel(item, smooth);
        this._activeCarouselItem = item;
        this._activeItem = item.value;
        if (emitEvent) {
            this.activeItemChange.emit(this._activeItem);
        }
    }

    /** Returns item with passed value */
    private _getItem(value: number): CarouselItemDirective {
        return this.items.find(item => item.value === value);
    }

    /**  */
    private _triggerCarousel(item: CarouselItemDirective, smooth?: boolean): void {
        const array = this.items.toArray();
        let index: number = array.findIndex(_item => _item === item) - this.offset;

        if (index < 0) {
            index = array.length + index;
        }

        this.carousel.goToItem(array[index], smooth);
    }
}
