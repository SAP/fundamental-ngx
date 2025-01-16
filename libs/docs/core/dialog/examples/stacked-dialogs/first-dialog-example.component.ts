import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { SecondDialogExampleComponent } from './second-dialog-example.component';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-8" fd-title>First Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss('x')" title="close"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <div id="fd-dialog-body-8">
                    This is the first dialog!<br />
                    Click the button below to open the second dialog.
                </div>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    fdkInitialFocus
                    fdType="emphasized"
                    label="Open Second Dialog"
                    (click)="openDialog()"
                    ariaLabel="Open Second Dialog Emphasized"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        InitialFocusDirective,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogCloseButtonComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class FirstDialogExampleComponent {
    constructor(
        public dialogRef: DialogRef,
        public _dialogService: DialogService
    ) {}

    openDialog(): void {
        this._dialogService.open(SecondDialogExampleComponent, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-9',
            ariaDescribedBy: 'fd-dialog-body-9'
        });
    }
}
