import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';

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
    selector: '[fdTileFooterText], [fd-tile-footer-text]'
})
export class TileFooterTextDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__footer-text')
    fdTileFooterClass: boolean = true;
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
    selector: '[fdTileHeaderContent], [fd-tile-header-content]'
})
export class TileHeaderContentDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__header-content')
    fdTileHeaderClass: boolean = true;
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

@Directive({
    selector: '[fdTileRefresh], [fd-tile-refresh]'
})
export class TileRefreshDirective implements OnInit, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** Glyph */
    @Input()
    glyph: string;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return ['fd-tile__refresh', this.glyph ? 'sap-icon--' + this.glyph : '', this.class]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    selector: '[fdTileProfileImg], [fd-tile-profile-img]',
    host: {
        'attr.role': 'presentation'
    }
})
export class TileProfileImgDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__profile-img')
    fdTileTitleClass: boolean = true;
}

