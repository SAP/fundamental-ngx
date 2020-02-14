import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { NotificationComponent, NotificationModule, NotificationService } from 'libs/core/src/lib/notification/public_api';
import { IdentifierComponent, IdentifierModule } from 'libs/core/src/lib/identifier/public_api';
import { ButtonModule } from 'libs/core/src/lib/button/public_api';
import { NotificationOpenTemplateExampleComponent } from '../../../apps/docs/src/app/core/component-docs/notification/examples/template-as-content/notification-open-template-example.component';


export default {
    title: 'Fd notification',
    component: NotificationComponent,
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

export const Notification = () => ({
    component: NotificationComponent,
    declarations: [],
    providers: [NotificationService],
    template:
        `
        <fd-notification-header (closeButtonClick)="notificationRef.dismiss('Close Icon Click')" [type]="'success'">
            <h3 fd-notification-title>{{titleVar}}</h3>
        </fd-notification-header>
        <fd-notification-body>
            <div fd-notification-content>
                <div fd-notification-avatar>
                    <span fd-identifier [size]="'s'" [circle]="true" aria-label="John Doe">JD</span>
                </div>
                <div fd-notification-text>
                    <div fd-notification-description>
                        {{descriptionVar}}
                    </div>
                    <div fd-notification-metadata>
                        {{metadataVar}}
                    </div>
                </div>
            </div>
            <fd-notification-footer>
                <button fd-button [options]="'light'">                        
                    {{moreInfoVar}}
                </button>
                <div fd-notification-actions>
                    <button fd-button [fdType]="'positive'" (click)="notificationRef.close('Approve Button Click')">
                        {{approveVar}}
                    </button>
                    <button fd-button [fdType]="'negative'" (click)="notificationRef.dismiss('Cancel Button Click')">
                        {{cancelVar}}
                    </button>
                </div>
            </fd-notification-footer>
        </fd-notification-body>

        `,
    props: {
        titleVar: text('Title', 'Notification Title'),
        descriptionVar: text('Description', 'Notification Description'),
        metadataVar: text('Meta Data', 'Other Data'),
        moreInfoVar: text('More Info', 'More Info'),
        approveVar: text('Approve', 'Approve'),
        cancelVar: text('Cancel', 'Cancel'),
        buttonOptionsVar: select('Button Options', {
            emphasized: 'emphasized',
            light: 'light',
            empty: '',
        }, ''),
        buttonTypeVar1: select('Button Type', {
            standard: 'standard',
            positive: 'positive',
            medium: 'medium',
            negative: 'negative',
        }, 'psoitive'),
        buttonTypeVar2: select('Button Type', {
            standard: 'standard',
            positive: 'positive',
            medium: 'medium',
            negative: 'negative',
        }, 'negative'),
    }
});
