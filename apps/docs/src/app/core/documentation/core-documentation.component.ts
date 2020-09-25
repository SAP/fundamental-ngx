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
            { url: 'core/alert', name: 'Alert' },
            { url: 'core/avatar', name: 'Avatar' },
            { url: 'core/bar', name: 'Bar' },
            { url: 'core/breadcrumb', name: 'Breadcrumb' },
            { url: 'core/busyIndicator', name: 'Busy Indicator' },
            { url: 'core/button', name: 'Button' },
            { url: 'core/card', name: 'Card' },
            { url: 'core/segmentedButton', name: 'Segmented Button' },
            { url: 'core/checkbox', name: 'Checkbox' },
            { url: 'core/splitButton', name: 'Split Button' },
            { url: 'core/calendar', name: 'Calendar' },
            { url: 'core/combobox', name: 'Combobox' },
            { url: 'core/datePicker', name: 'Date Picker' },
            { url: 'core/datetime-picker', name: 'Datetime Picker' },
            { url: 'core/dialog', name: 'Dialog' },
            { url: 'core/icon', name: 'Icon' },
            { url: 'core/file-uploader', name: 'File Uploader' },
            { url: 'core/form-message', name: 'Form Message' },
            { url: 'core/info-label', name: 'Info Label' },
            { url: 'core/inlineHelp', name: 'Inline Help' },
            { url: 'core/input', name: 'Input' },
            { url: 'core/inputGroup', name: 'Input Group' },
            { url: 'core/link', name: 'Link' },
            { url: 'core/list', name: 'List' },
            { url: 'core/localizationEditor', name: 'Localization Editor' },
            { url: 'core/mega-menu', name: 'Mega Menu' },
            { url: 'core/menu', name: 'Menu' },
            { url: 'core/message-strip', name: 'Message Strip' },
            { url: 'core/multi-input', name: 'Multi Input' },
            { url: 'core/notification', name: 'Notification' },
            { url: 'core/object-status', name: 'Object Status' },
            { url: 'core/pagination', name: 'Pagination' },
            { url: 'core/panel', name: 'Panel' },
            { url: 'core/popover', name: 'Popover' },
            { url: 'core/product-switch', name: 'Product Switch' },
            { url: 'core/radio', name: 'Radio Button' },
            { url: 'core/select', name: 'Select' },
            { url: 'core/shellbar', name: 'Shellbar' },
            { url: 'core/sideNavigation', name: 'Side Navigation' },
            { url: 'core/step-input', name: 'Step Input' },
            { url: 'core/table', name: 'Table' },
            { url: 'core/tabs', name: 'Tabs' },
            { url: 'core/textarea', name: 'Textarea' },
            { url: 'core/tile', name: 'Tile' },
            { url: 'core/time', name: 'Time' },
            { url: 'core/timePicker', name: 'Time Picker' },
            { url: 'core/switch', name: 'Switch' },
            { url: 'core/token', name: 'Token' },
            { url: 'core/toolbar', name: 'Toolbar' }
            // { url: 'core/tree', name: 'Tree' }
        ];

        this.layouts = [
            { url: 'core/layoutPanel', name: 'Layout Panel' },
            { url: 'core/layoutGrid', name: 'Layout Grid' }
        ];

        this.utilities = [
            { url: 'core/file-input', name: 'File Input' },
            { url: 'core/global-config', name: 'Global Configuration' },
            { url: 'core/infiniteScroll', name: 'Infinite Scroll' },
            { url: 'core/popover-directive', name: 'Popover Helper' },
            { url: 'core/scroll-spy', name: 'Scroll Spy' }
        ];

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
