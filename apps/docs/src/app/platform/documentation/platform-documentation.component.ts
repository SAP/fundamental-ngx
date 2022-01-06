import { Component } from '@angular/core';
import { DocumentationBaseComponent } from '../../documentation/documentation-base.component';
import { guides, components, layouts, utilities, sections } from './platform-documentation-data';
@Component({
    selector: 'platform-documentation',
    styleUrls: ['./platform-documentation.component.scss'],
    templateUrl: './platform-documentation.component.html'
})
export class PlatformDocumentationComponent extends DocumentationBaseComponent {
    guides = guides;
    components = components;
    layouts = layouts;
    utilities = utilities;
    sections = sections;
}
