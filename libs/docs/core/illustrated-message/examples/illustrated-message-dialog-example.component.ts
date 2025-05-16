import { CdkScrollable } from '@angular/cdk/overlay';
import { Component, TemplateRef } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-illustrated-message-dialog-example',
    templateUrl: './illustrated-message-dialog-example.component.html',
    imports: [
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        IllustratedMessageModule,
        BarModule,
        InitialFocusDirective,
        ButtonComponent
    ]
})
export class IllustratedMessageDialogExampleComponent {
    dialogSvgConfig = {
        dialog: {
            url: 'assets/images/sapIllus-UnknownFolder-Demo-Medium.svg',
            id: 'sapIllus-UnknownFolder-Demo-Medium'
        },
        spot: {
            url: 'assets/images/sapIllus-Phone-with-Icon-Demo-Small.svg',
            id: 'sapIllus-Phone-with-Icon-Demo-Small'
        },
        dot: { url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg', id: 'sapIllus-Ice-Cream-Demo-ExtraSmall' }
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
