import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-form-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './form-dialog-example.component.html',
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        CheckboxComponent,
        FormsModule,
        ButtonComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogComponent
    ]
})
export class FormDialogExampleComponent {
    confirmationReason: string;
    responsivePadding = false;
    verticalPadding = false;

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: this.responsivePadding,
            focusTrapped: true,
            verticalPadding: this.verticalPadding,
            ariaLabelledBy: 'fd-dialog-header-form'
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
