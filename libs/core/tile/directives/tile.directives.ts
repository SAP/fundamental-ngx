import { booleanAttribute, computed, Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, fdBuildIconClass, IconFont } from '@fundamental-ngx/core/icon';

@Directive({
    selector: '[fdTileContent], [fd-tile-content]',
    host: {
        class: 'fd-tile__content',
        '[class.fd-tile__content--2-col]': 'twoColumn()'
    }
})
export class TileContentDirective {
    /** Divides the tile content in to two columns. */
    readonly twoColumn = input(false, { transform: booleanAttribute });
}
@Directive({
    selector: '[fdTileContentText], [fd-tile-content-text]',
    host: {
        class: 'fd-tile__content-text'
    }
})
export class TileContentTextDirective {}

@Directive({
    selector: '[fdTileFooter], [fd-tile-footer]',
    host: {
        class: 'fd-tile__footer',
        '[class.fd-tile__footer--2-col]': 'twoColumn()'
    }
})
export class TileFooterDirective {
    /** Divides the tile footer in to two columns. */
    readonly twoColumn = input(false, { transform: booleanAttribute });
}

@Directive({
    selector: '[fdTileFooterText], [fd-tile-footer-text]',
    host: {
        class: 'fd-tile__footer-text'
    }
})
export class TileFooterTextDirective {}

@Directive({
    selector: '[fdTileHeader], [fd-tile-header]',
    host: {
        class: 'fd-tile__header',
        '[class.fd-tile__header--2-col]': 'twoColumn()'
    }
})
export class TileHeaderDirective {
    /** Divides the tile header in to two columns. */
    readonly twoColumn = input(false, { transform: booleanAttribute });
}

@Directive({
    selector: '[fdTileHeaderContent], [fd-tile-header-content]',
    host: {
        class: 'fd-tile__header-content'
    }
})
export class TileHeaderContentDirective {}

@Directive({
    selector: '[fdTileSection], [fd-tile-section]',
    host: {
        class: 'fd-tile__section'
    }
})
export class TileSectionDirective {}

@Directive({
    selector: '[fdTileTitle], [fd-tile-subtitle]',
    host: {
        class: 'fd-tile__subtitle'
    }
})
export class TileSubtitleDirective {}

@Directive({
    selector: '[fdTileTitle], [fd-tile-title]',
    host: {
        class: 'fd-tile__title'
    }
})
export class TileTitleDirective {}

@Directive({
    selector: '[fdTileTitleContainer], [fd-tile-title-container]',
    host: {
        class: 'fd-tile__title-container'
    }
})
export class TileTitleContainerDirective {}

@Directive({
    selector: '[fdTileRefresh], [fd-tile-refresh]',
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[class]': 'cssClass()'
    }
})
export class TileRefreshDirective implements HasElementRef {
    /** Glyph (icon) to display. */
    readonly glyph = input<string>();

    /** Glyph font family. */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Aria label for accessibility. */
    readonly ariaLabel = input<string>('Refresh');

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-tile__refresh'];

        const glyphValue = this.glyph();
        if (glyphValue) {
            classes.push(fdBuildIconClass(this.glyphFont(), glyphValue));
        }

        return classes.join(' ');
    });
}

let profileTileUniqueId = 0;

@Directive({
    selector: '[fdTileProfileImg], [fd-tile-profile-img]',
    host: {
        'attr.role': 'img',
        class: 'fd-tile__profile-img',
        '[attr.id]': 'id()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[style.background-image]': '`url(${backgroundImage()})`'
    }
})
export class TileProfileImgDirective {
    /** Unique identifier for the tile. */
    readonly id = input<string>(`fd-profileTile-${++profileTileUniqueId}`);

    /** Aria label for accessibility. */
    readonly ariaLabel = input<string | null | undefined>(null);

    /** Aria labelledby attribute referencing element(s) describing the tile. */
    readonly ariaLabelledby = input<string | null | undefined>(null);

    /** Background image URL. */
    readonly backgroundImage = input<string | null | undefined>(null);
}

@Directive({
    selector: '[fdTileLogo], [fd-tile-logo]',
    host: {
        class: 'fd-tile__logo'
    }
})
export class TileLogoDirective {}

@Directive({
    selector: '[fdTileToggle], [fd-tile-toggle]',
    host: {
        class: 'fd-tile__toggle'
    }
})
export class TileToggleDirective {}

@Directive({
    selector: '[fdTileContainer], [fd-tile-container]',
    host: {
        class: 'fd-tile-container',
        '[class.fd-tile-container--list]': 'list()'
    }
})
export class TileContainerDirective {
    /** Whether the container uses list layout (applies on screens smaller than 450px). */
    readonly list = input(false, { transform: booleanAttribute });
}

@Directive({
    selector: '[fdTileBackgroundImg], [fd-tile-background-img]',
    host: {
        class: 'fd-tile__background-img',
        '[style.background-image]': '`url(${backgroundImage()})`'
    }
})
export class TileBackgroundImgDirective {
    /** Background image URL. */
    readonly backgroundImage = input<string | null | undefined>(null);
}

@Directive({
    selector: '[fdTilePageIndicator], [fd-tile-page-indicator]',
    host: {
        class: 'fd-tile__page-indicator'
    }
})
export class TilePageIndicatorDirective {}

@Directive({
    selector: '[fdTileActionClose], [fd-tile-action-close]',
    host: {
        class: 'fd-tile__action-close'
    }
})
export class TileActionCloseDirective {
    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    constructor() {
        const element = generateIcon('decline');
        this._elementRef.nativeElement.appendChild(element);
    }
}

@Directive({
    selector: '[fdTileActionIndicator], [fd-tile-action-indicator]',
    host: {
        class: 'fd-tile__action-indicator'
    }
})
export class TileActionIndicatorDirective {
    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    constructor() {
        const element = generateIcon('overflow');
        this._elementRef.nativeElement.appendChild(element);
    }
}

@Directive({
    selector: '[fdTileActionContainer], [fd-tile-action-container]',
    host: {
        class: 'fd-tile__action-container'
    }
})
export class TileActionContainerDirective {}

function generateIcon(iconName: string): HTMLElement {
    const element = document.createElement('i');
    element.setAttribute('role', 'presentation');
    element.classList.add(`sap-icon--${iconName}`);
    return element;
}
