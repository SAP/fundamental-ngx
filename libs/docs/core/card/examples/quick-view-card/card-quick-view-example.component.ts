import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-quick-view-example',
    templateUrl: 'card-quick-view-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardQuickViewExampleComponent {
    data = {
        id: 'employee-base',
        title: 'Employee',
        subHeader: {
            title: 'Michael Adams',
            subtitle: 'Account Manager',
            avatar: 'http://placeimg.com/500/500/people'
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
}
