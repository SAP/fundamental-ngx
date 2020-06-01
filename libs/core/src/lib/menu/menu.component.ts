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
import { MenuMobileComponent } from './menu-mobile/menu-mobile/menu-mobile.component';
import { Subscription } from 'rxjs';
import { DIALOG_CONFIG, DialogConfig, MobileModeConfig, PopoverFillMode } from '../..';
import { Placement, PopperOptions } from 'popper.js';

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
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Open submenu on hover after given milliseconds */
    @Input()
    openOnHoverTime: number = 0;

    /** Display menu without integrated popover */
    @Input()
    standalone: boolean = false;

    /** Display menu without integrated popover */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

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
        this._menuService.onDestroy();
        this._eventRef.forEach(ref => ref());
        this._subscriptions.unsubscribe();
    }

    get trigger(): ElementRef {
        return this._externalTrigger;
    }

    set trigger(trigger: ElementRef) {
        this._externalTrigger = trigger;
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
        } else if (this.standalone) {
            this._loadView(this.menuRootTemplate);
        } else {
            this._loadView(this.menuWithPopover);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _manageKeyboardSupport(shouldHaveKeyboardSupport?: boolean) {
        if (shouldHaveKeyboardSupport) {
            this._menuService.addKeyboardSupport();
        } else {
            this._menuService.removeKeyboardSupport();
        }
    }

    /** @hidden */
    private _manageOutsideCLickListener(shouldCloseOnOutsideClick?: boolean) {
        if (shouldCloseOnOutsideClick && this.closeOnOutsideClick) {
            this._menuService.addOutsideClickListener();
        } else {
            this._menuService.removeOutsideClickListener();
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
        this._subscriptions.add(
            this.menuItems.changes.subscribe(() => this._menuService.rebuildMenu())
        );
    }

    /** @hidden Listen on menu mode */
    private _listenOnMenuMode() {
        this._subscriptions.add(
            this._menuService.isMobileMode.subscribe(isMobile => {
                if (this.isOpen) {
                    this.close();
                }
                this.viewContainer.clear();
                this._destroyMobileComponent();
                this._setupView();
                this._manageKeyboardSupport(!isMobile);
                this._manageOutsideCLickListener(!isMobile && this.standalone);
            })
        )
    }

    private _destroyMobileComponent(): void {
        if (this._mobileModeComponentRef) {
            this._mobileModeComponentRef.destroy();
        }
    }
}
