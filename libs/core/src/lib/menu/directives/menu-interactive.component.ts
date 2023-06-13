import { Component, ElementRef, HostBinding, inject, ViewChild } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-menu-interactive]',
    template: `
        <ng-template cdkPortalOutlet></ng-template>
        <ng-content></ng-content>
    `,
    host: {
        role: 'menuitem'
    },
    imports: [PortalModule],
    standalone: true
})
export class MenuInteractiveComponent {
    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    addonPortalOutlet: CdkPortalOutlet;

    /** @hidden */
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    @HostBinding('class.is-disabled')
    disabled = false;

    /** @hidden */
    @HostBinding('attr.aria-controls')
    ariaControls: Nullable<string>;

    /** @hidden */
    @HostBinding('class.is-selected')
    @HostBinding('attr.aria-expanded')
    selected = false;

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    ariaHaspopup = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    _fromSplitButton = false;

    /** @hidden */
    public elementRef: ElementRef = inject(ElementRef);

    /** @hidden */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && (this.ariaHaspopup || this._fromSplitButton);
    }

    /** @hidden */
    setDisabled(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.tabindex = isDisabled ? -1 : 0;
    }

    /** @hidden */
    setSubmenu(hasSubmenu: boolean, itemId?: string): void {
        this.ariaHaspopup = hasSubmenu;
        this.ariaControls = hasSubmenu ? itemId || this.ariaControls : null;
    }
}

export { MenuInteractiveComponent as MenuInteractiveDirective };
