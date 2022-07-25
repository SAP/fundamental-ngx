import { Component } from '@angular/core';

import segmentedButtonDefaultExampleHtml from '!./examples/default/segmented-button-default-example.component.html?raw';
import segmentedButtonDefaultExampleTs from '!./examples/default/segmented-button-default-example.component.ts?raw';

import segmentedButtonTemplateDrivenExampleHtml from '!./examples/template-driven/segmented-button-template-driven-example.component.html?raw';
import segmentedButtonTemplateDrivenExampleTs from '!./examples/template-driven/segmented-button-template-driven-example.component.ts?raw';

import segmentedButtonReactiveFormExampleHtml from '!./examples/reactive-form/segmented-button-reactive-form-example.component.html?raw';
import segmentedButtonReactiveFormExampleTs from '!./examples/reactive-form/segmented-button-reactive-form-example.component.ts?raw';

import segmentedButtonMultipleValuesExampleHtml from '!./examples/multiple-values/segmented-button-multiple-values-example.component.html?raw';
import segmentedButtonMultipleValuesExampleTs from '!./examples/multiple-values/segmented-button-multiple-values-example.component.ts?raw';

import segmentedButtonCustomButtonExampleHtml from '!./examples/custom-button-component/custom-button-component-example.component.html?raw';
import segmentedButtonCustomButtonExampleTs from '!./examples/custom-button-component/custom-button-component-example.component?raw';
import segmentedButtonCustomButtonDirectiveExampleTs from '!./examples/custom-button-component/custom-button.directive?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-segmented-button',
    templateUrl: './segmented-button-docs.component.html'
})
export class SegmentedButtonDocsComponent {
    segmentedButtonDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-default-example',
            code: segmentedButtonDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: segmentedButtonDefaultExampleTs,
            fileName: 'segmented-button-default-example',
            component: 'SegmentedButtonDefaultExampleComponent'
        }
    ];

    segmentedButtonTemplateDrivenExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-template-driven-example',
            code: segmentedButtonTemplateDrivenExampleHtml
        },
        {
            language: 'typescript',
            code: segmentedButtonTemplateDrivenExampleTs,
            fileName: 'segmented-button-template-driven-example',
            component: 'SegmentedButtonTemplateDrivenExampleComponent'
        }
    ];

    segmentedButtonReactiveFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-reactive-form-example',
            code: segmentedButtonReactiveFormExampleHtml
        },
        {
            language: 'typescript',
            code: segmentedButtonReactiveFormExampleTs,
            fileName: 'segmented-button-reactive-form-example',
            component: 'SegmentedButtonReactiveFormExampleComponent'
        }
    ];

    segmentedButtonMultipleValuesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-multiple-values-example',
            code: segmentedButtonMultipleValuesExampleHtml
        },
        {
            language: 'typescript',
            code: segmentedButtonMultipleValuesExampleTs,
            fileName: 'segmented-button-multiple-values-example',
            component: 'SegmentedButtonMultipleValuesExampleComponent'
        }
    ];

    segmentedButtonCustomButtonExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-custom-button-example',
            code: segmentedButtonCustomButtonExampleHtml
        },
        {
            language: 'typescript',
            code: segmentedButtonCustomButtonExampleTs,
            fileName: 'segmented-button-custom-button-example',
            component: 'SegmentedButtonCustomButtonComponentExampleComponent'
        },
        {
            language: 'typescript',
            code: segmentedButtonCustomButtonDirectiveExampleTs,
            fileName: 'segmented-button-custom-button-directive-example',
            component: 'SegmentedButtonCustomButtonDirectiveExampleComponent'
        }
    ];
}
