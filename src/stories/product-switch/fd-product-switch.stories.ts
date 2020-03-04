import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ProductSwitchComponent, ProductSwitchItem, ProductSwitchModule } from 'libs/core/src/lib/product-switch/public_api';

export default {
    title: 'Fd product-switch',
    component: ProductSwitchComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ProductSwitchModule],
            declarations: []
        })
    ]
};



export const ProductSwitch = () => ({
    template:
        `    
    <fd-product-switch
    [ariaLabel]="product switch button"
    >
        <fd-product-switch-body
            [forceListMode]="forceListModeVar"
            [products]="objectVar"
            >
        </fd-product-switch-body>
    </fd-product-switch>
    `,
    props: {
        forceListModeVar: boolean('Force list mode', false),
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