import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonBarComponent, MultiComboboxComponent, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core';
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
    selector: 'fd-multi-combobox-inside-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './multi-combobox-inside-dialog-example.component.html',
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
        FormsModule,
        MultiComboboxComponent
    ]
})
export class MultiComboboxInsideDialogExampleComponent {
    dataSourceStrings = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];
    selectedItems = [this.dataSourceStrings[1]];
    confirmationReason: string;

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
            (result: string) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error: string) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }
}
