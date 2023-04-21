import { Component, HostBinding, Input } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NgIf } from '@angular/common';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fd-menu-addon',
    template: `
        <fd-icon [glyph]="glyph" *ngIf="glyph" role="presentation"></fd-icon>
        <ng-content></ng-content>
    `,
    standalone: true,
    imports: [NgIf, IconComponent]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MenuAddonDirective {
    /** Whether addon is used before or after text */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('position') set setAddonPosition(position: 'before' | 'after') {
        this.fdAddonBeforeClass = position === 'before';
        this.fdAddonAfterClass = position === 'after';
    }

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string;

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
}
