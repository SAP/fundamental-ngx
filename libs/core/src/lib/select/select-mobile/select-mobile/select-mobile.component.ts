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

    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    dialogRef: DialogRef;
    childContent: TemplateRef<any> = undefined;
    private _subscriptions = new Subscription();

    constructor(
        private _elementRef: ElementRef,
        private _dialogService: DialogService,
        @Optional() private _selectComponent: SelectComponent
    ) { }

    ngOnInit() {
        this._listenOnSelectOpenChange();
    }

    ngAfterViewInit() {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    ngOnDestroy() {
        this.dialogRef.close();
        this._subscriptions.unsubscribe();
    }

    close(): void {
        this._selectComponent.close();
        this.dialogRef.hide(true);
    }

    toggleDialog(isOpen: boolean): void {
        if (isOpen) {
            this.dialogRef.hide(false);
        } else {
            this.dialogRef.hide(true);
        }
    }

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

    private _listenOnSelectOpenChange(): void {
        this._subscriptions.add(
            this._selectComponent.isOpenChange
                .subscribe(isOpen => this.toggleDialog(isOpen))
        )
    }
}
