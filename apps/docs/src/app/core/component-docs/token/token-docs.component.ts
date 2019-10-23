import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as basicTokenH from '!raw-loader!./examples/token-example/token-example.component.html';

import * as tokenTsCode from '!raw-loader!./examples/token-example/token-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
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
            code: basicTokenH,
            secondFile: 'token-example',
            typescriptFileCode: tokenTsCode,
            fileName: 'token-example',
            component: 'TokenExampleComponent'
        }
    ];

    ngOnInit() { }
}
