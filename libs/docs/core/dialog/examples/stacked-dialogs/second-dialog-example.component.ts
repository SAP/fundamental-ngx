import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule, DialogRef } from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-9" fd-title>Second Dialog</h1>
                <button fd-dialog-close-button (click)="dialogRef.dismiss()" title="close"></button>
            </fd-dialog-header>

            <fd-dialog-body>
                <div id="fd-dialog-body-9">
                    This is the second dialog!<br />
                    It is completely independent from the first dialog and can be controlled separately!
                </div>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar
                    fdkInitialFocus
                    fdType="emphasized"
                    label="Close"
                    (click)="dialogRef.close()"
                    ariaLabel="Close Emphasized"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, BarModule, InitialFocusDirective]
})
export class SecondDialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}
