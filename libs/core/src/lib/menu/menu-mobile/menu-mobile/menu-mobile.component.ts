import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../../dialog/dialog-service/dialog.service';
import { MenuComponent } from '../../menu.component';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { MenuItemComponent } from '@fundamental-ngx/core';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'fd-menu-mobile',
    templateUrl: './menu-mobile.component.html',
    styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit, AfterViewInit {

    /** @hidden Dialog template reference */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    childContent: TemplateRef<any> = undefined;

    view: TemplateRef<any>;

    isSubmenu: boolean;

    title: string;

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
        this._listenOnSelectOpenChange();
    }

    /** @hidden */
    ngAfterViewInit() {
        this._openDialog();
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    close(): void {
        this.dialogRef.hide(true);
    }

    /** Navigate back to parent level of submenu */
    backToParentLevel(): void {
        this._menuService.setActive(
            this._menuService.activeNodePath[this._menuService.activeNodePath.length - 1].parent.item
        );
    }

    /** @hidden */
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

    /** @hidden Bing select open change with opening/closing the Dialog*/
    private _listenOnSelectOpenChange(): void {
        this._subscriptions.add(
            this._menuComponent.activePath
                .pipe(
                    startWith(this._menuService.activeNodePath.map(node => node.item))
                )
                .subscribe(items => this._setMenuView(items))
        )
    }

    private _setMenuView(items: MenuItemComponent[]): void {
        this.isSubmenu = !!items.length;
        this.title = this.isSubmenu
            ? items[items.length - 1].menuItemTitle.title
            : '';
        if (this.isSubmenu) {
            if (items[items.length - 1].subMenu) {
                this.view = items[items.length - 1].subMenu.templateRef
            }
        } else {
            this.view = this.childContent;
        }
    }
}
