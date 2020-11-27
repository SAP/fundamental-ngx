import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';
import { DATA } from '../quick-view-docs.component';

@Component({
    selector: 'fd-quick-view-dialog-example',
    templateUrl: './quick-view-dialog-example.component.html'
})
export class QuickViewDialogExampleComponent {
    data = DATA;

    constructor(private readonly dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        this.dialogService.open(dialog);
    }
}
