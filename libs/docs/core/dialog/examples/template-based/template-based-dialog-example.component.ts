import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-template-based-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-dialog-example.component.html',
    standalone: true,
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, BarModule, ButtonModule]
})
export class TemplateBasedDialogExampleComponent {
    confirmationReason: string;

    constructor(private _dialogService: DialogService, private _cdr: ChangeDetectorRef) {}

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
