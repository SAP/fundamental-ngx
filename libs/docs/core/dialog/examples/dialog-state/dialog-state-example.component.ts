import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
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
    selector: 'fd-dialog-state-example',
    templateUrl: './dialog-state-example.component.html',
    styleUrls: ['./dialog-state-example.component.scss'],
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        InitialFocusDirective,
        ButtonComponent,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class DialogStateExampleComponent {
    constructor(public dialogService: DialogService) {}

    openCloseDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be closed after 4s',
            ariaLabelledBy: 'fd-dialog-header-state',
            ariaDescribedBy: 'fd-dialog-body-state'
        });
        setTimeout(() => dialogRef.close(), 4000);
    }

    openDismissDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be dismissed after 4s',
            ariaLabelledBy: 'fd-dialog-header-state',
            ariaDescribedBy: 'fd-dialog-body-state'
        });
        setTimeout(() => dialogRef.dismiss(), 4000);
    }

    openHideDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            data: 'This Dialog will be hidden after 4s',
            ariaLabelledBy: 'fd-dialog-header-state',
            ariaDescribedBy: 'fd-dialog-body-state'
        });
        setTimeout(() => dialogRef.hide(true), 4000);
    }

    openLoadingDialog(template): void {
        const dialogRef = this.dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-state',
            ariaDescribedBy: 'fd-dialog-body-state'
        });
        dialogRef.loading({
            isLoading: true,
            loadingLabel: 'Some loading label',
            loadingContent: '... now loading data from a far far away server from far far away.'
        });
    }
}
