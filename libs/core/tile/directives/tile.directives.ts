import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdTileContent], [fd-tile-content]',
    standalone: true
})
export class TileContentDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__content')
    baseClass = true;

    /** Divides the tile content in to two columns. */
    @HostBinding('class.fd-tile__content--2-col')
    @Input()
    twoColumn = false;
}

@Directive({
    selector: '[fdTileContentByline], [fd-tile-content-byline]',
    standalone: true
})
export class TileContentBylineDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__content-byline')
    baseClass = true;
}

@Directive({
    selector: '[fdTileContentText], [fd-tile-content-text]',
    standalone: true
})
export class TileContentTextDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__content-text')
    baseClass = true;
}

@Directive({
    selector: '[fdTileFooter], [fd-tile-footer]',
    standalone: true
})
export class TileFooterDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__footer')
    baseClass = true;

    /** Divides the tile footer in to two columns. */
    @HostBinding('class.fd-tile__footer--2-col')
    @Input()
    twoColumn = false;
}

@Directive({
    selector: '[fdTileFooterText], [fd-tile-footer-text]',
    standalone: true
})
export class TileFooterTextDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__footer-text')
    baseClass = true;
}

@Directive({
    selector: '[fdTileHeader], [fd-tile-header]',
    standalone: true
})
export class TileHeaderDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__header')
    baseClass = true;

    /** Divides the tile header in to two columns. */
    @HostBinding('class.fd-tile__header--2-col')
    @Input()
    twoColumn = false;
}

@Directive({
    selector: '[fdTileHeaderContent], [fd-tile-header-content]',
    standalone: true
})
export class TileHeaderContentDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__header-content')
    baseClass = true;
}

@Directive({
    selector: '[fdTileSection], [fd-tile-section]',
    standalone: true
})
export class TileSectionDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__section')
    baseClass = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-subtitle]',
    standalone: true
})
export class TileSubtitleDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__subtitle')
    baseClass = true;
}

@Directive({
    selector: '[fdTileTitle], [fd-tile-title]',
    standalone: true
})
export class TileTitleDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__title')
    baseClass = true;
}

@Directive({
    selector: '[fdTileTitleContainer], [fd-tile-title-container]',
    standalone: true
})
export class TileTitleContainerDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__title-container')
    baseClass = true;
}

@Directive({
    selector: '[fdTileRefresh], [fd-tile-refresh]',
    standalone: true
})
export class TileRefreshDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Glyph */
    @Input()
    glyph: string;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** Apply user custom styles */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel = 'Refresh';

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tile__refresh', this.glyph ? 'sap-icon--' + this.glyph : '', this.class];
    }
}

let profileTileUniqueId = 0;

@Directive({
    selector: '[fdTileProfileImg], [fd-tile-profile-img]',
    host: {
        'attr.role': 'img'
    },
    standalone: true
})
export class TileProfileImgDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__profile-img')
    baseClass = true;

    /** Id of the tile. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-profileTile-${profileTileUniqueId++}`;

    /** Aria-label for tile. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing tile. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledby: Nullable<string>;

    /** Background image url. */
    @Input()
    backgroundImage: Nullable<string>;

    /** @ignore */
    @HostBinding('style.background-image')
    get image(): string {
        return 'url(' + this.backgroundImage + ')';
    }
}

@Directive({
    selector: '[fdTileLogo], [fd-tile-logo]',
    standalone: true
})
export class TileLogoDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__logo')
    baseClass = true;
}

@Directive({
    selector: '[fdTileToggle], [fd-tile-toggle]',
    standalone: true
})
export class TileToggleDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__toggle')
    baseClass = true;
}

@Directive({
    selector: '[fdTileContainer], [fd-tile-container]',
    standalone: true
})
export class TileContainerDirective {
    /** @ignore */
    @HostBinding('class.fd-tile-container')
    baseClass = true;

    /** Whether or not the container is a 'list' type (used on screens smaller than 450px). */
    @HostBinding('class.fd-tile-container--list')
    @Input()
    list = false;
}

@Directive({
    selector: '[fdTileSlideContainer], [fd-tile-slide-container]',
    standalone: true
})
export class TileSlideContainerDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__container')
    baseClass = true;
}

@Directive({
    selector: '[fdTileBackgroundImg], [fd-tile-background-img]',
    standalone: true
})
export class TileBackgroundImgDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__background-img')
    baseClass = true;

    /** Background image url. */
    @Input()
    backgroundImage: Nullable<string>;

    /** @ignore */
    @HostBinding('style.background-image')
    get image(): string {
        return 'url(' + this.backgroundImage + ')';
    }
}

@Directive({
    selector: '[fdTilePageIndicator], [fd-tile-page-indicator]',
    standalone: true
})
export class TilePageIndicatorDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__page-indicator')
    baseClass = true;
}

@Directive({
    selector: '[fdTileDot], [fd-tile-dot]',
    standalone: true
})
export class TileDotDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__dot')
    baseClass = true;

    /** Whether or not this dot is active. */
    @HostBinding('class.fd-tile__dot--active')
    @Input()
    active = false;
}

@Directive({
    selector: '[fdTileActionClose], [fd-tile-action-close]',
    standalone: true
})
export class TileActionCloseDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._addCloseIcon();
    }

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tile__action-close', this.class];
    }

    /** @ignore */
    private _addCloseIcon(): void {
        const element = generateIcon('decline');
        this.elementRef.nativeElement.appendChild(element);
    }
}

@Directive({
    selector: '[fdTileActionIndicator], [fd-tile-action-indicator]',
    standalone: true
})
export class TileActionIndicatorDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._addIndicatorIcon();
    }

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-tile__action-indicator', this.class];
    }

    /** @ignore */
    private _addIndicatorIcon(): void {
        const element = generateIcon('overflow');
        this.elementRef.nativeElement.appendChild(element);
    }
}

@Directive({
    selector: '[fdTileActionContainer], [fd-tile-action-container]',
    standalone: true
})
export class TileActionContainerDirective {
    /** @ignore */
    @HostBinding('class.fd-tile__action-container')
    baseClass = true;
}

function generateIcon(iconName: string): HTMLElement {
    const element = document.createElement('i');
    element.setAttribute('role', 'presentation');
    element.classList.add(`sap-icon--${iconName}`);
    return element;
}
