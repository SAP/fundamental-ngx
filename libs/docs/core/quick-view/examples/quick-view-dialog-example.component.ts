import { Component, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-quick-view-dialog-example',
    templateUrl: './quick-view-dialog-example.component.html'
})
export class QuickViewDialogExampleComponent {
    data = {
        id: 'employee-dialog',
        title: 'Employee',
        subHeader: {
            title: 'Michael Adams',
            subtitle: 'Account Manager',
            avatar: 'https://picsum.photos/500/500?people'
        },
        groups: [
            {
                title: 'Contact Details',
                items: [
                    {
                        label: 'Mobile',
                        value: '+1 605 555 5555'
                    },
                    {
                        label: 'Phone',
                        value: '+1 316 555 5555'
                    },
                    {
                        label: 'Email',
                        value: 'michael_adams@example.com'
                    }
                ]
            },
            {
                title: 'Company',
                items: [
                    {
                        label: 'Name',
                        value: 'Company A'
                    },
                    {
                        label: 'Address',
                        value: '718 Main Street, Anytown, SD 57401, USA'
                    }
                ]
            }
        ]
    };

    get isOpened(): boolean {
        return !!document.querySelector(`#${this.data.id}`);
    }

    constructor(private readonly dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        this.dialogService.open(dialog, { id: this.data.id, ariaLabelledBy: `${this.data.id}-header` });
    }

    getGroupId(idx: number, group: any): string {
        return `${this.data.id}-${idx}-${group.title.split(' ').join('-')}`;
    }
}
