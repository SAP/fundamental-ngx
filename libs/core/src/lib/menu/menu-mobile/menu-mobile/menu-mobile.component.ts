import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../../dialog/dialog-service/dialog.service';
import { MenuComponent } from '../../menu.component';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'fd-menu-mobile',
    templateUrl: './menu-mobile.component.html'
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

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _menuService: MenuService,
        private _menuComponent: MenuComponent,
        private _dialogService: DialogService
    ) { }

    /** @hidden */
    ngOnInit() {
        this._listenOnActivePathChange();
        this._listenOnMenuOpenChange();
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
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
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            focusTrapped: false,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }

    /** @hidden Listens on Active Path changes and updates mobile view */
    private _listenOnActivePathChange(): void {
        this._subscriptions.add(
            this._menuComponent.activePath
                .pipe(startWith(this._menuService.activeNodePath.map(node => node.item)))
                .subscribe(items => this._setMenuView(items))
        )
    }

    /** @hidden Sets menu view, title and isSubmenu flag */
    private _setMenuView(items: MenuItemComponent[]): void {
        const lastItem = items[items.length - 1];
        this.isSubmenu = !!items.length;
        this.title = this.isSubmenu ? lastItem.menuItemTitle.title : '';
        if (this.isSubmenu) {
            if (lastItem.subMenu) {
                this.view = lastItem.subMenu.templateRef
            }
        } else {
            this.view = this.childContent;
        }
    }

    /** @hidden Opens/closes the Dialog based on Menu isOpenChange events */
    private _listenOnMenuOpenChange(): void {
        this._subscriptions.add(
            this._menuComponent.isOpenChange
                .subscribe(isOpen => isOpen ? this._openDialog() : this.dialogRef.close())
        )
    }
}
