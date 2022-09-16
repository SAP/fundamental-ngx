import { Component } from '@angular/core';

const segmentedButtonDefaultExampleHtml = 'default/segmented-button-default-example.component.html';
const segmentedButtonDefaultExampleTs = 'default/segmented-button-default-example.component.ts';

const segmentedButtonTemplateDrivenExampleHtml =
    'template-driven/segmented-button-template-driven-example.component.html';
const segmentedButtonTemplateDrivenExampleTs = 'template-driven/segmented-button-template-driven-example.component.ts';

const segmentedButtonReactiveFormExampleHtml = 'reactive-form/segmented-button-reactive-form-example.component.html';
const segmentedButtonReactiveFormExampleTs = 'reactive-form/segmented-button-reactive-form-example.component.ts';

const segmentedButtonMultipleValuesExampleHtml =
    'multiple-values/segmented-button-multiple-values-example.component.html';
const segmentedButtonMultipleValuesExampleTs = 'multiple-values/segmented-button-multiple-values-example.component.ts';

const segmentedButtonCustomButtonExampleHtml = 'custom-button-component/custom-button-component-example.component.html';
const segmentedButtonCustomButtonExampleTs = 'custom-button-component/custom-button-component-example.component.ts';
const segmentedButtonCustomButtonDirectiveExampleTs = 'custom-button-component/custom-button.directive.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-segmented-button',
    templateUrl: './segmented-button-docs.component.html'
})
export class SegmentedButtonDocsComponent {
    segmentedButtonDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-default-example',
            code: getAssetFromModuleAssets(segmentedButtonDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonDefaultExampleTs),
            fileName: 'segmented-button-default-example',
            component: 'SegmentedButtonDefaultExampleComponent'
        }
    ];

    segmentedButtonTemplateDrivenExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-template-driven-example',
            code: getAssetFromModuleAssets(segmentedButtonTemplateDrivenExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonTemplateDrivenExampleTs),
            fileName: 'segmented-button-template-driven-example',
            component: 'SegmentedButtonTemplateDrivenExampleComponent'
        }
    ];

    segmentedButtonReactiveFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-reactive-form-example',
            code: getAssetFromModuleAssets(segmentedButtonReactiveFormExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonReactiveFormExampleTs),
            fileName: 'segmented-button-reactive-form-example',
            component: 'SegmentedButtonReactiveFormExampleComponent'
        }
    ];

    segmentedButtonMultipleValuesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-multiple-values-example',
            code: getAssetFromModuleAssets(segmentedButtonMultipleValuesExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonMultipleValuesExampleTs),
            fileName: 'segmented-button-multiple-values-example',
            component: 'SegmentedButtonMultipleValuesExampleComponent'
        }
    ];

    segmentedButtonCustomButtonExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'segmented-button-custom-button-example',
            code: getAssetFromModuleAssets(segmentedButtonCustomButtonExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonCustomButtonExampleTs),
            fileName: 'segmented-button-custom-button-example',
            component: 'SegmentedButtonCustomButtonComponentExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(segmentedButtonCustomButtonDirectiveExampleTs),
            fileName: 'segmented-button-custom-button-directive-example',
            component: 'SegmentedButtonCustomButtonDirectiveExampleComponent'
        }
    ];
}
