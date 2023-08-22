import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-illustrated-message-dialog-example',
    templateUrl: './illustrated-message-dialog-example.component.html',
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        IllustratedMessageModule,
        BarModule,
        InitialFocusDirective,
        ButtonModule
    ]
})
export class IllustratedMessageDialogExampleComponent {
    dialogSvgConfig = {
        dialog: { url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail' }
    };
    dialogId = 'im-dialog-81mf46';

    confirmationReason: string;

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            id: this.dialogId,
            ariaLabelledBy: `${this.dialogId}-header`,
            ariaDescribedBy: `${this.dialogId}-description`
        });
    }
}
