import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DocumentationBaseComponent,
    SectionsToolbarComponent,
    ToolbarDocsComponent
} from '@fundamental-ngx/docs/shared';
import { sections } from './platform-documentation-data';

@Component({
    selector: 'platform-documentation',
    templateUrl: './platform-documentation.component.html',
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
export class PlatformDocumentationComponent {
    sections = sections;
}
