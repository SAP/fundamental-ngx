import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTileTitle], [fd-tile-title]'
})
export class TileTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__title')
    fdTileTitleClass: boolean = true;
}
