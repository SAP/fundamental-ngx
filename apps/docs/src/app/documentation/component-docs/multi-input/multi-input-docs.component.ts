import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as simpleH from '!raw-loader!./examples/multi-input-example/multi-input-example.component.html';
import * as simpleT from '!raw-loader!./examples/multi-input-example/multi-input-example.component.ts';

import * as displayH from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.html';
import * as displayT from '!raw-loader!./examples/multi-input-displaywith-example/multi-input-displaywith-example.component.ts';

import * as filterH from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.html';
import * as filterT from '!raw-loader!./examples/multi-input-filter-example/multi-input-filter-example.component.ts';

import * as asyncH from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.html';
import * as asyncT from '!raw-loader!./examples/multi-input-async-example/multi-input-async-example.component.ts';

import * as formH from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.html';
import * as formT from '!raw-loader!./examples/multi-input-form-example/multi-input-form-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-multi-input-docs',
    templateUrl: './multi-input-docs.component.html',
    styleUrls: ['./multi-input-docs.component.scss']
})
export class MultiInputDocsComponent implements OnInit {
    multiInputBasic: ExampleFile[] = [
        {
            language: 'html',
            code: simpleH
        },
        {
            language: 'typescript',
            code: simpleT
        }
    ];

    display: ExampleFile[] = [
        {
            language: 'html',
            code: displayH
        },
        {
            language: 'typescript',
            code: displayT
        }
    ];

    filter: ExampleFile[] = [
        {
            language: 'html',
            code: filterH
        },
        {
            language: 'typescript',
            code: filterT
        }
    ];

    async: ExampleFile[] = [
        {
            language: 'html',
            code: asyncH
        },
        {
            language: 'typescript',
            code: asyncT
        }
    ];

    form: ExampleFile[] = [
        {
            language: 'html',
            code: formH
        },
        {
            language: 'typescript',
            code: formT
        }
    ];

    ngOnInit() {}
}
