import { Component, ViewChildren, ElementRef, QueryList, OnInit, AfterViewInit } from '@angular/core';

import * as backButtonExample from '!raw-loader!./examples/action-bar-back-example.component.html';
import * as titleTruncationExample from '!raw-loader!./examples/action-bar-long-string-title-truncation-example.component.html';
import * as contextualMenuExample from '!raw-loader!./examples/action-bar-contextual-menu-example.component.html';
import * as mobileExample from '!raw-loader!./examples/action-bar-mobile-example.component.html';
import * as actionBarTsCode from '!raw-loader!./examples/action-bar-examples.component.ts';
import * as noBackButtonExample from '!raw-loader!./examples/action-bar-no-back-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss']
})
export class ActionBarDocsComponent implements OnInit {
    backButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: backButtonExample,
            fileName: 'action-bar-back',
            secondFile: 'action-bar-examples',
            typescriptFileCode: actionBarTsCode,
            component: 'ActionBarBackExampleComponent'
        }
    ];

    titleTruncationExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleTruncationExample,
            fileName: 'action-bar-long-string-title-truncation',
            secondFile: 'action-bar-examples',
            typescriptFileCode: actionBarTsCode,
            component: 'ActionBarLongStringTitleTruncationExampleComponent'
        }
    ];

    noBackButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: noBackButtonExample,
            fileName: 'action-bar-no-back',
            secondFile: 'action-bar-examples',
            typescriptFileCode: actionBarTsCode,
            component: 'ActionBarNoBackExampleComponent'
        }
    ];

    actionsContextualMenuHtml: ExampleFile[] = [
        {
            language: 'html',
            code: contextualMenuExample,
            fileName: 'action-bar-contextual-menu',
            secondFile: 'action-bar-examples',
            typescriptFileCode: actionBarTsCode,
            component: 'ActionBarContextualMenuExampleComponent'
        }
    ];

    mobileViewHtml: ExampleFile[] = [
        {
            language: 'html',
            code: mobileExample,
            fileName: 'action-bar-mobile.',
            secondFile: 'action-bar-examples',
            typescriptFileCode: actionBarTsCode,
            component: 'ActionBarMobileExampleComponent'
        }
    ];

    ngOnInit() { }
}
