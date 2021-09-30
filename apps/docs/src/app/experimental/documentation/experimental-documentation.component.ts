import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';

@Component({
    selector: 'experimental-documentation',
    styleUrls: ['./experimental-documentation.component.scss'],
    templateUrl: './experimental-documentation.component.html'
})
export class CoreDocumentationComponent extends DocumentationBaseComponent {
    constructor() {
        super();

        this.guides = [
            { url: 'experimental/home', name: 'Home' },
            { url: 'experimental/new-component', name: 'New Component' }
        ];

        this.components = [
            { url: 'experimental/button', name: 'Button' },
            { url: 'experimental/tabs', name: 'Tabs' },
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
