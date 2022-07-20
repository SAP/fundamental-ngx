import { ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { OverflowItemContainerRefDirective } from './overflow-item-container-ref.directive';

@Directive({
    selector: '[fdOverflowLayoutItemContainer]'
})
export class OverflowLayoutItemContainerDirective {
    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fd-overflow-layout__item';

    /**
     * Whether this item is the first one in the array.
     */
    @Input()
    @HostBinding('class.fd-overflow-layout__item--last')
    last = false;

    /**
     * Whether this item is the last one in the array.
     */
    @Input()
    @HostBinding('class.fd-overflow-layout__item--first')
    first = false;

    /**
     * Container reference.
     */
    @ContentChild(OverflowItemContainerRefDirective)
    containerRef: OverflowItemContainerRefDirective;

    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
