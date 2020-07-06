import { Directive, ElementRef, Input } from '@angular/core';

let uniqueCarouselItemId: number = 0;

@Directive({
    selector: '[fdCarouselItem]'
})
export class CarouselItemDirective {

    /** Value of the item , to keep some information inside */
    @Input()
    value: any;

    /** Carousel Id, it's not mandatory to set it,  */
    @Input()
    carouselItemId: string = 'carousel-item-id-' + uniqueCarouselItemId++;

    constructor(
        private _elementRef: ElementRef
    ) {}

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
