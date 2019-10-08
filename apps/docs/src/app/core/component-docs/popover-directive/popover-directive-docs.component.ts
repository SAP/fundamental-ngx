import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as simpleH from '!raw-loader!./examples/popover-directive-example/popover-directive-example.component.html';
import * as simpleTs from '!raw-loader!./examples/popover-directive-example/popover-directive-example.component.ts';
import * as triggerH from '!raw-loader!./examples/popover-triggers/popover-triggers.component.html';
import * as triggerTs from '!raw-loader!./examples/popover-triggers/popover-triggers.component.ts';
import * as programH from '!raw-loader!./examples/popover-programmatic/popover-programmatic.component.html';
import * as programTs from '!raw-loader!./examples/popover-programmatic/popover-programmatic.component.ts';
import * as fillH from '!raw-loader!./examples/popover-fill/popover-fill.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as fillTs from '!raw-loader!./examples/popover-fill/popover-fill.component.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-popover-directive',
    templateUrl: './popover-directive-docs.component.html',
    styleUrls: ['./popover-directive-docs.component.scss']
})
export class PopoverDirectiveDocsComponent implements OnInit {
    simplePopover: ExampleFile[] = [
        {
            language: 'html',
            code: simpleH,
            fileName: 'popover-directive-example',
            secondFile: 'popover-directive-example',
            typescriptFileCode: simpleTs
        }
    ];

    triggerPopover: ExampleFile[] = [
        {
            language: 'html',
            code: triggerH,
            fileName: 'popover-triggers',
            secondFile: 'popover-triggers',
            typescriptFileCode: triggerTs
        }
    ];

    programmaticPopover: ExampleFile[] = [
        {
            language: 'html',
            code: programH,
            fileName: 'popover-programmatic',
            secondFile: 'popover-programmatic',
            typescriptFileCode: programTs
        }
    ];

    fillControlPopover: ExampleFile[] = [
        {
            language: 'html',
            code: fillH,
            fileName: 'popover-fill',
            secondFile: 'popover-fill',
            typescriptFileCode: fillTs
        }
    ];

    ngOnInit() { }
}
