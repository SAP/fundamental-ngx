import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTileSection], [fd-tile-section]'
})
export class TileSectionDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__section')
    fdTileSectionClass: boolean = true;
}
