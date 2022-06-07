import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { CarouselItemInterface } from '../carousel.service';
import { Nullable } from '@fundamental-ngx/core/shared';

export type Visibility = 'visible' | 'hidden';

let carouselItemCounter = 0;

@Component({
    selector: 'fd-carousel-item',
    templateUrl: './carousel-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CarouselItemComponent implements CarouselItemInterface {
    /** Id of the Carousel items. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-item-${carouselItemCounter++}`;

    /** Sets aria-label attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** Sets aria-labelledby attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledBy: Nullable<string>;

    /** Sets aria-describedby attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-describedby')
    ariaDescribedBy: Nullable<string>;

    /**
     * Loading indicator when item is not yet loaded
     */
    @Input()
    loading = false;

    /** Sets tooltip for carousel item */
    @Input()
    @HostBinding('attr.title')
    title = null;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialHeight: number;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialWidth: number;

    /** Value of carousel item */
    @Input()
    value: any;

    /** @hidden */
    @HostBinding('class.fd-carousel__item')
    carouselItem = true;

    /** @hidden */
    @HostBinding('class.fd-carousel__item--active')
    carouselItemActive = true;

    /** @hidden Hide/show slide, useful for managing tab order */
    @HostBinding('style.visibility')
    _visibility: Visibility = 'visible';

    /** @hidden */
    set visibility(visibility: Visibility) {
        this._visibility = visibility;
        this._changeDetectorRef.detectChanges();
    }

    get visibility(): Visibility {
        return this._visibility;
    }

    /** @hidden */
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _elementRef: ElementRef<HTMLElement>
    ) {}

    /** Native element  */
    get element(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** Width of element */
    getWidth(): number {
        return this.element.getBoundingClientRect().width || this.initialWidth;
    }

    /** Height of element */
    getHeight(): number {
        return this.element.getBoundingClientRect().height || this.initialHeight;
    }
}
