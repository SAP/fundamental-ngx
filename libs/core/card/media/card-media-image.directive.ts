import { Directive } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-image]',
    host: {
        role: 'presentation',
        class: CLASS_NAME.cardMediaImage
    }
})
export class CardMediaImageDirective {}
