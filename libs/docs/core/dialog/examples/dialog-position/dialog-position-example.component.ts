import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-dialog-position-example',
    templateUrl: './dialog-position-example.component.html',
    standalone: true,
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, BarModule, ButtonModule]
})
export class DialogPositionExampleComponent {
    constructor(public _dialogService: DialogService) {}

    openDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            responsivePadding: true,
            position: { bottom: '100px', right: '100px' },
            ariaLabelledBy: 'fd-dialog-header-6',
            ariaDescribedBy: 'fd-dialog-body-6'
        });
    }
}
