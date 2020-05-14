import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogRef } from '../../../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../../../dialog/dialog-service/dialog.service';
import { SelectComponent } from '../../select.component';
import { Subscription } from 'rxjs';

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
    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _dialogService: DialogService,
        @Optional() private _selectComponent: SelectComponent
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
    close(): void {
        this._selectComponent.close();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    toggleDialog(isOpen: boolean): void {
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
            this._selectComponent.isOpenChange
                .subscribe(isOpen => this.toggleDialog(isOpen))
        )
    }
}
