// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

export const guides: SectionInterfaceContent[] = [
    { url: 'cdk/home', name: 'Home' },
    { url: 'cdk/new-component', name: 'New Component' },
    { url: 'cdk/i18n', name: 'I18n' }
];

export const directives: SectionInterfaceContent[] = [
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

export const utilities: SectionInterfaceContent[] = [
    {
        url: 'cdk/typecheck',
        name: 'Type check'
    },
    {
        url: 'cdk/focus-trap',
        name: 'Focus trap'
    },
    {
        url: 'cdk/tabbable',
        name: 'Tabbable element'
    }
];

export const sections: SectionInterface[] = [
    {
        header: 'Guides',
        content: guides
    },
    {
        header: 'Directives',
        content: directives
    },
    {
        header: 'Utilities',
        content: utilities
    }
];
