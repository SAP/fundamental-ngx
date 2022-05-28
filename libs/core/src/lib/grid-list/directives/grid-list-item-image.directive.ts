import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-grid-list-item-image]',
    host: {
        class: 'fd-grid-list__item-image'
    }
})
export class GridListItemImageDirective {}
