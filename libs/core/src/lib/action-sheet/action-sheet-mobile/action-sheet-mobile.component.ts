import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject, Input,
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

    /** Whenever links should be visible **/
    @Input()
    open = false;

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>,
    } = null;

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
        this._listenOnOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
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

    close(): void {
        // TODO
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        this.open = open;
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            ...this.dialogConfig,
            focusTrapped: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container:  this._elementRef.nativeElement
        });
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnOpenChange(): void {
        this._component.openChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen));
    }



}
