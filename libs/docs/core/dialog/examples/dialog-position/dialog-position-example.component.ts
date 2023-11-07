import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-dialog-position-example',
    templateUrl: './dialog-position-example.component.html',
    standalone: true,
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, BarModule, ButtonComponent]
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
