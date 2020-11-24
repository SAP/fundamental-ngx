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
    Inject,
    Injector,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuService } from './services/menu.service';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { Subscription } from 'rxjs';
import { DIALOG_CONFIG, DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { PopoverFillMode } from '../popover/popover-position/popover-position';
import { Placement, PopperOptions } from 'popper.js';
import { RtlService } from '../utils/services/rtl.service';
import { MENU_COMPONENT, MenuInterface } from './menu.interface';

let menuUniqueId = 0;

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MenuService],
})
export class MenuComponent implements MenuInterface, AfterContentInit, AfterViewInit, OnDestroy {

    /** Set menu in mobile mode */
    @Input('mobile')
    set setMobileMode(value: boolean) {
        this.mobile = value;
        this._menuService.setMenuMode(this.mobile);
    }

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether or not to display the popover arrow. */
    @Input()
    noArrow = true;

    /** The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details. */
    @Input()
    options: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = true;

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = true;

    /** Display menu in compact mode */
    @Input()
    compact = false;

    /** Open submenu on hover after given milliseconds */
    @Input()
    openOnHoverTime = 0;

    /** Display menu without integrated popover */
    @Input()
    mobileConfig: MobileModeConfig = { cancelButtonText: 'Cancel' };

    /** Aria-label for navigation */
    @Input()
    ariaLabel: string = null;

    /** Aria-Labelledby for element describing navigation */
    @Input()
    ariaLabelledby: string = null;

    /** Id of the control. */
    @Input()
    id = `fd-menu-${menuUniqueId++}`;

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
    mobile = false;

    /** @hidden Whether Popover with the menu is opened */
    isOpen = false;

    /** @hidden */
    private _eventRef: Function[] = [];

    /** @hidden Reference to external menu trigger */
    private _externalTrigger: ElementRef;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent>;

    constructor(public elementRef: ElementRef,
                @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
                private _rendered: Renderer2,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private _rtlService: RtlService,
                @Optional() private _dynamicComponentService: DynamicComponentService) {
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._menuService.setMenuRoot(this);
        this._listenOnMenuItemsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnMenuMode();
        this._menuService.setMenuMode(this.mobile);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
        this._menuService.onDestroy();
        this._subscriptions.unsubscribe();
    }

    get trigger(): ElementRef {
        return this._externalTrigger;
    }

    set trigger(trigger: ElementRef) {
        this._externalTrigger = trigger;
        this._destroyEventListeners();
        this.listenOnTriggerEvents();
    }

    /** Opens the menu */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._changeDetectorRef.markForCheck();
    }

    /** Closes the menu */
    close(): void {
        this.isOpen = false;
        this._menuService.resetMenuState();
        this.isOpenChange.emit(this.isOpen);
        this._changeDetectorRef.markForCheck();
    }

    /** Focuses first menu item */
    focusFirst(): void {
        if (this.menuItems.first) {
            this._menuService.setFocused(this.menuItems.first);
        }
    }

    /** Toggles menu open/close state */
    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }

    /** @hidden Toggles menu open/close state */
    handlePopoverOpenChange(isOpen: boolean): void {
        isOpen ? this.open() : this.close();
    }

    /** @hidden Sets listeners based on triggers array */
    listenOnTriggerEvents(): void {
        if (Array.isArray(this.triggers)) {
            this.triggers.forEach(trigger => {
                this._eventRef.push(this._rendered.listen(this.trigger.nativeElement, trigger, () => {
                    this.toggle();
                }));
            });
        }
    }

    /** @hidden Select and instantiate menu view mode */
    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        } else {
            this._loadView(this.menuWithPopover);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _manageKeyboardSupport(shouldHaveKeyboardSupport?: boolean): void {
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
                { container: this.elementRef.nativeElement },
                {
                    injector: Injector.create({providers: [{ provide: MENU_COMPONENT, useValue: this }]}),
                    services: [this._menuService, this._rtlService] }
            )
    }

    /** @hidden Listen on menu items change and rebuild menu */
    private _listenOnMenuItemsChange(): void {
        this._subscriptions.add(
            this.menuItems.changes.subscribe(() => this._menuService.rebuildMenu())
        );
    }

    /** @hidden Listen on menu mode */
    private _listenOnMenuMode(): void {
        this._subscriptions.add(
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

    private _destroyEventListeners(): void {
        if (Array.isArray(this._eventRef)) {
            this._eventRef.forEach(ref => ref());
        }
    }
}
