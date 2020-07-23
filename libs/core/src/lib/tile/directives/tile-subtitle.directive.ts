import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTileTitle], [fd-tile-subtitle]'
})
export class TileSubtitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__subtitle')
    fdTileSubtitleClass: boolean = true;
}
