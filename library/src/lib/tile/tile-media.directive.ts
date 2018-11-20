import { Directive } from '@angular/core';

@Directive({
    selector: 'fd-tile-media',
    host: {
        class: 'fd-tile__media'
    }
})
export class TileMediaDirective {}
