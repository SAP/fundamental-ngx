import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-tile-media',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMediaDirective {}
