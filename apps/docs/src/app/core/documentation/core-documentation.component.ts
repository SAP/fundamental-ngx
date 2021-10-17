import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';

@Component({
    selector: 'core-documentation',
    styleUrls: ['./core-documentation.component.scss'],
    templateUrl: './core-documentation.component.html'
})
export class CoreDocumentationComponent extends DocumentationBaseComponent {
    constructor() {
        super();

        this.guides = [
            { url: 'core/home', name: 'Home' },
            { url: 'core/new-component', name: 'New Component' }
        ];

        this.components = [
            { url: 'core/action-bar', name: 'Action Bar' },
            { url: 'core/action-sheet', name: 'Action Sheet' },
            { url: 'core/alert', name: 'Alert' },
            { url: 'core/avatar', name: 'Avatar' },
            { url: 'core/avatar-group', name: 'Avatar Group' },
            { url: 'core/bar', name: 'Bar' },
            { url: 'core/breadcrumb', name: 'Breadcrumb' },
            { url: 'core/busy-indicator', name: 'Busy Indicator' },
            { url: 'core/button', name: 'Button' },
            { url: 'core/card', name: 'Card' },
            { url: 'core/segmented-button', name: 'Segmented Button' },
            { url: 'core/carousel', name: 'Carousel' },
            { url: 'core/checkbox', name: 'Checkbox' },
            { url: 'core/split-button', name: 'Split Button' },
            { url: 'core/calendar', name: 'Calendar' },
            { url: 'core/combobox', name: 'Combobox' },
            { url: 'core/date-picker', name: 'Date Picker' },
            { url: 'core/datetime-picker', name: 'Datetime Picker' },
            { url: 'core/dialog', name: 'Dialog' },
            { url: 'core/icon', name: 'Icon' },
            { url: 'core/facets', name: 'Facets' },
            { url: 'core/feed-list-item', name: 'Feed List Item' },
            { url: 'core/feed-input', name: 'Feed Input' },
            { url: 'core/file-uploader', name: 'File Uploader' },
            { url: 'core/form-message', name: 'Form Message' },
            { url: 'core/formatted-text', name: 'Formatted Text' },
            { url: 'core/info-label', name: 'Info Label' },
            { url: 'core/inline-help', name: 'Inline Help' },
            { url: 'core/input', name: 'Input' },
            { url: 'core/input-group', name: 'Input Group' },
            { url: 'core/link', name: 'Link' },
            { url: 'core/illustrated-message', name: 'Illustrated Message' },
            {
                name: 'List',
                subItems: [
                    { url: 'core/list', name: 'Standard List' },
                    { url: 'core/list-byline', name: 'List with Byline' }
                ]
            },
            { url: 'core/menu', name: 'Menu' },
            { url: 'core/message-box', name: 'Message Box' },
            { url: 'core/message-strip', name: 'Message Strip' },
            { url: 'core/message-page', name: 'Message Page' },
            { url: 'core/message-toast', name: 'Message Toast' },
            { url: 'core/micro-process-flow', name: 'Micro Process Flow' },
            { url: 'core/multi-input', name: 'Multi Input' },
            { url: 'core/notification', name: 'Notification' },
            { url: 'core/object-marker', name: 'Object Marker' },
            { url: 'core/object-identifier', name: 'Object Identifier' },
            { url: 'core/object-status', name: 'Object Status' },
            { url: 'core/pagination', name: 'Pagination' },
            { url: 'core/panel', name: 'Panel' },
            { url: 'core/popover', name: 'Popover' },
            { url: 'core/product-switch', name: 'Product Switch' },
            { url: 'core/quick-view', name: 'Quick View' },
            { url: 'core/radio', name: 'Radio Button' },
            { url: 'core/rating-indicator', name: 'Rating Indicator' },
            { url: 'core/select', name: 'Select' },
            { url: 'core/shellbar', name: 'Shellbar' },
            { url: 'core/side-navigation', name: 'Side Navigation' },
            { url: 'core/status-indicator', name: 'Status Indicator' },
            { url: 'core/step-input', name: 'Step Input' },
            { url: 'core/table', name: 'Table' },
            { url: 'core/tabs', name: 'Tabs' },
            { url: 'core/text', name: 'Text' },
            { url: 'core/textarea', name: 'Textarea' },
            { url: 'core/tile', name: 'Tile' },
            { url: 'core/time', name: 'Time' },
            { url: 'core/time-picker', name: 'Time Picker' },
            { url: 'core/title', name: 'Title' },
            { url: 'core/switch', name: 'Switch' },
            { url: 'core/token', name: 'Token' },
            { url: 'core/toolbar', name: 'Toolbar' },
            { url: 'core/object-number', name: 'Object Number' },
            { url: 'core/vertical-navigation', name: 'Vertical Navigation' },
            { url: 'core/upload-collection', name: 'Upload Collection' },
            { url: 'core/wizard', name: 'Wizard' },
            { url: 'core/grid-list', name: 'Grid List' },
            { url: 'core/slider', name: 'Slider' },
            { url: 'core/timeline', name: 'Timeline' },
            { url: 'core/splitter', name: 'Splitter/Responsive Splitter' }
        ];

        this.layouts = [
            { url: 'core/dynamic-page', name: 'Dynamic Page' },
            { url: 'core/dynamic-side-content', name: 'Dynamic Side Content' },
            { url: 'core/fixed-card-layout', name: 'Fixed Card Layout' },
            { url: 'core/flexible-column-layout', name: 'Flexible Column Layout' },
            { url: 'core/layout-panel', name: 'Layout Panel' },
            { url: 'core/layout-grid', name: 'Layout Grid' },
            { url: 'core/resizable-card-layout', name: 'Resizable Card Layout' }
        ];

        this.utilities = [
            { url: 'core/global-config', name: 'Global Configuration' },
            { url: 'core/content-density', name: 'Content Density' },
            { url: 'core/infinite-scroll', name: 'Infinite Scroll' },
            { url: 'core/scroll-spy', name: 'Scroll Spy' },
            { url: 'core/theme-switcher', name: 'Theme Switcher API' }
        ];

        this.adapters = [{ url: 'core/moment-datetime-adapter', name: 'Moment DateTime Adapter' }];

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
            },
            {
                header: 'Adapters',
                content: this.adapters
            }
        ];
    }
}
