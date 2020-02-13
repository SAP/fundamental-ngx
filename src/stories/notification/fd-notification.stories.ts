import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { Component } from '@angular/core';
import { NotificationComponent, NotificationModule, NotificationService } from 'libs/core/src/lib/notification/public_api';
import { IdentifierComponent, IdentifierModule } from 'libs/core/src/lib/identifier/public_api';

@Component({
    selector: 'fd-notification-open-template-example',
})

    export default {
        title: 'Fd notification',
        component: NotificationComponent, IdentifierComponent,
        moduleMetadata: moduleMetadata,
        decorators: [
            withKnobs,
            withA11y,
            moduleMetadata({
                imports: [NotificationModule, IdentifierModule],
                declarations: []
            })
        ]
    };

export const Notification = () => ({
    template:
        `
        <ng-template let-notification #notificationTemplate>
            <fd-notification-header>
                <h3 fd-notification-title>Notification</h3>
            </fd-notification-header>
            <fd-notification-body>
                <div fd-notification-content>
                    <div fd-notification-avatar>
                        <span fd-identifier [size]="sizeVar" [glyph]="glyphVar"></span>
                    </div>
                    <div fd-notification-text>
                        <div fd-notification-description>Notification Description</div>
                        <div fd-notification-metadata>Notification Metadata</div>
                    </div>
                </div>
                <fd-notification-footer>
                    <button fd-button [options]="buttonOptionsVar">More Info</button>
                    <div fd-notification-actions>
                        <button fd-button [fdType]="buttonTypeVar1>Approve</button>
                        <button fd-button [fdType]="buttonTypeVar2>Reject</button>
                    </div>
                </fd-notification-footer>
            </fd-notification-body>
        </ng-template>

        `,
    props: {
        glyphVar: text('Glyph', 'home'),
        sizeVar: text('Glyph', 's'),
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
        emphasizedVar: boolean('Emphasized', false),
        disabledVar: boolean('Disabled', false),
        invertedVar: boolean('Inverted', false),
    }
});