import { moduleMetadata } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';

import { ShellbarComponent, ShellbarModule } from 'libs/core/src/lib/shellbar/public_api';
import { ComboboxComponent, ComboboxModule } from 'libs/core/src/lib/combobox/public_api';
import { ProductSwitchComponent, ProductSwitchModule } from 'libs/core/src/lib/product-switch/public_api';

import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';

export default {
    title: 'Fd shellbar',
    component: ShellbarComponent, ProductSwitchComponent, ComboboxComponent,
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
            <a href="#"
               class="fd-shellbar__logo fd-shellbar__logo--image-replaced"
               aria-label="SAP"></a>
        </fd-shellbar-logo>
        <fd-product-menu [control]="controlVar"
                         [closePopoverOnSelect]="closePopoverOnSelect"
                         [items]="productMenuItems">
        </fd-product-menu>
        <fd-shellbar-subtitle>
            Subtitle
        </fd-shellbar-subtitle>
        <fd-shellbar-actions [user]="user"
                             [userMenu]="userMenu">
            <fd-shellbar-action *ngFor="let action of actions"
                                [glyph]="action.glyph"
                                [callback]="action.callback"
                                [label]="action.label"
                                [notificationCount]="action.notificationCount"
                                [notificationLabel]="action.notificationLabel">
            </fd-shellbar-action>
            <fd-product-switch
                [closeOnEscapeKey]="closeOnEscapeKey"
                [closeOnOutsideClick]="closeOnOutsideClick"
                [disabled]="disabled"
                [fillControlMode]="fillControlMode"
                [focusTrapped]="focusTrapped"
                [id]="id"
                [isDropdown]="isDropdown"
                [isOpen]="isOpen"
                [noArrow]="noArrow"
                [placement]="placement"
                [triggers]="triggersVar">
            <fd-product-switch-body
                [forceListMode]="forceListModeVar"
                [products]="objectVar"
                [dragAndDropEnabled]="dragAndDropEnabled">
            </fd-product-switch-body>
        </fd-product-switch>
            <fd-combobox [(ngModel)]="searchTerm"
                 [glyph]="'search'"
                 [dropdownValues]="searchTerms"
                 [placeholder]="'Type some text...'"
                 [maxHeight]="'250px'">
            </fd-combobox>
        </fd-shellbar-actions>
    </fd-shellbar>
  `,
    props: {
        closePopoverOnSelect: boolean('Close on popover select', false),
        controlVar: text('Control', "Storybook"),
        shellbarTitle: text('shellbarTitle', 'Corporate Portal'),

        forceListModeVar: boolean('Mobile Mode', false),
        closeOnEscapeKey: boolean('Close On Esc', false),
        closeOnOutsideClick: boolean('Close on Outside Click', false),
        disabled: boolean('disabled', false),
        fillControlMode: text('Full Controll Mode', 'equal'),
        focusTrapped: boolean('Focus Trapped', false),
        id: text('id', 'abd123'),
        isDropdown: boolean('Is Dropdown', true),
        isOpen: boolean('Is Open', true),
        noArrow: boolean('Hide Arrow', false),
        placement: text('Placement', "right"),
        dragAndDropEnabled: boolean('Enable Drag and Drop', false),
        triggersVar: object('Triggers', ['click']),
        productMenuItems: object('Product Menu items',
            [
                { name: 'Application A', callback: () => { alert('Application A Clicked') } },
                { name: 'Application B', callback: () => { alert('Application B Clicked') } },
                { name: 'Application C', callback: () => { alert('Application C Clicked') } },
                { name: 'Application D', callback: () => { alert('Application D Clicked') } }
            ]),

        objectVar: object('Objects',
            [
                {
                    title: 'Home',
                    subtitle: 'Central Home',
                    icon: 'home',
                    stickToPosition: true,
                    disabledDragAndDrop: true
                },
                {
                    title: 'Analytics Cloud',
                    subtitle: 'Analytics Cloud',
                    icon: 'business-objects-experience'
                },
                {
                    title: 'Catalog',
                    subtitle: 'Ariba',
                    icon: 'contacts'
                },
                {
                    title: 'Guided Buying',
                    icon: 'credit-card',
                },
                {
                    title: 'Strategic Procurement',
                    icon: 'cart-3',
                },
                {
                    title: 'Vendor Managemen',
                    subtitle: 'Fieldglass',
                    icon: 'shipping-status',
                    selected: true
                },
                {
                    title: 'Human Capital Management',
                    icon: 'customer'
                },
                {
                    title: 'Sales Cloud',
                    subtitle: 'Sales Cloud',
                    icon: 'sales-notification'
                },
                {
                    title: 'Commerce Cloud',
                    subtitle: 'Commerce Cloud',
                    icon: 'retail-store'
                },
                {
                    title: 'Marketing Cloud',
                    subtitle: 'Marketing Cloud',
                    icon: 'marketing-campaign'
                },
                {
                    title: 'Service Cloud',
                    icon: 'family-care'
                },
                {
                    title: 'S/4HANA',
                    icon: 'batch-payments'
                },
            ]
        )
    },
});
