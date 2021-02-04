import { Component } from '@angular/core';

import * as segmentedDefaultExample from '!raw-loader!./examples/segmented-button-default-example.component.html';
import * as segmentedDefaultExampleTs from '!raw-loader!./examples/segmented-button-default-example.component.ts';
import * as segmentedToggleExample from '!raw-loader!./examples/segmented-button-toggle-example.component.html';
import * as segmentedToggleExampleTs from '!raw-loader!./examples/segmented-button-toggle-example.component.ts';
import * as segmentedButtonFormTs from '!raw-loader!./examples/segmented-button-form-example/segmented-button-form-example.component.ts';
import * as segmentedButtonFormHtml from '!raw-loader!./examples/segmented-button-form-example/segmented-button-form-example.component.html';
import * as segmentedButtonCustomTs from '!raw-loader!./examples/segmented-button-complex-example/segmented-button-complex-example.component.ts';
import * as segmentedButtonCustomHtml from '!raw-loader!./examples/segmented-button-complex-example/segmented-button-complex-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-segmented-button',
    templateUrl: './segmented-button-docs.component.html'
})
export class SegmentedButtonDocsComponent {
    defaultToggleHtml: ExampleFile[] = [
        {
            language: 'html',
            code: segmentedToggleExample,
            fileName: 'segmented-button-toggle-example'
        },
        {
            component: 'SegmentedButtonToggleExampleComponent',
            language: 'typescript',
            code: segmentedToggleExampleTs,
            fileName: 'segmented-button-toggle-example'
        }
    ];

    defaultSizeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: segmentedDefaultExample,
            fileName: 'segmented-button-default-example'
        },
        {
            component: 'SegmentedButtonDefaultExampleComponent',
            language: 'typescript',
            code: segmentedDefaultExampleTs,
            fileName: 'segmented-button-default-example'
        }
    ];

    formExample: ExampleFile[] = [
        {
            language: 'html',
            code: segmentedButtonFormHtml,
            fileName: 'segmented-button-form-example'
        },
        {
            component: 'SegmentedButtonFormExampleComponent',
            language: 'typescript',
            code: segmentedButtonFormTs,
            fileName: 'segmented-button-form-example'
        }
    ];

    complexExample: ExampleFile[] = [
        {
            language: 'html',
            code: segmentedButtonCustomHtml,
            fileName: 'segmented-button-complex-example'
        },
        {
            component: 'SegmentedButtonComplexExampleComponent',
            language: 'typescript',
            code: segmentedButtonCustomTs,
            fileName: 'segmented-button-complex-example'
        }
    ];
}
