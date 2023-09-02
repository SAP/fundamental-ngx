import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    DocumentationBaseComponent,
    SectionInterface,
    SectionsToolbarComponent,
    ToolbarDocsComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './library-doc-shell-page.component.html',
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
export class LibraryDocShellPageComponent {
    sections: SectionInterface[] = inject(ActivatedRoute).snapshot.data.sections;
}
