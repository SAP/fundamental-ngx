import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { Observable, of, Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { map, startWith } from 'rxjs/operators';
import { DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { RtlService } from '../../utils/services/rtl.service';
import { MENU_COMPONENT, MenuInterface } from '../menu.interface';

@Component({
    selector: 'fd-menu-mobile',
    templateUrl: './menu-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuMobileComponent implements OnInit, OnDestroy {

    /** @hidden Dialog template reference */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** Current menu title */
    title: string;

    /** Whether current menu level is submenu */
    isSubmenu: boolean;

    /** Dialog reference */
    dialogRef: DialogRef;

    /** @hidden External content */
    childContent: TemplateRef<any> = undefined;

    /** @hidden Currently rendered menu view */
    view: TemplateRef<any>;

    /** @hidden Navigation icon name based on RTL */
    navigationIcon$: Observable<string>;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _menuService: MenuService,
        private _dialogService: DialogService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService,
        @Inject(MENU_COMPONENT) private _menuComponent: MenuInterface,
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnActivePathChange();
        this._listenOnMenuOpenChange();
        this._listenOnTextDirection();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Mobile config */
    get mobileConfig(): MobileModeConfig {
        return this._menuComponent.mobileConfig || {};
    }

    /** Closes the Dialog and Menu component */
    close(): void {
        this.dialogRef.close();
        this._menuComponent.close();
    }

    /** Navigate back to parent level of submenu */
    backToParentLevel(): void {
        this._menuService.setActive(
            false,
            this._menuService.activeNodePath[this._menuService.activeNodePath.length - 1].item
        );
    }

    /** @hidden Opens the Dialog */
    private _openDialog(): void {
        const dialogConfig: DialogConfig = this._menuComponent.dialogConfig || {};
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            ...dialogConfig,
            mobile: true,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }

    /** @hidden Listens on Active Path changes and updates mobile view */
    private _listenOnActivePathChange(): void {
        const initialItemPath: MenuItemComponent[] = this._menuService.activeNodePath.map(node => node.item);
        this._subscriptions.add(
            this._menuComponent.activePath
                .pipe(startWith(initialItemPath))
                .subscribe(items => this._setMenuView(items))
        )
    }

    /** @hidden Sets menu view, title and isSubmenu flag */
    private _setMenuView(items: MenuItemComponent[]): void {
        const lastItem: MenuItemComponent = items[items.length - 1];
        this.isSubmenu = !!items.length;
        this.title = this._getDialogTitle(lastItem);
        this.view = this._getMenuView(lastItem);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Opens/closes the Dialog based on Menu isOpenChange events */
    private _listenOnMenuOpenChange(): void {
        this._subscriptions.add(
            this._menuComponent.isOpenChange
                .subscribe(isOpen => isOpen ? this._openDialog() : this.dialogRef.close())
        )
    }

    /** @hidden Sets navigation arrow depending on text direction */
    private _listenOnTextDirection(): void {
        this.navigationIcon$ = this._rtlService
            ? this._rtlService.rtl.pipe(map(isRtl => isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
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
    private _getMenuView(menuItem: MenuItemComponent): TemplateRef<any> {
        if (this.isSubmenu) {
            return menuItem.submenu ? menuItem.submenu.templateRef : this.view;
        }
        return this.childContent;
    }
}
