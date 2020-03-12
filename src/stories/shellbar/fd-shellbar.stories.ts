import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

import { ShellbarComponent, ShellbarModule } from 'libs/core/src/lib/shellbar/public_api';
import { ComboboxComponent, ComboboxModule } from 'libs/core/src/lib/combobox/public_api';
import { ProductSwitchComponent, ProductSwitchModule } from 'libs/core/src/lib/product-switch/public_api';
import { ShellbarCollapsibleExampleComponent } from 'apps/docs/src/app/core/component-docs/shellbar/examples/shellbar-collapsible-example.component';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';


export default {
    title: 'Fd shellbar',
    component: ShellbarComponent, ProductSwitchComponent, ComboboxComponent, ShellbarCollapsibleExampleComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ShellbarModule, ProductSwitchModule, ComboboxModule],
            declarations: []
        })
    ]
};

export const Shellbar = () => ({
    template:
        `
        <fd-shellbar>
        <fd-shellbar-logo>
            <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
        </fd-shellbar-logo>
        <fd-shellbar-title>
            {{shellbarTitle}}
        </fd-shellbar-title>
        <fd-shellbar-actions [user]="user" [userMenu]="userMenu" [closePopoverOnSelect]="closePopoverOnSelect" [collapsedItemMenuLabel]>
            <fd-shellbar-action *ngFor="let action of actions"
                [glyph]="action.glyph"
                [callback]="action.callback"
                [label]="action.label"
                [notificationCount]="action.notificationCount"
                [notificationLabel]="action.notificationLabel">
            </fd-shellbar-action>
        </fd-shellbar-actions>
    </fd-shellbar>
    
`,

    props: {
        closePopoverOnSelect: boolean('Close on popover select', false),
        collapsedItemMenuLabel: boolean('Collapsed Item Menu', false),
        user: object('User', { initials: 'WW', colorAccent: 11 }),
        userMenu: object('User Menu items',
            [
                {
                    text: 'Settings', callback: ($event) => {
                        console.log($event);
                        alert('Settings Clicked');
                    }
                },
                {
                    text: 'Sign Out', callback: ($event) => {
                        console.log($event);
                        alert('Sign out Clicked');
                    }
                }
            ]),

        actions: object('Actions',
            [
                {
                    glyph: 'pool', callback: ($event) => {
                        console.log($event);
                        alert('Action pool Clicked');
                    }, label: 'Pool', notificationCount: 3, notificationLabel: 'Pool Count'
                },
                {
                    glyph: 'bell', callback: ($event) => {
                        console.log($event);
                        alert('Notifications Clicked');
                    }, label: 'Notifications', notificationCount: 12, notificationLabel: 'Unread Notifications'
                }
            ]),
        controlVar: text('Control', "Storybook"),
        shellbarTitle: text('Shellbar Title', 'Corporate Portal'),
    },
});
