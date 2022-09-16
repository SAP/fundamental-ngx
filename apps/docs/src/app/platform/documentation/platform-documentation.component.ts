import { Component } from '@angular/core';
import { sections } from './platform-documentation-data';

@Component({
    selector: 'platform-documentation',
    templateUrl: './platform-documentation.component.html'
})
export class PlatformDocumentationComponent {
    sections = sections;
}
