import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-token-docs',
    templateUrl: './token-docs.component.html',
    styleUrls: ['./token-docs.component.scss']
})
export class TokenDocsComponent implements OnInit {
    basicToken: ExampleFile[] = [
        {
            language: 'html',
            code: basicTokenH
        }
    ];

    ngOnInit() {}
}
