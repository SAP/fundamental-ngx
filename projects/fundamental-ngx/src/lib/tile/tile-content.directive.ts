import { Directive } from '@angular/core';

@Directive({
    selector: 'fd-tile-content',
    host: {
        class: 'fd-tile__content'
    }
})
export class TileContentDirective {}
