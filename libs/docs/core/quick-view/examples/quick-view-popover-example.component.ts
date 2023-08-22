import { Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-quick-view-popover-example',
    templateUrl: './quick-view-popover-example.component.html',
    styles: [
        `
            .fd-docs-flex-display-helper {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-flow: row wrap;
                width: 100%;
            }
        `
    ],
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonModule,
        PopoverBodyComponent,
        QuickViewModule,
        AvatarModule,
        NgFor,
        NgSwitch,
        NgSwitchCase,
        LinkComponent,
        NgSwitchDefault
    ]
})
export class QuickViewPopoverExampleComponent {
    data = {
        id: 'employee-popover',
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

    isOpened1 = false;
    isOpened2 = false;

    isOpenChangePopover1(isOpen: boolean): void {
        this.isOpened1 = isOpen;
    }

    isOpenChangePopover2(isOpen: boolean): void {
        this.isOpened2 = isOpen;
    }

    getGroupId(idx: number, group: any): string {
        return `${this.data.id}-${idx}-${group.title.split(' ').join('-')}`;
    }
}
