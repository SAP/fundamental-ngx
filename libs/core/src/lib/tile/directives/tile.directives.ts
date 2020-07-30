import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';

@Directive({
    selector: '[fdTileContent], [fd-tile-content]'
})
export class TileContentDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__content')
    baseClass: boolean = true;

    /** Divides the tile content in to two columns. */
    @HostBinding('class.fd-tile__content--2-col')
    @Input()
    twoColumn: boolean = false;
}

@Directive({
    selector: '[fdTileContentByline], [fd-tile-content-byline]'
})
export class TileContentBylineDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__content-byline')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileContentText], [fd-tile-content-text]'
})
export class TileContentTextDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__content-text')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileFooter], [fd-tile-footer]'
})
export class TileFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__footer')
    baseClass: boolean = true;

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
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileHeader], [fd-tile-header]'
})
export class TileHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__header')
    baseClass: boolean = true;

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
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileSection], [fd-tile-section]'
})
export class TileSectionDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__section')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-subtitle]'
})
export class TileSubtitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__subtitle')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-title]'
})
export class TileTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__title')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileTitleContainer], [fd-tile-title-container]'
})
export class TileTitleContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__title-container')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileRefresh], [fd-tile-refresh]'
})
export class TileRefreshDirective implements OnInit, OnChanges {
    /** Glyph */
    @Input()
    glyph: string;

    /** Apply user custom styles */
    @Input()
    class: string;

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

let profileTileUniqueId: number = 0;

@Directive({
    selector: '[fdTileProfileImg], [fd-tile-profile-img]',
    host: {
        'attr.role': 'presentation'
    }
})
export class TileProfileImgDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__profile-img')
    baseClass: boolean = true;

    /** Id of the tile. */
    @Input()
    @HostBinding('attr.id')
    id: string = `fd-profileTile-${profileTileUniqueId++}`;

    /** Aria-label for tile. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string = null;

    /** Aria-Labelledby for element describing tile. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledby: string = null;

    /** Background image url. */
    @Input()
    backgroundImage: string = null;

    /** @hidden */
    @HostBinding('style.background-image')
    get image(): string {
        return 'url(' + this.backgroundImage + ')';
    }
}

@Directive({
    selector: '[fdTileLogo], [fd-tile-logo]'
})
export class TileLogoDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__logo')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileToggle], [fd-tile-toggle]'
})
export class TileToggleDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__toggle')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileContainer], [fd-tile-container]'
})
export class TileContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tile-container')
    baseClass: boolean = true;

    /** Whether or not the container is a 'list' type (used on screens smaller than 450px). */
    @HostBinding('class.fd-tile-container--list')
    @Input()
    list: boolean = false;
}

@Directive({
    selector: '[fdTileSlideContainer], [fd-tile-slide-container]'
})
export class TileSlideContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__container')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileBackgroundImg], [fd-tile-background-img]'
})
export class TileBackgroundImgDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__background-img')
    baseClass: boolean = true;

    /** Background image url. */
    @Input()
    backgroundImage: string = null;

    /** @hidden */
    @HostBinding('style.background-image')
    get image(): string {
        return 'url(' + this.backgroundImage + ')';
    }
}

@Directive({
    selector: '[fdTilePageIndicator], [fd-tile-page-indicator]'
})
export class TilePageIndicatorDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__page-indicator')
    baseClass: boolean = true;
}

@Directive({
    selector: '[fdTileDot], [fd-tile-dot]'
})
export class TileDotDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__dot')
    baseClass: boolean = true;

    /** Whether or not this dot is active. */
    @HostBinding('class.fd-tile__dot--active')
    @Input()
    active: boolean = false;
}

@Directive({
    selector: '[fdTileActionClose], [fd-tile-action-close]'
})
export class TileActionCloseDirective implements OnInit, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

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
        return ['fd-tile__action-close', this.class].filter((x) => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    selector: '[fdTileActionIndicator], [fd-tile-action-indicator]'
})
export class TileActionIndicatorDirective implements OnInit, OnChanges {
    /** Apply user custom styles */
    @Input()
    class: string;

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
        return ['fd-tile__action-indicator', this.class].filter((x) => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    selector: '[fdTileActionContainer], [fd-tile-action-container]'
})
export class TileActionContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tile__action-container')
    baseClass: boolean = true;
}
