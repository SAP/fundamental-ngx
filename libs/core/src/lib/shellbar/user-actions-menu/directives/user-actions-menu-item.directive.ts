import { Directive, EventEmitter, HostListener, Input, OnDestroy, Optional, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { DialogContentType, DialogService } from '../../../dialog/dialog-service/dialog.service';
import { DialogRef } from '../../../dialog/utils/dialog-ref.class';
import { UserActionsSubmenuComponent } from '../components/user-actions-submenu/user-actions-submenu.component';
import { UserActionsMenuService } from '../services/user-actions-menu.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-user-actions-menu-item]'
})
export class UserActionsMenuItemDirective implements OnDestroy {
    /** Reference to submenu component */
    @Input()
    submenu: UserActionsSubmenuComponent;

    /** Close popover on click */
    @Input()
    closeOnClick = true;

    /** Opens a dialog component with with provided content. */
    @Input()
    dialogContent: DialogContentType;

    /** Emitted event when Dialog TemplateRef called */
    @Output()
    onOpenDialog = new EventEmitter<DialogRef>();

    /** Emitted when the menu item is selected. */
    @Output()
    onSelect: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

    /** @hidden Active dialog */
    _activeDialog?: DialogRef;

    /** @hidden */
    @HostListener('click', ['$event'])
    handleClick(event: MouseEvent): void {
        this._handleActions(event);
    }

    /** @hidden */
    @HostListener('keyup.enter', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        this._handleActions(event);
    }

    /** @hidden */
    constructor(
        /** @hidden */
        private readonly _dialogService: DialogService,
        /** @hidden */
        @Optional() public _menuService: UserActionsMenuService
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._dismissDialog();
    }

    /** @hidden */
    private _handleActions(event: MouseEvent | KeyboardEvent): void {
        this.onSelect.emit(event);

        if (this.submenu) {
            this._menuService.setActive(true, this);

            return;
        }

        if (this.closeOnClick) {
            this._menuService.menu._popover?.close();
        }

        if (this.dialogContent) {
            this._callDialogTemplateRef();
        }
    }

    /** @hidden */
    private _callDialogTemplateRef(): void {
        if (this._activeDialog) {
            return;
        }

        this._activeDialog = this._dialogService.open(this.dialogContent, { responsivePadding: true });

        this.onOpenDialog.emit(this._activeDialog);

        this._activeDialog.afterClosed.pipe(finalize(() => (this._activeDialog = null))).subscribe();
    }

    /** @hidden */
    private _dismissDialog(): void {
        this._activeDialog?.dismiss();
    }
}
