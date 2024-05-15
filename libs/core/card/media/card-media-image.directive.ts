import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-image]',
    standalone: true,
    host: {
        role: 'presentation',
        class: 'fd-card__media-image'
    }
})
export class CardMediaImageDirective {}
