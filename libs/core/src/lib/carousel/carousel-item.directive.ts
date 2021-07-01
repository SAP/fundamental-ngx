import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

let uniqueCarouselItemId = 0;

@Directive({
    selector: '[fd-carousel-item], [fdCarouselItem]',
    exportAs: 'fdCarouselItem'
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
    id: string = 'carousel-item-id-' + uniqueCarouselItemId++;

    constructor(
        private _elementRef: ElementRef
    ) {}

    /** Width of element */
    getWidth(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().width || this.initialWidth;
    }

    /** Height of element */
    getHeight(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().height || this.initialHeight;
    }

    /** Native element  */
    getElement(): any {
        return this._elementRef.nativeElement;
    }

}
