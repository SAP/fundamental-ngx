import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    NgZone,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    runInInjectionContext,
    signal,
    untracked
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective, RtlService, TemplateDirective, TemplateModule } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { TitleComponent } from '@fundamental-ngx/core/title';
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
        TemplateModule,
        BarLeftDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        TemplateDirective,
        BarLeftDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        ButtonComponent,
        ContentDensityDirective,
        NgTemplateOutlet,
        InitialFocusDirective,
        DialogComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogCloseButtonComponent,
        DialogFooterComponent,
        TitleComponent
    ]
})
// @ts-expect-error - MenuInterface has InputSignal properties which don't perfectly match MobileMode base
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
    protected readonly navigationIcon = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /** @hidden */
    @ViewChild(DialogBodyComponent)
    set _watch(_dialogBody: DialogBodyComponent) {
        if (_dialogBody) {
            this._menuService.addKeyboardSupport(_dialogBody.elementRef);
        }
    }

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _menuService = inject(MenuService);

    /** @hidden */
    private readonly _ngZone = inject(NgZone);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    constructor(@Inject(MENU_COMPONENT) menuComponent: MenuInterface) {
        super(menuComponent, MobileModeControl.MENU);

        // Set up effect to watch isOpen changes and open/close dialog
        // This runs synchronously when the signal changes, avoiding timing issues
        effect(
            () => {
                const isOpen = this._component.isOpen();
                untracked(() => {
                    if (isOpen && !this.dialogRef) {
                        // Only open if not already open
                        this._openDialog();
                    } else if (!isOpen && this.dialogRef) {
                        // Only close if currently open
                        this.dialogRef.close();
                    }
                });
            },
            { injector: this._injector }
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnActivePathChange();
        // Dialog open/close is now handled by effect in constructor
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
        // Run inside NgZone to ensure proper change detection for dialog rendering
        this._ngZone.run(() => {
            const config = {
                mobile: true,
                disablePaddings: true,
                ...this.dialogConfig,
                escKeyCloseable: false,
                backdropClickCloseable: false
            };

            // Only add container if it's valid (for tests, this might not be set up properly)
            if (this._elementRef?.nativeElement) {
                config.container = this._elementRef.nativeElement;
            }

            this.dialogRef = this._dialogService.open(this.dialogTemplate, config);
        });
    }

    /** @hidden Listens on Active Path changes and updates mobile view */
    private _listenOnActivePathChange(): void {
        const initialItemPath: MenuItemComponent[] = this._menuService.activeNodePath
            .map((node) => node.item)
            .filter((v): v is MenuItemComponent => !!v);

        // Use runInInjectionContext for outputToObservable
        runInInjectionContext(this._injector, () => {
            outputToObservable(this._component.activePath)
                .pipe(startWith(initialItemPath), takeUntilDestroyed(this._destroyRef))
                .subscribe((items) => this._setMenuView(items));
        });
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
