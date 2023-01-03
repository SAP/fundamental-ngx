// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

export const guides: SectionInterfaceContent[] = [
    { url: 'cdk/home', name: 'Home' },
    { url: 'cdk/new-component', name: 'New Component' },
    { url: 'cdk/i18n', name: 'I18n' }
];

export const components: SectionInterfaceContent[] = [
    {
        url: 'cdk/forms',
        name: 'Forms'
    },
    {
        url: 'cdk/data-source',
        name: 'Data Source'
    },
    {
        url: 'cdk/utils',
        name: 'Utils'
    },
    {
        url: 'cdk/focusable-item',
        name: 'Focusable Item'
    }
];

export const sections: SectionInterface[] = [
    {
        header: 'Guides',
        content: guides
    },
    {
        header: 'Components',
        content: components
    }
];
