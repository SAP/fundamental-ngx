import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as loadingSpinnerHtml from '!raw-loader!./examples/loading-spinner-example.component.html';
import * as loadingSpinnerContainerHtml from '!raw-loader!./examples/loading-spinner-container-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-loading-spinner-docs',
    templateUrl: './loading-spinner-docs.component.html',
    styleUrls: ['./loading-spinner-docs.component.scss']
})
export class LoadingSpinnerDocsComponent implements OnInit {
    loadingSpinnerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerHtml
        }
    ];

    loadingSpinnerContainerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerContainerHtml
        }
    ];

    ngOnInit() {}
}
