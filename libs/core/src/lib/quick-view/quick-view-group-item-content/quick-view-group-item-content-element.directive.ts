import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-quick-view-group-item-content-element]',
    host: {
        class: `${QuickViewGroupItemContentElementDirective.class} fd-input`
    }
})
export class QuickViewGroupItemContentElementDirective {
    /** @hidden */
    static class = 'fd-quick-view__group-item__content-element';
}
