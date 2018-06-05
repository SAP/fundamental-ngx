import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'fd-tile-grid',
    host: {
        '[class]': '"fd-tile-grid" + (col ? "  fd-tile-grid--" + col + "col" : "") '
    }
})
export class TileGridDirective {
    @Input() col;
}
