import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as standardH from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.html';
import * as standardT from '!raw-loader!./examples/scroll-spy-example/scroll-spy-example.component.ts';

import * as customH from '!raw-loader!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.html';
import * as customT from '!raw-loader!./examples/scroll-spy-custom-example/scroll-spy-custom-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-scroll-spy-docs',
    templateUrl: './scroll-spy-docs.component.html',
    styleUrls: ['./scroll-spy-docs.component.scss']
})
export class ScrollSpyDocsComponent implements OnInit {
    scrollSpy: ExampleFile[] = [
        {
            language: 'html',
            code: standardH
        },
        {
            language: 'typescript',
            code: standardT
        }
    ];

    scrollSpyCustom: ExampleFile[] = [
        {
            language: 'html',
            code: customH
        },
        {
            language: 'typescript',
            code: customT
        }
    ];

    ngOnInit() {}
}
