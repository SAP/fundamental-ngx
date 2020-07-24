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

@Directive({
    selector: '[fdTileSection], [fd-tile-section]'
})
export class TileSectionDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__section')
    fdTileSectionClass: boolean = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-subtitle]'
})
export class TileSubtitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__subtitle')
    fdTileSubtitleClass: boolean = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-title]'
})
export class TileTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__title')
    fdTileTitleClass: boolean = true;
}

