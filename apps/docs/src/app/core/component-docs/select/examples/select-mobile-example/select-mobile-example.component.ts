import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef, DialogService, SelectComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html'
})
export class SelectMobileExampleComponent implements AfterViewInit, OnDestroy {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string;

    dialogRef: DialogRef;

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    constructor(private _dialogService: DialogService) {}

    ngAfterViewInit() {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    ngOnDestroy() {
        this.dialogRef.close();
    }

    close(): void {
        this.selectComponent.close();
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
            container: this.selectComponent.dialogContainerElementRef.nativeElement
        });
    }
}
