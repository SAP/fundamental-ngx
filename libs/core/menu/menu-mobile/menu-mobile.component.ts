import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    NgZone,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective, RtlService, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogBodyComponent, DialogModule } from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleModule } from '@fundamental-ngx/core/title';
import { startWith, take } from 'rxjs/operators';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MENU_COMPONENT, MenuInterface } from '../menu.interface';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'fd-menu-mobile',
    templateUrl: './menu-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        DialogModule,
        TemplateDirective,
        BarModule,
        ButtonComponent,
        ContentDensityDirective,
        TitleModule,
        CdkScrollable,
        ScrollbarDirective,
        NgTemplateOutlet,
        InitialFocusDirective
    ]
})
export class MenuMobileComponent extends MobileModeBase<MenuInterface> implements OnInit {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** Current menu title */
    title$ = signal('');

    /** Whether current menu level is submenu */
    isSubmenu$ = signal(false);

    /** @hidden External content */
    childContent: TemplateRef<any> | null = null;

    /** @hidden Currently rendered menu view */
    view$ = signal<TemplateRef<any> | null>(null);

    /** @hidden Navigation icon name based on RTL */
    navigationIcon$ = computed(() =>
        this._rtlService?.rtlSignal() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /** @hidden */
    @ViewChild(DialogBodyComponent)
    set _watch(_dialogBody: DialogBodyComponent) {
        if (_dialogBody) {
            this._menuService.addKeyboardSupport(_dialogBody.elementRef);
        }
    }

    /** @hidden */
    constructor(
        private _menuService: MenuService,
        private _ngZone: NgZone,
        @Optional() private _rtlService: RtlService,
        @Inject(MENU_COMPONENT) menuComponent: MenuInterface
    ) {
        super(menuComponent, MobileModeControl.MENU);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnActivePathChange();
        this._listenOnMenuOpenChange();
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
            .pipe(startWith(initialItemPath), takeUntilDestroyed(this._destroyRef))
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
        this.isSubmenu$.set(!!items.length);
        this.title$.set(this._getDialogTitle(lastItem));
        this.view$.set(this._getMenuView(lastItem));
        this._executeOnStable(() => {
            this._menuService.focusedNode?.item?.focus();
        });
    }

    /** @hidden Opens/closes the Dialog based on Menu isOpenChange events */
    private _listenOnMenuOpenChange(): void {
        this._component.isOpenChange
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((isOpen) => (isOpen ? this._openDialog() : this.dialogRef.close()));
    }

    /** @hidden Returns dialog title */
    private _getDialogTitle(menuItem: MenuItemComponent): string {
        if (this.isSubmenu$()) {
            return menuItem.menuItemTitle ? menuItem.menuItemTitle.title : '';
        }

        return this.mobileConfig.title || '';
    }

    /** @hidden Returns dialog content view */
    private _getMenuView(menuItem: MenuItemComponent): TemplateRef<any> | null {
        if (this.isSubmenu$()) {
            return menuItem.submenu ? menuItem.submenu.templateRef : this.view$();
        }
        return this.childContent;
    }
}
