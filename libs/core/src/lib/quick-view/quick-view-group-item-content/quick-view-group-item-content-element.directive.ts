import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-quick-view-group-item-content-element]',
    host: {
        class: `${QuickViewGroupItemContentElementDirective.class}`
    }
})
export class QuickViewGroupItemContentElementDirective {
    /** @hidden */
    static class = 'fd-quick-view__group-item__content-element';
}
