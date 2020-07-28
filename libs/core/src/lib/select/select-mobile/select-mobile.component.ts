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
import { OptionComponent } from '../option/option.component';
import { SELECT_COMPONENT, SelectInterface } from '../select.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControl,
    MobileModeConfigToken
} from '../../utils/base-class/mobile-mode.class';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-select-mobile',
    templateUrl: './select-mobile.component.html'
})
export class SelectMobileComponent extends MobileModeBase<SelectInterface> implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: TemplateRef<any> = undefined;

    /** @hidden */
    private _selectedOnOpen: OptionComponent;

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(SELECT_COMPONENT) selectComponent: SelectInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, selectComponent, MobileModeControl.SELECT, mobileModes);
    }

    /** @hidden */
    ngOnInit() {
        this._listenOnSelectOpenChange();
    }

    /** @hidden */
    ngAfterViewInit() {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy() {
        this.dialogRef.close();
        super.onDestroy();
    }

    /** @hidden */
    cancel(): void {
        this._component.setSelectedOption({
            option: this._selectedOnOpen,
            controlChange: !!this._selectedOnOpen
        });
        this._component.close();
    }

    /** @hidden */
    approve(): void {
        if (this._component.selected) {
            this._component.setSelectedOption({
                option: this._component.selected,
                controlChange: true
            }, true);
        }
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
            container: this._elementRef.nativeElement
        });
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnSelectOpenChange(): void {
        this._component.isOpenChange.pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => {
                this._toggleDialog(isOpen);
                this._updateSelectedValue(isOpen);
            });
    }

    /** @hidden Cache selected value when Select opens */
    private _updateSelectedValue(isOpen: any): void {
        if (isOpen) {
            this._selectedOnOpen = this._component.selected;
        }
    }
}
