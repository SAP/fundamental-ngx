import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { ButtonBarComponent } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogFullScreenTogglerButtonComponent,
    DialogHeaderComponent,
    DialogService,
    DialogTemplateDirective,
    DialogTitleDirective
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-template-based-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-dialog-example.component.html',
    imports: [
        TitleComponent,
        DialogTemplateDirective,
        DialogFooterComponent,
        CdkScrollable,
        ScrollbarDirective,
        ButtonComponent,
        DialogComponent,
        ButtonBarComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogTitleDirective,
        DialogFullScreenTogglerButtonComponent
    ]
})
export class TemplateBasedDialogExampleComponent {
    confirmationReason: string;

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-10',
            ariaDescribedBy: 'fd-dialog-body-10',
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
