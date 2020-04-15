import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html'
})
export class SelectMobileExampleComponent implements AfterViewInit, OnDestroy {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;
    dialogRef: DialogRef;

    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    constructor(private _dialogService: DialogService) {}

    ngAfterViewInit() {
        this._openDialog();
    }

    ngOnDestroy() {
        this.dialogRef.close();
    }

    toggleDialog(dialogTemplate: TemplateRef<any>, isOpen: boolean) {
        if (isOpen) {
            this.dialogRef.hide(false);
        } else {
            this.dialogRef.hide(true);
        }
    }

    private _openDialog() {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            backdropClickCloseable: false
        });
        this.dialogRef.hide(true);
    }
}
