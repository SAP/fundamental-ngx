import { Component, inject, signal, TemplateRef } from '@angular/core';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogService,
    DialogTemplateDirective
} from '@fundamental-ngx/core/dialog';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-dialog-example',
    templateUrl: './tooltip-dialog-example.component.html',
    styles: [
        `
            .fd-tooltip-dialog-example {
                display: flex;
                gap: 1rem;
            }
        `
    ],
    imports: [
        ButtonComponent,
        ButtonBarComponent,
        DialogComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogTemplateDirective,
        TitleComponent,
        TooltipDirective
    ]
})
export class TooltipDialogExampleComponent {
    protected readonly closeReason = signal('');

    private readonly _dialogService = inject(DialogService);

    protected openDialog(template: TemplateRef<unknown>): void {
        this.closeReason.set('');
        const dialogRef = this._dialogService.open(template, {
            responsivePadding: true,
            ariaLabelledBy: 'fd-tooltip-dialog-title',
            focusTrapped: true
        });

        dialogRef.afterClosed.subscribe({
            error: (reason) => this.closeReason.set(`Dialog dismissed: ${reason}`)
        });
    }
}
