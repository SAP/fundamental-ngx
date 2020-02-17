import { Component, OnInit } from '@angular/core';

import * as backButtonExample from '!raw-loader!./examples/action-bar-back-example.component.html';
import * as titleTruncationExample from '!raw-loader!./examples/action-bar-long-string-title-truncation-example.component.html';
import * as contextualMenuExample from '!raw-loader!./examples/action-bar-contextual-menu-example.component.html';
import * as mobileExample from '!raw-loader!./examples/action-bar-mobile-example.component.html';
import * as noBackButtonExample from '!raw-loader!./examples/action-bar-no-back-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

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
        }
    ];

    titleTruncationExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleTruncationExample,
            fileName: 'action-bar-long-string-title-truncation',
        }
    ];

    noBackButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: noBackButtonExample,
            fileName: 'action-bar-no-back',
        }
    ];

    actionsContextualMenuHtml: ExampleFile[] = [
        {
            language: 'html',
            code: contextualMenuExample,
            fileName: 'action-bar-contextual-menu',
        }
    ];

    mobileViewHtml: ExampleFile[] = [
        {
            language: 'html',
            code: mobileExample,
            fileName: 'action-bar-mobile',
        }
    ];

    ngOnInit() { }
}
