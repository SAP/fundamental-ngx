import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import { NotificationModule } from 'libs/core/src/lib/notification/notification.module';
import { NotificationComponent } from 'libs/core/src/lib/notification/notification/notification.component';
import { NotificationBodyComponent } from 'libs/core/src/lib/notification/notification-body/notification-body.component';
import { NotificationFooterComponent } from 'libs/core/src/lib/notification/notification-footer/notification-footer.component';
import { NotificationGroupComponent } from 'libs/core/src/lib/notification/notification-group/notification-group.component';
import { NotificationHeaderComponent } from 'libs/core/src/lib/notification/notification-header/notification-header.component';
import { DefaultNotificationComponent } from 'libs/core/src/lib/notification/notification-utils/default-notification/default-notification.component';
import { IdentifierModule } from '@fundamental-ngx/core';
import { ButtonModule } from 'libs/core/src/lib/button/button.module';

export default {
    title: 'Fd notification',
    component: NotificationComponent,
    NotificationBodyComponent,
    NotificationFooterComponent,
    NotificationGroupComponent,
    NotificationHeaderComponent,
    DefaultNotificationComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [NotificationModule, IdentifierModule, ButtonModule],
            declarations: []
        })
    ]
};

export const Notifications = () => ({
    template:
        `
        <fd-notification [type]="headerType" [size]="size">

        <fd-notification-header (closeButtonClick)="closeButtonAction">
            <h3 fd-notification-title>{{title}}</h3>
        </fd-notification-header>
        <fd-notification-body>
            <div fd-notification-content>
                <div fd-notification-avatar>
                    <span fd-identifier [size]="'s'" [circle]="true" aria-label="John Doe">JD</span>
                </div>
                <div fd-notification-text>
                    <div fd-notification-description>
                        {{description}}
                    </div>
                    <div fd-notification-metadata>
                        {{metadata}}
                    </div>
                </div>
            </div>
            <fd-notification-footer>
                <button fd-button [options]="'light'">                        
                    {{callToActionText}}
                </button>
                <div fd-notification-actions>
                    <button fd-button [fdType]="'positive'" (click)="approveAction">
                        {{approve}}
                    </button>
                    <button fd-button [fdType]="'negative'" (click)="cancelAction">
                        {{cancel}}
                    </button>
                </div>
            </fd-notification-footer>
        </fd-notification-body>
        </fd-notification>
  `,
    props: {
        headerType: select('Type of header', {
            information: 'information',
            success: 'success',
            error: 'error',
            warning: 'warning',
        }, 'success'),
        size: select('Size Of notification', {
            s: 's',
            m: 'm',
            l: 'l',
        }, 'l'),
        closeButton: boolean('Close button hidden', false),
        title: text('Title text', 'Title'),
        description: text('Description text', 'Description'),
        metadata: text('Meta Data text', 'MetaData'),
        callToActionText: text('Call to action button text', 'More Info'),
        approve: text('Approve button text', 'Approve'),
        cancel: text('Cancel button text', 'Cancel'),
        closeButtonAction: action('Close button'),
        callToAction: action('Close button'),
        approveAction: action('Close button'),
        cancelAction: action('Close button'),

    }
});
