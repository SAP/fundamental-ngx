import { ContentChild, Directive, ElementRef, HostBinding } from '@angular/core';
import { OverflowItemContainerRefDirective } from './overflow-item-container-ref.directive';

@Directive({
    selector: '[fdOverflowLayoutItemContainer]'
})
export class OverflowLayoutItemContainerDirective {
    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fd-overflow-layout__item';

    /**
     * Container reference.
     */
    @ContentChild(OverflowItemContainerRefDirective)
    containerRef: OverflowItemContainerRefDirective;

    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
