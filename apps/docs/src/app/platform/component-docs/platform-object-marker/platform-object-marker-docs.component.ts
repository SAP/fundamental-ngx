import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import platformObjectMarkerExampleScss from '!./object-marker-example/object-marker-example.scss?raw';
import platformObjectMarkerDefaultExampleHtml from '!./object-marker-example/object-marker/object-marker-example.component.html?raw';
import platformObjectMarkerDefaultExampleTs from '!./object-marker-example/object-marker/object-marker-example.component?raw';
import platformObjectMarkerTextAndIconExampleHtml from '!./object-marker-example/object-marker-text-and-icon/object-marker-text-and-icon-example.component.html?raw';
import platformObjectMarkerTextAndIconExampleTs from '!./object-marker-example/object-marker-text-and-icon/object-marker-text-and-icon-example.component?raw';
import platformObjectMarkerTextAndIconClickableExampleHtml from '!./object-marker-example/object-marker-text-clickable/object-marker-text-clickable-example.component.html?raw';
import platformObjectMarkerTextAndIconClickableExampleTs from '!./object-marker-example/object-marker-text-clickable/object-marker-text-clickable-example.component?raw';
import platformObjectMarkerTextOnlyExampleHtml from '!./object-marker-example/object-marker-text-only-example/object-marker-text-only-example.component.html?raw';
import platformObjectMarkerTextOnlyExampleTs from '!./object-marker-example/object-marker-text-only-example/object-marker-text-only-example.component?raw';

@Component({
    selector: 'fdp-platform-object-marker',
    templateUrl: './platform-object-marker-docs.component.html'
})
export class PlatformObjectMarkerDocsComponent {
    platformDefaultObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: platformObjectMarkerDefaultExampleHtml,
            fileName: 'object-marker-example'
        },
        {
            language: 'typescript',
            code: platformObjectMarkerDefaultExampleTs,
            fileName: 'object-marker-example',
            component: 'ObjectMarkerExampleComponent',
            scssFileCode: platformObjectMarkerExampleScss
        }
    ];

    platformTextAndIconObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: platformObjectMarkerTextAndIconExampleHtml,
            fileName: 'object-marker-text-and-icon-example'
        },
        {
            language: 'typescript',
            code: platformObjectMarkerTextAndIconExampleTs,
            fileName: 'object-marker-text-and-icon-example',
            component: 'ObjectMarkerTextAndIconExampleComponent',
            scssFileCode: platformObjectMarkerExampleScss
        }
    ];

    platformTextOnlyObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: platformObjectMarkerTextOnlyExampleHtml,
            fileName: 'object-marker-text-only-example'
        },
        {
            language: 'typescript',
            code: platformObjectMarkerTextOnlyExampleTs,
            fileName: 'object-marker-text-only-example',
            component: 'ObjectMarkerTextOnlyExampleComponent',
            scssFileCode: platformObjectMarkerExampleScss
        }
    ];

    platformTextIconClickableObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: platformObjectMarkerTextAndIconClickableExampleHtml,
            fileName: 'object-marker-text-clickable-example'
        },
        {
            language: 'typescript',
            code: platformObjectMarkerTextAndIconClickableExampleTs,
            fileName: 'object-marker-text-clickable-example',
            component: 'ObjectMarkerIconAndTextClickableExampleComponent',
            scssFileCode: platformObjectMarkerExampleScss
        }
    ];
}
