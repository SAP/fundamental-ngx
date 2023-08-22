import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

let carouselItemCounter = 0;

@Directive({
    selector: '[fd-carousel-item], [fdCarouselItem]',
    exportAs: 'fdCarouselItem',
    standalone: true
})
export class CarouselItemDirective {
    /** Value of the item , to keep some information inside */
    @Input()
    value: any;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialHeight: number;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialWidth: number;

    /** Carousel Id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id: string = 'carousel-item-id-' + carouselItemCounter++;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

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
