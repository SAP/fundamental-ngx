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
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from '../action-sheet.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControl,
    MobileModeConfigToken
} from '../../utils/base-class/mobile-mode.class';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html'
})
export class ActionSheetMobileComponent extends MobileModeBase<ActionSheetInterface> implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: TemplateRef<any> = undefined;


    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(ACTION_SHEET_COMPONENT) actionSheetComponent: ActionSheetInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, actionSheetComponent, MobileModeControl.ACTION_SHEET, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnActionSheetOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef.close();
        super.onDestroy();
    }

    /** @hidden */
    cancel(): void {
        this._component.close();
    }

    /** @hidden */
    private _toggleDialog(isOpen: boolean): void {
        if (isOpen) {
            this.dialogRef.hide(false);
        } else {
            this.dialogRef.hide(true);
        }
    }

    /** @hidden */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            ...this.dialogConfig,
            focusTrapped: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: 'body'
        });
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnActionSheetOpenChange(): void {
        this._component.isOpenChange.pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen)
            );
    }



}
