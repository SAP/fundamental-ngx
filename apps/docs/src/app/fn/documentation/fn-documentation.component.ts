import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';

@Component({
    selector: 'fn-documentation',
    styleUrls: ['./fn-documentation.component.scss'],
    templateUrl: './fn-documentation.component.html'
})
export class CoreDocumentationComponent extends DocumentationBaseComponent {
    constructor() {
        super();

        this.guides = [
            { url: 'fn/home', name: 'Home' },
            { url: 'fn/new-component', name: 'New Component' }
        ];

        this.components = [
            { url: 'fn/button', name: 'Button' },
            { url: 'fn/checkbox', name: 'Checkbox' },
            { url: 'fn/input', name: 'Input' },
            { url: 'fn/tabs', name: 'Tabs' },
            { url: 'fn/tag', name: 'Tag' },
            { url: 'fn/search', name: 'Search' },
            { url: 'fn/select', name: 'Select' },
            { url: 'fn/slider', name: 'Slider' },
            { url: 'fn/switch', name: 'Switch' },
            { url: 'fn/radio', name: 'Radio button' }
        ];

        this.sections = [
            {
                header: 'Guides',
                content: this.guides
            },
            {
                header: 'Components',
                content: this.components
            }
        ];
    }
}
