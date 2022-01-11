import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';
import { guides, components, layouts, utilities, adapters, sections } from './core-documentation-data';

@Component({
    selector: 'core-documentation',
    styleUrls: ['./core-documentation.component.scss'],
    templateUrl: './core-documentation.component.html'
})
export class CoreDocumentationComponent extends DocumentationBaseComponent {
    guides = guides;
    components = components;
    layouts = layouts;
    utilities = utilities;
    adapters = adapters;
    sections = sections;
}
