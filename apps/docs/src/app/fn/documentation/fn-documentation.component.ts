import { Component, ViewEncapsulation } from '@angular/core';
import { components, guides, sections } from './fn-documentation-data';

@Component({
    selector: 'fn-documentation',
    styleUrls: ['./fn-documentation.component.scss'],
    templateUrl: './fn-documentation.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CoreDocumentationComponent {
    guides = guides;
    components = components;
    sections = sections;
}
