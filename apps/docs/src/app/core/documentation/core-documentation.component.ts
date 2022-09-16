import { Component } from '@angular/core';
import { sections } from './core-documentation-data';

@Component({
    selector: 'core-documentation',
    templateUrl: './core-documentation.component.html'
})
export class CoreDocumentationComponent {
    sections = sections;
}
