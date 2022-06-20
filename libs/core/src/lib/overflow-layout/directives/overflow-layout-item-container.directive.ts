import { ContentChild, Directive, ElementRef, HostBinding } from '@angular/core';
import { OverflowItemContainerRefDirective } from './overflow-item-container-ref.directive';

@Directive({
    selector: '[fdOverflowLayoutItemContainer]'
})
export class OverflowLayoutItemContainerDirective {
    @HostBinding('class')
    private readonly _initialClass = 'fd-overflow-layout__item';

    @ContentChild(OverflowItemContainerRefDirective)
    containerRef: OverflowItemContainerRefDirective;

    constructor(public elementRef: ElementRef) {}
}
