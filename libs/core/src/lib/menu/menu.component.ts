import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
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

    /** Display menu in mobile mode */
    @Input()
    mobile: boolean = false;

    /** Custom config used to open the Dialog */
    @Input()
    openOnHoverTime: number = 0;

    /** Emits array of active elements. */
    @Output()
    readonly activePath: EventEmitter<MenuItemComponent[]> = new EventEmitter<MenuItemComponent[]>();

    /** @hidden */
    @ViewChild('menuRootTemplate')
    menuRootTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('menuWithPopover')
    menuWithPopover: TemplateRef<any>;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popover: PopoverComponent;

    /** @hidden */
    @ViewChild('viewContainer', {read: ViewContainerRef})
    viewContainer: ViewContainerRef;

    /** @hidden */
    @ContentChildren(MenuItemComponent, {descendants: true})
    menuItems: QueryList<MenuItemComponent>;

    isOpen: boolean = false;

    trigger: ElementRef;

    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    subscriptions: Subscription = new Subscription();

    constructor(public elementRef: ElementRef,
                public changeDetectorRef: ChangeDetectorRef,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private _popoverComponent: PopoverComponent,
                @Optional() private _dynamicComponentService: DynamicComponentService) {}

    ngAfterContentInit() {
        this._menuService.setMenuRoot(this);
        this._listenOnMenuItemsChange();
    }

    ngAfterViewInit() {
        this._setupView();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    get closeOnOutsideClick(): boolean {
        return !this.mobile;
    }

    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this.changeDetectorRef.markForCheck();
    }

    close(): void {
        this.isOpen = false;
        this._menuService.resetMenuState();
        this.isOpenChange.emit(this.isOpen);
        this.changeDetectorRef.markForCheck();
    }

    focusFirst() {
        this._menuService.setFocused(this.menuItems.first);
    }

    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }

    handlePopoverOpenChange(isOpen: boolean): void {
        isOpen ? this.open() : this.close();
    }

    private _setupMobileMode(): void {
        if (this.mobile) {
            this._dynamicComponentService.createDynamicComponent(
                this.menuRootTemplate,
                MenuMobileComponent,
                {container: this.elementRef.nativeElement},
                {services: [this, this._menuService]}
            )
        }
    }

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

    private _loadView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(template);
    }

    private _listenOnMenuItemsChange(): void {
        this.subscriptions.add(
            this.menuItems.changes.subscribe(() => this._menuService.rebuildMenu())
        );
    }

    onPopoverLoaded() {
        this.focusFirst();
    }
}
