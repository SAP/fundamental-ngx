import { Directive, ElementRef, Input } from '@angular/core';

let uniqueCarouselItemId: number = 0;

@Directive({
    selector: '[fdCarouselItem]'
})
export class CarouselItemDirective {

    @Input()
    value: any;

    @Input()
    carouselItemId: string = 'carousel-item-id-' + uniqueCarouselItemId++;

    constructor(
        private _elementRef: ElementRef
    ) {}

    getWidth(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().width;
    }

    getHeight(): number {
        return this._elementRef.nativeElement.getBoundingClientRect().height;
    }

    getElement(): any {
        return this._elementRef.nativeElement;
    }

}
