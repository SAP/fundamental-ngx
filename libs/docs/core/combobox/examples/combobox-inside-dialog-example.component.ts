import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogService,
    DialogTemplateDirective
} from '@fundamental-ngx/core/dialog';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-combobox-inside-dialog-example',
    templateUrl: './combobox-inside-dialog-example.component.html',
    imports: [
        ComboboxComponent,
        TitleComponent,
        DialogTemplateDirective,
        DialogFooterComponent,
        ButtonComponent,
        DialogComponent,
        ButtonBarComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        FormsModule
    ]
})
export class ComboboxInsideDialogExampleComponent {
    confirmationReason: string;
    searchTerm = '';
    fruits = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            focusTrapped: true
        });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
