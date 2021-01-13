import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';

import { DialogContentType, DialogRef, DialogService } from '../../../dialog/public_api';
import { UserActionsSubmenuComponent } from '../components/user-actions-submenu/user-actions-submenu.component';
import { UserActionsMenuService } from '../services/user-actions-menu.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-user-actions-menu-item]'
})
export class UserActionsMenuItemDirective implements OnDestroy {
    @Input()
    submenu: UserActionsSubmenuComponent;

    @Input()
    closeOnClick = true;

    /** Opens a dialog component with with provided content. */
    @Input()
    dialogContent: DialogContentType;

    @Output()
    onOpenDialog = new EventEmitter<DialogRef>();

    /** Emitted when the menu item is selected. */
    @Output()
    onSelect: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden Active dialog */
    _activeDialog?: DialogRef;

    /** @hidden */
    @HostListener('click')
    handleClick(): void {
        this.onSelect.emit();

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
