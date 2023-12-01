import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdProductSwitchButton]',
    standalone: true
})
export class ProductSwitchButtonDirective {
    /** @hidden */
    constructor(
        readonly templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef
    ) {}
}
