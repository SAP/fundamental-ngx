import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTileFooter], [fd-tile-footer]'
})
export class TileFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__footer')
    fdTileFooterClass: boolean = true;

    /** Divides the tile footer in to two columns. */
    @HostBinding('class.fd-tile__footer--2-col')
    @Input()
    twoColumn: boolean = false;
}
