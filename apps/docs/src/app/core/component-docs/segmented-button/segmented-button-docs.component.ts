import { Component } from '@angular/core';

import segmentedDefaultExample from '!./examples/segmented-button-default-example.component.html?raw';
import segmentedDefaultExampleTs from '!./examples/segmented-button-default-example.component.ts?raw';
import segmentedToggleExample from '!./examples/segmented-button-toggle-example.component.html?raw';
import segmentedToggleExampleTs from '!./examples/segmented-button-toggle-example.component.ts?raw';
import segmentedButtonFormTs from '!./examples/segmented-button-form-example/segmented-button-form-example.component.ts?raw';
import segmentedButtonFormHtml from '!./examples/segmented-button-form-example/segmented-button-form-example.component.html?raw';
import segmentedButtonCustomTs from '!./examples/segmented-button-complex-example/segmented-button-complex-example.component.ts?raw';
import segmentedButtonCustomHtml from '!./examples/segmented-button-complex-example/segmented-button-complex-example.component.html?raw';
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
