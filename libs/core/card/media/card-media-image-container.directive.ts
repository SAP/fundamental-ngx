import { Directive } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-image-container]',
    host: {
        class: CLASS_NAME.cardMediaImageContainer
    }
})
export class CardMediaImageContainerDirective {}
