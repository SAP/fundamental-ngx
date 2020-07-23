import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTileHeader], [fd-tile-header]'
})
export class TileHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__header')
    fdTileHeaderClass: boolean = true;

    /** Divides the tile header in to two columns. */
    @HostBinding('class.fd-tile__header--2-col')
    @Input()
    twoColumn: boolean = false;
}
