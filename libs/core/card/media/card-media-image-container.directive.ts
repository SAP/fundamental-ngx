import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-image-container]',
    host: {
        class: 'fd-card__media-image-container'
    }
})
export class CardMediaImageContainerDirective {}
