import { Component } from '@angular/core';
import { sections } from './cdk-documentation-data';

@Component({
    selector: 'cdk-documentation',
    templateUrl: './cdk-documentation.component.html'
})
export class CDKDocumentationComponent {
    sections = sections;
}
