import { CdkScrollable } from '@angular/cdk/overlay';

import { Component, TemplateRef } from '@angular/core';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-quick-view-dialog-example',
    templateUrl: './quick-view-dialog-example.component.html',
    imports: [
        DialogModule,
        TemplateDirective,
        BarModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        QuickViewModule,
        AvatarComponent,
        LinkComponent,
        ContentDensityDirective,
        ButtonComponent
    ]
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
