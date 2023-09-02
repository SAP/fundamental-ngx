import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    DocumentationBaseComponent,
    SectionsToolbarComponent,
    ToolbarDocsComponent
} from '@fundamental-ngx/docs/shared';
import { sections } from './core-documentation-data';

@Component({
    selector: 'core-documentation',
    templateUrl: './core-documentation.component.html',
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
export class CoreDocumentationComponent {
    sections = sections;
}
