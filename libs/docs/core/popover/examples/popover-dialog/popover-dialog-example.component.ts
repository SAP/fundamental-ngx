import { CdkScrollable } from '@angular/cdk/overlay';
import { Component, TemplateRef } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-dialog-example',
    templateUrl: './popover-dialog-example.component.html',
    imports: [
        ButtonComponent,
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        PopoverComponent,
        PopoverControlComponent,
        InitialFocusDirective,
        PopoverBodyComponent,
        MultiInputComponent
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
