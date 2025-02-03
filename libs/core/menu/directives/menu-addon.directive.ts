import { CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import { Component, ElementRef, HostBinding, Input, ViewChild, inject } from '@angular/core';
import { GlyphMenuAddonDirective } from './glyph-menu-addon.directive';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fd-menu-addon',
    template: ` <ng-template cdkPortalOutlet></ng-template> `,
    hostDirectives: [{ directive: GlyphMenuAddonDirective, inputs: ['glyph'] }],
    imports: [PortalModule]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MenuAddonDirective {
    /** Whether addon is used before or after text */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('position') set setAddonPosition(position: 'before' | 'after') {
        this.fdAddonBeforeClass = position === 'before';
        this.fdAddonAfterClass = position === 'after';
    }

    /** Whether is used as submenu indicator */
    @Input()
    @HostBinding('class.fd-menu__addon-after--submenu')
    submenuIndicator = false;

    /** Sets Aria hidden attribute */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-after')
    fdAddonAfterClass = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-before')
    fdAddonBeforeClass = false;

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    set addonPortalOutlet(portalOutlet: CdkPortalOutlet) {
        this._addonGlyph.setGlyphPortalOutlet(portalOutlet);
    }

    /** @hidden */
    readonly _addonGlyph = inject(GlyphMenuAddonDirective);

    /** @hidden */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
}
