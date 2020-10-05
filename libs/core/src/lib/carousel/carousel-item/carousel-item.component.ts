import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { CarouselItemInterface } from '../../utils/services/carousel.service';

let carouselItemUniqueId = 0;

@Component({
    selector: 'fd-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CarouselItemComponent implements CarouselItemInterface {
    /** Id of the Carousel items. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-item-${carouselItemUniqueId++}`;

    /** Sets aria-label attribute for carousel item */
    @Input()
    ariaLabel: string;

    /** Sets aria-labelledby attribute for carousel item */
    @Input()
    ariaLabelledBy: string;

    /** Sets aria-describedby attribute for carousel item */
    @Input()
    ariaDescribedBy: string;

    @HostBinding('class.fd-carousel__item')
    carouselItem = 'fd-carousel__item';

    @HostBinding('class.fd-carousel__item--active')
    carouselItemActive = true;

    /** Sets tooltip for carousel item */
    @Input()
    @HostBinding('attr.title')
    title = 'carousel item';

    /** Value of carousel item */
    @Input()
    value: any;

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef, private readonly _elementRef: ElementRef) {}

    /** Width of element */
    getWidth(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().width;
    }

    /** Height of element */
    getHeight(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().height;
    }

    /** Native element  */
    getElement(): any {
        return this._elementRef.nativeElement;
    }
}
