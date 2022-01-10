import { Component } from '@angular/core';

import backButtonExample from '!./examples/action-bar-back-example.component.html?raw';
import backButtonExampleTs from '!./examples/action-bar-back-example.component.ts?raw';
import titleTruncationExample from '!./examples/action-bar-long-string-title-truncation-example.component.html?raw';
import titleTruncationExampleTs from '!./examples/action-bar-long-string-title-truncation-example.component.ts?raw';
import contextualMenuExample from '!./examples/action-bar-contextual-menu-example.component.html?raw';
import mobileExample from '!./examples/action-bar-mobile-example.component.html?raw';
import mobileExampleTs from '!./examples/action-bar-mobile-example.component.ts?raw';
import noBackButtonExample from '!./examples/action-bar-no-back-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss']
})
export class ActionBarDocsComponent {
    backButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: backButtonExample,
            fileName: 'action-bar-back-example'
        },
        {
            language: 'typescript',
            code: backButtonExampleTs,
            fileName: 'action-bar-back-example',
            component: 'ActionBarBackExampleComponent'
        }
    ];

    titleTruncationExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleTruncationExample,
            fileName: 'action-bar-long-string-title-truncation-example'
        },
        {
            language: 'typescript',
            code: titleTruncationExampleTs,
            fileName: 'action-bar-long-string-title-truncation-example',
            component: 'ActionBarLongStringTitleTruncationExampleComponent'
        }
    ];

    noBackButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: noBackButtonExample,
            fileName: 'action-bar-no-back'
        }
    ];

    actionsContextualMenuHtml: ExampleFile[] = [
        {
            language: 'html',
            code: contextualMenuExample,
            fileName: 'action-bar-contextual-menu'
        }
    ];

    mobileViewHtml: ExampleFile[] = [
        {
            language: 'html',
            code: mobileExample,
            fileName: 'action-bar-mobile-example'
        },
        {
            language: 'typescript',
            code: mobileExampleTs,
            fileName: 'action-bar-mobile-example',
            component: 'ActionBarMobileExampleComponent'
        }
    ];
}
