// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

export const guides: SectionInterfaceContent[] = [
    { url: 'cdk/home', name: 'Home' },
    { url: 'cdk/new-component', name: 'New Component' },
    { url: 'cdk/i18n', name: 'I18n' }
];

export const directives: SectionInterfaceContent[] = [
    {
        url: 'cdk/control-value-accessor',
        name: 'Control Value Accessor'
    },
    {
        url: 'cdk/data-source',
        name: 'Data Source'
    },
    {
        url: 'cdk/drag-n-drop',
        name: 'Drag&Drop'
    },
    {
        url: 'cdk/focusable-list',
        name: 'Focusable List'
    },
    {
        url: 'cdk/focusable-grid',
        name: 'Focusable Grid'
    },
    {
        url: 'cdk/selectable-list',
        name: 'Selectable List'
    },
    {
        url: 'cdk/disabled',
        name: 'Disabled Behaviour'
    },
    {
        url: 'cdk/clicked',
        name: 'Clicked Behaviour'
    },
    {
        url: 'cdk/initial-focus',
        name: 'Initial Focus'
    }
];

export const utilities: SectionInterfaceContent[] = [
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
