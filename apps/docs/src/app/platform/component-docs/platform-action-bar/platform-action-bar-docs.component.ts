import { Component, OnInit } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as simpleActionBarHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.html';
import * as simpleActionBarTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.ts';
import * as actionBarBackButtonTS from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.ts';
import * as actionBarDescriptionTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-description-example.component.ts';
import * as backButtonExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.html';
import * as descriptionExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-description-example.component.html';
import * as longPageTitleExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.html';
import * as longPageTitleExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.ts';
import * as editActionBarTitleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-edit-title-example.component.html';
import * as editActionBarTitleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-edit-title-example.component.ts';
import * as contextualMenuExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.html';
import * as contextualMenuExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.ts';
import * as positiveNegativeExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.html';
import * as positiveNegativeExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.ts';
import * as actionbarcss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.scss';
@Component({
    selector: 'app-platform-action-bar',
    templateUrl: './platform-action-bar-docs.component.html',
    styleUrls: ['./platform-action-bar-docs.component.scss']
})
export class PlatformActionBarDocsComponent implements OnInit {
    constructor() {}
    simpleActionBar: ExampleFile[] = [
        {
            language: 'html',
            code: simpleActionBarHtml,
            fileName: 'platform-action-bar-simple-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarExamplesComponent',
            code: simpleActionBarTs,
            fileName: 'platform-action-bar-simple-example',
            scssFileCode: actionbarcss
        }
    ];

    backButtonExample: ExampleFile[] = [

        {
            language: 'html',
            code: backButtonExampleHtml,
            fileName: 'platform-action-bar-with-back-button-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarWithBackButtonExampleComponent',
            code: actionBarBackButtonTS,
            fileName: 'platform-action-bar-with-back-button-example'
        }
    ];

    descriptionExample: ExampleFile[] = [
        {
            language: 'html',
            code: descriptionExampleHtml,
            fileName: 'platform-action-bar-with-description-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarWithDescriptionExampleComponent',
            code: actionBarDescriptionTs,
            fileName: 'platform-action-bar-with-description-example'
        }

    ];

    longPageTitleExample: ExampleFile[] = [
        {
            language: 'html',
            code: longPageTitleExampleHtml,
            fileName: 'platform-action-bar-with-long-title-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarWithLongPageTitleExampleComponent',
            code: longPageTitleExampleTs,
            fileName: 'platform-action-bar-with-long-title-example',
            scssFileCode: actionbarcss
        }
    ];

    editActionBarTitle: ExampleFile[] = [
        {
            language: 'html',
            code: editActionBarTitleHtml,
            fileName: 'platform-action-bar-edit-title-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarEditTitleExampleComponent',
            code: editActionBarTitleTs,
            fileName: 'platform-action-bar-edit-title-example',
            scssFileCode: actionbarcss
        }
    ];

    contextualMenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: contextualMenuExampleHtml,
            fileName: 'platform-action-bar-contextual-menu-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarWithContextualMenuExampleComponent',
            code: contextualMenuExampleTs,
            fileName: 'platform-action-bar-contextual-menu-example',
            scssFileCode: actionbarcss
        }
    ];
    positiveNegativeExample: ExampleFile[] = [
        {
            language: 'html',
            code: positiveNegativeExampleHtml,
            fileName: 'platform-action-bar-positive-and-negative-action-example'
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarWithPositiveNegativeActionsExampleComponent',
            code: positiveNegativeExampleTs,
            fileName: 'platform-action-bar-positive-and-negative-action-example',
            scssFileCode: actionbarcss

        }
    ];

    ngOnInit() {}
}
