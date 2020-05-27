import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuService } from './services/menu.service';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { MenuMobileComponent } from './menu-mobile/menu-mobile/menu-mobile.component';
import { PopoverComponent } from '../..';
import { Subscription } from 'rxjs';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MenuService],
    exportAs: 'fdMenu'
})
export class MenuComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Set menu in mobile mode */
    @Input('mobile')
    set setMobileMode(value: boolean) {
        this.mobile = value;
        this._menuService.setMenuMode(this.mobile);
    }

    /** Open submenu on hover after given milliseconds */
    @Input()
    openOnHoverTime: number = 0;

    /** Emits array of active menu items */
    @Output()
    readonly activePath: EventEmitter<MenuItemComponent[]> = new EventEmitter<MenuItemComponent[]>();

    /** @hidden Emits event when the menu is opened/closed */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden Reference to the menu root template */
    @ViewChild('menuRootTemplate')
    menuRootTemplate: TemplateRef<any>;

    /** @hidden Reference to the menu with popover template */
    @ViewChild('menuWithPopover')
    menuWithPopover: TemplateRef<any>;

    /** @hidden Reference  the container where component views are instantiated */
    @ViewChild('viewContainer', {read: ViewContainerRef})
    viewContainer: ViewContainerRef;

    /** @hidden Reference to all menu Items */
    @ContentChildren(MenuItemComponent, {descendants: true})
    menuItems: QueryList<MenuItemComponent>;

    /** Whether use menu in mobile mode */
    mobile: boolean = false;

    /** @hidden Whether Popover with the menu is opened */
    isOpen: boolean = false;

    /** @hidden Reference to external menu trigger */
    trigger: ElementRef;

    /** @hidden */
    subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent>;

    constructor(public elementRef: ElementRef,
                public changeDetectorRef: ChangeDetectorRef,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private _popoverComponent: PopoverComponent,
                @Optional() private _dynamicComponentService: DynamicComponentService) {
    }

    /** @hidden */
    ngAfterContentInit() {
        this._menuService.setMenuRoot(this);
        this._listenOnMenuItemsChange();
    }

    /** @hidden */
    ngAfterViewInit() {
        this._listenOnMenuMode();
        this._menuService.setMenuMode(this.mobile);
    }

    /** @hidden */
    ngOnDestroy() {
        this._destroyMobileComponent();
        this.subscriptions.unsubscribe();
        this._menuService.removeKeyboardSupport();
    }

    /** Opens the menu */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this.changeDetectorRef.markForCheck();
    }

    /** Closes the menu */
    close(): void {
        this.isOpen = false;
        this._menuService.resetMenuState();
        this.isOpenChange.emit(this.isOpen);
        this.changeDetectorRef.markForCheck();
    }

    /** Focuses first menu item */
    focusFirst() {
        this._menuService.setFocused(this.menuItems.first);
    }

    /** Toggles menu open/close state */
    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }

    /** @hidden Toggles menu open/close state */
    handlePopoverOpenChange(isOpen: boolean): void {
        isOpen ? this.open() : this.close();
    }

    /** @hidden Select and instantiate menu view mode */
    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        } else if (this._popoverComponent) {
            this._loadView(this.menuRootTemplate);
        } else {
            this._loadView(this.menuWithPopover);
        }
        this._changeDetectorRef.detectChanges();
    }

    private _manageKeyboardSupport(shouldHaveKeyboardSupport?: boolean) {
        if (shouldHaveKeyboardSupport) {
            this._menuService.addKeyboardSupport();
        } else {
            this._menuService.removeKeyboardSupport();
        }
    }

    /** @hidden Embed given template in view container */
    private _loadView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(template);
    }

    /** @hidden Open Menu in mobile mode */
    private _setupMobileMode(): void {
        this._mobileModeComponentRef = this._dynamicComponentService
            .createDynamicComponent<MenuMobileComponent>(
                this.menuRootTemplate,
                MenuMobileComponent,
                {container: this.elementRef.nativeElement},
                {services: [this, this._menuService]}
            )
    }

    /** @hidden Listen on menu items change and rebuild menu */
    private _listenOnMenuItemsChange(): void {
        this.subscriptions.add(
            this.menuItems.changes.subscribe(() => this._menuService.rebuildMenu())
        );
    }

    /** @hidden Listen on menu mode */
    private _listenOnMenuMode() {
        this.subscriptions.add(
            this._menuService.isMobileMode.subscribe(isMobile => {
                if (this.isOpen) {
                    this.close();
                }
                this.viewContainer.clear();
                this._destroyMobileComponent();
                this._setupView();
                this._manageKeyboardSupport(!isMobile);
            })
        )
    }

    private _destroyMobileComponent(): void {
        if (this._mobileModeComponentRef) {
            this._mobileModeComponentRef.destroy();
        }
    }
}
