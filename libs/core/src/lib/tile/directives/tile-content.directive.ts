import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTileContent], [fd-tile-content]'
})
export class TileContentDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__content')
    fdTileContentClass: boolean = true;

    /** Divides the tile content in to two columns. */
    @HostBinding('class.fd-tile__content--2-col')
    @Input()
    twoColumn: boolean = false;
}
