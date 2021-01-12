import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { FD_OPTION_PARENT_COMPONENT, FdOptionParentComponent } from '../option/option.component';
import { DialogRef } from '../../dialog/utils/dialog-ref.class';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { MOBILE_MODE_CONFIG, MobileModeConfigToken, MobileModeBase, MobileModeControl } from '../../utils/base-class/mobile-mode.class';

/**
 * This component provides extended mobile support for Select component to render list of option since full screen
 * dialog.
 *
 * When in Approve/Cancel mode we do allow emitting values on every selection, but we know how to rollback if user
 * decides otherwise. The important thing here is that there is no difference emitting event on every selection vs
 * only after it is approved as long as we can revert the selection.
 *
 * There could be situations where you want listen on actual change and maybe present the selected value in the view.
 */
@Component({
    selector: 'fd-select-mobile',
    templateUrl: './select-mobile.component.html'
})
export class SelectMobileComponent extends MobileModeBase<FdOptionParentComponent> implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden
     * from mobile class can not prefix _,
     * to avoid build issues
    */
    childContent: TemplateRef<any> = undefined;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _activeItemIndex: number;

    /** @hidden */
    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    constructor(
        _elementRef: ElementRef,
        _dialogService: DialogService,
        @Inject(FD_OPTION_PARENT_COMPONENT) public _parent: FdOptionParentComponent,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(_elementRef, _dialogService, _parent,
             MobileModeControl.SELECT,
            mobileModes);

    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnSelectOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef.close();
        this._subscriptions.unsubscribe();
    }


    /**
     * Only when we have Approve button available we do rollback to original selection that is stored in the
     * _activeItemIndex that was set when Dialog opened.
     *
     * @hidden
     */
    _cancel(): void {
        this._parent.close(true);
        if (this._parent._keyManager.activeItem && !!this.mobileConfig.approveButtonText) {
            this._parent._keyManager.setActiveItem(this._activeItemIndex);
            this._parent._keyManager.activeItem._selectViaInteraction();
        }
    }

    /** @hidden */
    _approve(): void {
        this._parent.close(true);
        if (this._parent._keyManager.activeItem) {
            this._parent._keyManager.activeItem._selectViaInteraction();
        }
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnSelectOpenChange(): void {
      // Listens for Select option HIDE/SHOW events in order to show or hide this dialog
        // When in non dismissible mode we save currently selected item index to rollback original selection
        //
        this._subscriptions.add(
            this._parent.isOpenChange.subscribe((isOpen) => {
                this.dialogRef.hide(!isOpen);
                this._activeItemIndex = this._parent._keyManager.activeItemIndex;
            })
        );
    }

    /** @hidden */
    private _openDialog(): void {
           this.dialogRef = this._dialogService.open(this._dialogTemplate, {
            ...this.dialogConfig,
            mobile: true,
            focusTrapped: false,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }
}
