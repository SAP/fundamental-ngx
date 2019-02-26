import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-tile-content',
    host: {
        class: 'fd-tile__content'
    }
})
export class TileContentDirective {}
