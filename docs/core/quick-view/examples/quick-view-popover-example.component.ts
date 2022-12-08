import { Component } from '@angular/core';

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
    ]
})
export class QuickViewPopoverExampleComponent {
    data = {
        id: 'employee-popover',
        title: 'Employee',
        subHeader: {
            title: 'Michael Adams',
            subtitle: 'Account Manager',
            avatar: 'https://placeimg.com/500/500/people'
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
