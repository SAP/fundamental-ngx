import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../../dialog/dialog-service/dialog.service';
import { SelectComponent } from '../../select.component';
import { Subscription } from 'rxjs';
import { MobileModeConfig } from '../../../utils/interfaces/mobile-mode-config';
import { OptionComponent } from '../../option/option.component';

@Component({
    selector: 'fd-select-mobile',
    templateUrl: './select-mobile.component.html'
})
export class SelectMobileComponent implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden Dialog template reference */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    childContent: TemplateRef<any> = undefined;

    /** @hidden */
    private _selectedOnOpen: OptionComponent;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _dialogService: DialogService,
        private _selectComponent: SelectComponent
    ) { }

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
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    get mobileConfig(): MobileModeConfig {
        return this._selectComponent.mobileConfig || {};
    }

    /** @hidden */
    cancel(): void {
        this._selectComponent.setSelectedOption({
            option: this._selectedOnOpen,
            controlChange: !!this._selectedOnOpen
        });
        this._selectComponent.close();
    }

    /** @hidden */
    approve(): void {
        if (this._selectComponent.selected) {
            this._selectComponent.setSelectedOption({
                option: this._selectComponent.selected,
                controlChange: true
            }, true);
        }
        this._selectComponent.close();
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
        const dialogConfig = this._selectComponent.dialogConfig || {};
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            ...dialogConfig,
            mobile: true,
            focusTrapped: false,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnSelectOpenChange(): void {
        this._subscriptions.add(
            this._selectComponent.isOpenChange
                .subscribe(isOpen => {
                    this._toggleDialog(isOpen);
                    this._updateSelectedValue(isOpen);
                })
        )
    }

    /** @hidden Cache selected value when Select opens */
    private _updateSelectedValue(isOpen: any): void {
        if (isOpen) {
            this._selectedOnOpen = this._selectComponent.selected;
        }
    }
}
