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
            { url: 'platform/info-label', name: 'Info Label' },
            { url: 'platform/link', name: 'Link' },
            { url: 'platform/menu', name: 'Menu' },
            { url: 'platform/menu-button', name: 'Menu Button' },
            { url: 'platform/panel', name: 'Panel' },
            { url: 'platform/radio-group', name: 'Radio Button Group' },
            { url: 'platform/search-field', name: 'Search Field' },
            { url: 'platform/split-menu-button', name: 'Split Menu Button' },
            { url: 'platform/textarea', name: 'Textarea' }
        ];

        this.layouts = [];

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
                header: 'layouts',
                content: this.layouts
            },
            {
                header: 'Utilities',
                content: this.utilities
            }
        ];
    }
}
