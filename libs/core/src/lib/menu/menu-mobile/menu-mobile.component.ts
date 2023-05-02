import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogBodyComponent, DialogService } from '@fundamental-ngx/core/dialog';
import { Observable, of } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { MENU_COMPONENT, MenuInterface } from '../menu.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControl,
    MobileModeConfigToken
} from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fd-menu-mobile',
    templateUrl: './menu-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuMobileComponent extends MobileModeBase<MenuInterface> implements OnInit, OnDestroy {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** Current menu title */
    title: string;

    /** Whether current menu level is submenu */
    isSubmenu: boolean;

    /** @hidden External content */
    childContent: TemplateRef<any> | undefined = undefined;

    /** @hidden Currently rendered menu view */
    view: TemplateRef<any> | undefined;

    /** @hidden Navigation icon name based on RTL */
    navigationIcon$: Observable<string>;

    /** @hidden */
    @ViewChild(DialogBodyComponent)
    set _watch(_dialogBody: DialogBodyComponent) {
        if (_dialogBody) {
            this._menuService.addKeyboardSupport(_dialogBody.elementRef());
        }
    }

    /** @hidden */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        private _menuService: MenuService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _ngZone: NgZone,
        @Optional() private _rtlService: RtlService,
        @Inject(MENU_COMPONENT) menuComponent: MenuInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, menuComponent, MobileModeControl.MENU, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnActivePathChange();
        this._listenOnMenuOpenChange();
        this._listenOnTextDirection();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** Closes the Dialog and Menu component */
    close(): void {
        this.dialogRef.close();
        this._component.close();
    }

    /** Navigate back to parent level of submenu */
    backToParentLevel(): void {
        const menuItem = this._menuService.activeNodePath[this._menuService.activeNodePath.length - 1].item;
        this._menuService.setActive(false, menuItem);
        this._executeOnStable(() => {
            menuItem?.focus();
        });
    }

    /** @hidden Opens the Dialog */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            disablePaddings: true,
            ...this.dialogConfig,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }

    /** @hidden Listens on Active Path changes and updates mobile view */
    private _listenOnActivePathChange(): void {
        const initialItemPath: MenuItemComponent[] = this._menuService.activeNodePath
            .map((node) => node.item)
            .filter((v): v is MenuItemComponent => !!v);
        this._component.activePath
            .pipe(takeUntil(this._onDestroy$), startWith(initialItemPath))
            .subscribe((items) => this._setMenuView(items));
    }

    /**
     * @hidden
     * Executes a function when the zone is stable.
     */
    private _executeOnStable(fn: () => any): void {
        if (this._ngZone.isStable) {
            fn();
        } else {
            this._ngZone.onStable.pipe(take(1)).subscribe(fn);
        }
    }

    /** @hidden Sets menu view, title and isSubmenu flag */
    private _setMenuView(items: MenuItemComponent[]): void {
        const lastItem: MenuItemComponent = items[items.length - 1];
        this.isSubmenu = !!items.length;
        this.title = this._getDialogTitle(lastItem);
        this.view = this._getMenuView(lastItem);
        this._changeDetectorRef.markForCheck();
        this._executeOnStable(() => {
            this._menuService.focusedNode?.item?.focus();
        });
    }

    /** @hidden Opens/closes the Dialog based on Menu isOpenChange events */
    private _listenOnMenuOpenChange(): void {
        this._component.isOpenChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((isOpen) => (isOpen ? this._openDialog() : this.dialogRef.close()));
    }

    /** @hidden Sets navigation arrow depending on text direction */
    private _listenOnTextDirection(): void {
        this.navigationIcon$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow')))
            : of('navigation-left-arrow');
    }

    /** @hidden Returns dialog title */
    private _getDialogTitle(menuItem: MenuItemComponent): string {
        if (this.isSubmenu) {
            return menuItem.menuItemTitle ? menuItem.menuItemTitle.title : '';
        }

        return this.mobileConfig.title || '';
    }

    /** @hidden Returns dialog content view */
    private _getMenuView(menuItem: MenuItemComponent): TemplateRef<any> | undefined {
        if (this.isSubmenu) {
            return menuItem.submenu ? menuItem.submenu.templateRef : this.view;
        }
        return this.childContent;
    }
}
