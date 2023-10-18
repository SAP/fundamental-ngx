import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-dialog-mobile-example',
    templateUrl: './dialog-mobile-example.component.html',
    standalone: true,
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, BarModule, ButtonModule]
})
export class DialogMobileExampleComponent {
    constructor(public _dialogService: DialogService) {}

    openDialog(dialogTemplate): void {
        this._dialogService.open(dialogTemplate, {
            mobile: true,
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-5',
            ariaDescribedBy: 'fd-dialog-body-5'
        });
    }
}
