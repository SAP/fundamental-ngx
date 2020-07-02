import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding, HostListener,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
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

    /*
     Whether the action bar also has a back button.
     */
    @HostBinding('class.fd-time__col')
    fdTimeColClass: boolean = true;

    @Input()
    rows: any[];

    @Input()
    set activeItem(value: any) {
        if (this._initialised && this._activeItem && this._activeItem !== value) {
            this._pickTime(this._getItem(value), true)
        }
    }

    get activeItem(): any {
        return this._activeItem;
    }

    @Input()
    set active(value: boolean) {
        this._active = value;
        if (value && this._initialised) {
            this._changeDetRef.detectChanges();
            this._pickTime(this._getItem(this.activeItem), false);
        }
    }

    get active(): boolean {
        return this._active;
    }

    private _active: boolean = false;

    @Input()
    @HostBinding('class.fd-time__col--period')
    meridian: boolean = false;

    @Input()
    id: string = 'fd-time-column-' + timeColumnUniqueId++;

    @Output()
    activeItemChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    activeStateChange: EventEmitter<number> = new EventEmitter<number>();

    private _activeItem: any;
    private _activeCarouselItem: CarouselItemDirective;

    private _isDragging: boolean = false;

    @ViewChild(CarouselDirective)
    carousel: CarouselDirective;

    @ViewChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    config: CarouselConfig;

    currentIndicatorId: string = this.id + '-current-indicator';

    private _scrolled: Subject<any> = new Subject<any>();

    private _initialised: boolean = false;

    constructor(
        private _changeDetRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (!this.meridian) {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms', infinite: true };
            // this.rows = [...this.rows, ...this.rows, ...this.rows];
        } else {
            this.config = { panSupport: true, vertical: true, elementsAtOnce: 7, transition: '150ms' };
        }
    }

    ngAfterViewInit(): void {
        if (!this._activeItem) {
            this._activeItem = this.items.first.value;
        }
        this._pickTime(this._getItem(this._activeItem), true);
        this._initialised = true;
    }

    @HostListener('click')
    onItemClick() {
        this.activeStateChange.emit();
    }

    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.scrollDown();
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.scrollUp();
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowLeft')) {
            // TODO
        } else if (KeyUtil.isKey(event, 'ArrowRight')) {
            // TODO
        } else if (KeyUtil.isKeyType(event, 'numeric')) {
            const value = Number(event.key);
            this._pickTime(this._getItem(value), false)
        }
    }

    getId(num: number): string {
        return this.id + '-' + num;
    }

    handleDrag(isDragging: boolean): void {
        if (!isDragging) {
            setTimeout(() => this._isDragging = false, 30);
        } else {
            this._isDragging = isDragging;
        }
    }

    activeChangedHandle(item: CarouselItemDirective): void {
        this._activeItem = item.value;
        this.activeItemChange.emit(this._activeItem);
        this._activeCarouselItem = item;
    }

    handleScroll(event): void {
        this._scrolled.next(event);
    }

    // TODO
    pick(value: any, id: string): void {
        // TODO
        if (!this._isDragging) {
            this._pickTime(this._getItem(value, id), true);
        }
    }

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

        this._pickTime(this.items.toArray()[index], true);
    }

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

        this._pickTime(this.items.toArray()[index], true);
    }

    private _pickTime(item: CarouselItemDirective, smooth?: boolean): void {
        if (!item) {
            // TODO: Throw Error
            return
        }
        this.carousel.goToItem(item, smooth);
        this._activeCarouselItem = item;
        this._activeItem = item.value;
        this.activeItemChange.emit(this._activeItem);
    }

    private _getItem(value: number, id?: string): CarouselItemDirective {
        if (id) {
            return this.items.find(item => item.value === value && item.carouselItemId === id);
        } else {
            return this.items.find(item => item.value === value);
        }
    }
}
