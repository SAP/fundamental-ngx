import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ContentChild, ElementRef, HostBinding, HostListener, ViewChild, inject } from '@angular/core';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
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
    imports: [PortalModule]
})
export class MenuInteractiveComponent implements HasElementRef {
    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    addonPortalOutlet: CdkPortalOutlet;

    /** @hidden */
    @ContentChild(MenuAddonDirective)
    private set _addon(addon: MenuAddonDirective) {
        if (
            addon?.elementRef.nativeElement === this.elementRef.nativeElement.querySelector('fd-menu-addon:first-child')
        ) {
            this._startAddonInstance = addon;
        }
    }

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
    selected = false;

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    ariaExpanded: Nullable<boolean>;

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    @HostBinding('class.has-child')
    ariaHaspopup = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    @ContentChild(MenuItemInputDirective)
    private _input: MenuItemInputDirective;

    /** @hidden */
    _fromSplitButton = false;

    /** @hidden */
    readonly elementRef: ElementRef = inject(ElementRef);

    /** @hidden */
    private _startAddonInstance: MenuAddonDirective;

    /** @hidden */
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

    /** @hidden */
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _handleKeydown($event: KeyboardEvent): void {
        if (this._input && $event.target === this.elementRef.nativeElement) {
            this._input.elementRef.nativeElement.focus();
        }
    }

    /** @hidden */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && (this.ariaHaspopup || this._fromSplitButton);
        if (this.ariaHaspopup || this._fromSplitButton) {
            this.ariaExpanded = isSelected;
        }
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
