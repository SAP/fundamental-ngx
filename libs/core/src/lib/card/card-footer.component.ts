import { Component, ViewEncapsulation } from '@angular/core';
import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    styleUrls: ['./card-footer.component.scss'],
    host: {
        ['[class.fd-card__footer]']: 'true',
        [`[class.${CLASS_NAME.cardHeader}]`]: 'true',
        [`[class.${CLASS_NAME.cardHeaderNonInteractive}]`]: 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class CardFooterComponent {}
