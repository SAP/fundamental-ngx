import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ContentChild, ElementRef, HostBinding, HostListener, ViewChild, inject } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemInputDirective } from './directives/menu-item-input.directive';

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
    /** @ignore */
    @ViewChild(CdkPortalOutlet)
    addonPortalOutlet: CdkPortalOutlet;

    /** @ignore */
    @ContentChild(MenuAddonDirective)
    private set _addon(addon: MenuAddonDirective) {
        if (
            addon?.elementRef.nativeElement === this.elementRef.nativeElement.querySelector('fd-menu-addon:first-child')
        ) {
            this._startAddonInstance = addon;
        }
    }

    /** @ignore */
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @ignore */
    @HostBinding('class.is-disabled')
    disabled = false;

    /** @ignore */
    @HostBinding('attr.aria-controls')
    ariaControls: Nullable<string>;

    /** @ignore */
    @HostBinding('class.is-selected')
    @HostBinding('attr.aria-expanded')
    selected = false;

    /** @ignore */
    @HostBinding('attr.aria-haspopup')
    @HostBinding('class.has-child')
    ariaHaspopup = false;

    /** @ignore */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @ignore */
    @ContentChild(MenuItemInputDirective)
    private _input: MenuItemInputDirective;

    /** @ignore */
    _fromSplitButton = false;

    /** @ignore */
    public elementRef: ElementRef = inject(ElementRef);

    /** @ignore */
    private _startAddonInstance: MenuAddonDirective;

    /** @ignore */
    get startAddon(): MenuAddonDirective {
        if (!this._startAddonInstance) {
            this.addonPortalOutlet.detach();
            this._startAddonInstance = this.addonPortalOutlet.attachComponentPortal(
                new ComponentPortal(MenuAddonDirective)
            ).instance;
            this._startAddonInstance.setAddonPosition = 'before';
        }
        return this._startAddonInstance;
    }

    /** @ignore */
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _handleKeydown($event: KeyboardEvent): void {
        if (this._input && $event.target === this.elementRef.nativeElement) {
            this._input.elementRef.nativeElement.focus();
        }
    }

    /** @ignore */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && (this.ariaHaspopup || this._fromSplitButton);
    }

    /** @ignore */
    setDisabled(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.tabindex = isDisabled ? -1 : 0;
    }

    /** @ignore */
    setSubmenu(hasSubmenu: boolean, itemId?: string): void {
        this.ariaHaspopup = hasSubmenu;
        this.ariaControls = hasSubmenu ? itemId || this.ariaControls : null;
    }
}

export { MenuInteractiveComponent as MenuInteractiveDirective };
