import { Component } from '@angular/core';
import { sections } from './cx-documentation-data';

@Component({
    selector: 'cx-documentation',
    templateUrl: './cx-documentation.component.html'
})
export class CxDocumentationComponent {
    sections = sections;
}
