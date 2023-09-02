import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SectionInterface } from '../core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../core-helpers/sections-toolbar/sections-toolbar.component';
import { ToolbarDocsComponent } from '../core-helpers/toolbar/toolbar.component';
import { DocumentationBaseComponent } from '../documentation-base.component';

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
