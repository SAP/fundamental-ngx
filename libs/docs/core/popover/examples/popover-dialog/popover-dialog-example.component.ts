import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-popover-dialog-example',
    templateUrl: './popover-dialog-example.component.html',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        PopoverComponent,
        PopoverControlComponent,
        InitialFocusDirective,
        PopoverBodyComponent,
        MultiInputModule
    ]
})
export class PopoverDialogExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openDialog(template: TemplateRef<any>): void {
        this._dialogService.open(template, {
            width: '500px',
            responsivePadding: true,
            ariaLabelledBy: 'fd-dialog-popover-1',
            focusTrapped: false
        });
    }
}
