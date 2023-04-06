// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

export const guides: SectionInterfaceContent[] = [
    { url: 'platform/home', name: 'Home' },
    { url: 'platform/new-component', name: 'New Component' },
    { url: 'platform/i18n', name: 'I18n' }
];

export const components: SectionInterfaceContent[] = [
    { url: 'platform/action-bar', name: 'Action Bar' },
    { url: 'platform/button', name: 'Button' },
    { url: 'platform/checkbox', name: 'Checkbox' },
    { url: 'platform/checkbox-group', name: 'Checkbox Group' },
    { url: 'platform/date-picker', name: 'Date Picker' },
    { url: 'platform/datetime-picker', name: 'Datetime Picker' },
    { url: 'platform/file-uploader', name: 'File Uploader' },
    { url: 'platform/info-label', name: 'Info Label' },
    { url: 'platform/input', name: 'Input' },
    { url: 'platform/input-group', name: 'Input Group' },
    { url: 'platform/feed-input', name: 'Feed Input' },
    { url: 'platform/link', name: 'Link' },
    { url: 'platform/menu', name: 'Menu' },
    { url: 'platform/menu-button', name: 'Menu Button' },
    { url: 'platform/multi-combobox', name: 'Multi Combobox' },
    { url: 'platform/multi-input', name: 'Multi Input' },
    { url: 'platform/panel', name: 'Panel' },
    { url: 'platform/object-marker', name: 'Object Marker' },
    { url: 'platform/object-status', name: 'Object Status' },
    { url: 'platform/object-attribute', name: 'Object Attribute' },
    { url: 'platform/radio-group', name: 'Radio Button Group' },
    { url: 'platform/search-field', name: 'Search Field' },
    { url: 'platform/smart-filter-bar', name: 'Smart Filter Bar' },
    { url: 'platform/split-menu-button', name: 'Split Menu Button' },
    {
        url: 'platform/table',
        name: 'Table',
        subItems: [
            { url: 'platform/table/basic', name: 'Basic examples' },
            { url: 'platform/table/p13-dialog-table', name: 'Personalization dialog' },
            { url: 'platform/table/settings-dialog-table', name: 'Settings dialog' },
            { url: 'platform/table/row-selection', name: 'Row selection' },
            { url: 'platform/table/scrolling', name: 'Scrolling options' },
            { url: 'platform/table/clickable-rows', name: 'Clickable rows' }
        ]
    },
    { url: 'platform/textarea', name: 'Textarea' },
    { url: 'platform/thumbnail', name: 'Thumbnail' },
    { url: 'platform/time-picker', name: 'Time Picker' },
    { url: 'platform/switch', name: 'Switch' },
    { url: 'platform/step-input', name: 'Step Input' },
    { url: 'platform/select', name: 'Select' },
    { url: 'platform/combobox', name: 'Combobox' },
    { url: 'platform/upload-collection', name: 'Upload Collection' },
    {
        name: 'List And Items',
        subItems: [
            { url: 'platform/list', name: 'List' },
            { url: 'platform/standard-list-item', name: 'Standard List Item' },
            { url: 'platform/action-list-item', name: 'Action List Item' },
            { url: 'platform/display-list-item', name: 'Display List Item' },
            { url: 'platform/object-list-item', name: 'Object List Item' }
        ]
    },
    { url: 'platform/value-help-dialog', name: 'Value Help Dialog' },
    { url: 'platform/approval-flow', name: 'Approval Flow' },
    { url: 'platform/slider', name: 'Slider' },
    { url: 'platform/icon-tab-bar', name: 'Icon Tab Bar' },
    {
        url: 'platform/message-popover',
        name: 'Message Popover'
    },
    {
        url: 'platform/variant-management',
        name: 'Variant Management'
    },
    {
        url: 'platform/settings-generator',
        name: 'Settings Generator'
    }
];

export const layouts: SectionInterfaceContent[] = [
    { url: 'platform/dynamic-page', name: 'Dynamic Page' },
    { url: 'platform/form-container', name: 'Form Container' },
    { url: 'platform/page-footer', name: 'Page Footer' }
];

export const utilities: SectionInterfaceContent[] = [
    { url: 'platform/form-generator', name: 'Form Generator' },
    { url: 'platform/wizard-generator', name: 'Wizard Generator' }
];

export const sections: SectionInterface[] = [
    {
        header: 'Guides',
        content: guides
    },
    {
        header: 'Components',
        content: components
    },
    {
        header: 'Layouts',
        content: layouts
    },
    {
        header: 'Utilities',
        content: utilities
    }
];
