import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';

@Component({
    selector: 'fd-card-quick-view-example',
    templateUrl: 'card-quick-view-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, QuickViewModule, AvatarComponent, LinkComponent, ButtonComponent, ContentDensityDirective]
})
export class CardQuickViewExampleComponent {
    data = {
        id: 'employee-base',
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
}
