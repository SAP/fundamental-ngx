import { Component, HostBinding, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fd-menu-addon',
    template: `
        <ng-template cdkPortalOutlet></ng-template>
        <ng-content></ng-content>
    `,
    standalone: true,
    imports: [PortalModule]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MenuAddonDirective implements OnInit, OnDestroy {
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
    private menuComponent = inject(MenuComponent, { optional: true });

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    addonGlyphPortalOutlet: CdkPortalOutlet;

    /** @hidden */
    ngOnInit(): void {
        if (this.menuComponent) {
            this.menuComponent._addons = [...this.menuComponent._addons, this];
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.menuComponent) {
            this.menuComponent._addons = this.menuComponent._addons.filter((item) => item !== this);
        }
    }
}
