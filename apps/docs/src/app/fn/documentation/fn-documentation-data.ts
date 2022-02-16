// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import {
    SectionInterface,
    SectionInterfaceContent
} from '../../documentation/core-helpers/sections-toolbar/section.interface';

export const guides: SectionInterfaceContent[] = [
    { url: 'fn/home', name: 'Home' },
    { url: 'fn/new-component', name: 'New Component' }
];

export const components: SectionInterfaceContent[] = [
    { url: 'fn/avatar', name: 'Avatar' },
    { url: 'fn/button', name: 'Button' },
    { url: 'fn/checkbox', name: 'Checkbox' },
    { url: 'fn/generic-tag', name: 'Generic Tag' },
    { url: 'fn/input', name: 'Input' },
    { url: 'fn/progress-bar', name: 'Progress Bar' },
    { url: 'fn/radio', name: 'Radio button' },
    { url: 'fn/search', name: 'Search' },
    { url: 'fn/select', name: 'Select' },
    { url: 'fn/slider', name: 'Slider' },
    { url: 'fn/switch', name: 'Switch' },
    { url: 'fn/segmented-button', name: 'Segmented Button' },
    {
        name: 'List',
        subItems: [
            { url: 'fn/list', name: 'Standard List' },
            { url: 'fn/list-byline', name: 'List with Byline' }
        ]
    },
    { url: 'fn/tabs', name: 'Tabs' },
    { url: 'fn/tag', name: 'Tag' },
    {
        url: 'fn/info-label',
        name: 'Info Label'
    },
    {
        url: 'fn/message-strip',
        name: 'Message Strip'
    },
    { url: 'fn/tag', name: 'Tag' },
    {
        url: 'fn/object-status',
        name: 'Object Status'
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
