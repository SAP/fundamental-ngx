import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';

@Component({
    selector: 'platform-documentation',
    styleUrls: ['./platform-documentation.component.scss'],
    templateUrl: './platform-documentation.component.html'
})
export class PlatformDocumentationComponent extends DocumentationBaseComponent {
    constructor() {
        super();

        this.guides = [
            { url: 'platform/home', name: 'Home' },
            { url: 'platform/new-component', name: 'New Component' }
        ];

        this.components = [
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
            { url: 'platform/feed-input', name: 'Feed Input'},
            { url: 'platform/link', name: 'Link' },
            { url: 'platform/menu', name: 'Menu' },
            { url: 'platform/menu-button', name: 'Menu Button' },
            { url: 'platform/multi-input', name: 'Multi Input' },
            { url: 'platform/panel', name: 'Panel' },
            { url: 'platform/object-marker', name: 'Object Marker' },
            { url: 'platform/object-status', name: 'Object Status' },
            { url: 'platform/object-attribute', name: 'Object Attribute' },
            { url: 'platform/radio-group', name: 'Radio Button Group' },
            { url: 'platform/search-field', name: 'Search Field' },
            { url: 'platform/split-menu-button', name: 'Split Menu Button' },
            { url: 'platform/table', name: 'Table' },
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
            { url: 'platform/slider', name: 'Slider' }
        ];

        this.layouts = [
            { url: 'platform/dynamic-page', name: 'Dynamic Page' },
            { url: 'platform/form-container', name: 'Form Container' }
        ];

        this.utilities = [];

        this.sections = [
            {
                header: 'Guides',
                content: this.guides
            },
            {
                header: 'Components',
                content: this.components
            },
            {
                header: 'Layouts',
                content: this.layouts
            },
            {
                header: 'Utilities',
                content: this.utilities
            }
        ];
    }
}
