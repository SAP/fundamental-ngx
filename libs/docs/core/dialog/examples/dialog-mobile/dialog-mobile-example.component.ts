import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ContentDensityMode } from '@fundamental-ngx/core';
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
    selector: 'fd-dialog-mobile-example',
    templateUrl: './dialog-mobile-example.component.html',
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        ButtonComponent,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class DialogMobileExampleComponent {
    constructor(public _dialogService: DialogService) {}

    openDialog(dialogTemplate): void {
        this._dialogService.open(dialogTemplate, {
            mobile: true,
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-header-mobile',
            ariaDescribedBy: 'fd-dialog-body-mobile',
            contentDensity: ContentDensityMode.COZY
        });
    }
}
