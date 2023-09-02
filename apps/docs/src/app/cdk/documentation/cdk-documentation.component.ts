import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DocumentationBaseComponent,
    SectionsToolbarComponent,
    ToolbarDocsComponent
} from '@fundamental-ngx/docs/shared';
import { sections } from './cdk-documentation-data';

@Component({
    selector: 'cdk-documentation',
    templateUrl: './cdk-documentation.component.html',
    standalone: true,
    imports: [
        DocumentationBaseComponent,
        ToolbarDocsComponent,
        SectionsToolbarComponent,
        RouterOutlet,
        NgIf,
        CdkScrollable
    ]
})
export class CDKDocumentationComponent {
    sections = sections;
}
