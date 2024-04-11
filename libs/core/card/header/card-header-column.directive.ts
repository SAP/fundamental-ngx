import { Directive, input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-header-column]',
    standalone: true,
    host: {
        class: 'fd-card__header-column',
        '[class.fd-card__header-column--right-aligned]': 'align() === "right"'
    }
})
export class CardHeaderColumnDirective {
    /**
     * horizontal alignment of the elements inside the column
     * possible options: 'left' | 'right'
     * default: 'left'
     */
    align = input<'left' | 'right'>('left');
}
