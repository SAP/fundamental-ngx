import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const timelineBasicDataExampleTs = 'timeline-basic-example/timeline-example-data.ts';
const timelineBasicExampleTs = 'timeline-basic-example/timeline-basic-example.component.ts';
const timelineBasicExampleHtml = 'timeline-basic-example/timeline-basic-example.component.html';
const timelineTemplateExampleHtml = 'timeline-template-example.component.html';
const timelineHorizontalAxisExampleTs = 'timeline-horizontal-axis-example.component.ts';
const timelineHorizontalDoubleExampleTs = 'timeline-horizontal-double-side-example.component.ts';
const timelineVerticalAxisExampleTs = 'timeline-vertical-double-side-example.component.ts';
const timelineLoadingExampleHtml = 'loading/timeline-loading-example.component.html';
const timelineLoadingExampleTs = 'loading/timeline-loading-example.component.ts';

@Component({
    selector: 'fd-timeline-docs',
    templateUrl: './timeline-docs.component.html'
})
export class TimelineDocsComponent {
    timelineBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineBasicExampleHtml),
            name: 'timeline-basic-example.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicExampleTs),
            name: 'timeline-basic-example.ts'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            name: 'timeline-basic-data-example.ts'
        }
    ];

    timelineHorizontalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineHorizontalAxisExampleTs),
            name: 'timeline-template-example.component.ts'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];

    timelineHorizontalDoubleSideExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineHorizontalDoubleExampleTs),
            name: 'timeline-horizontal-double-side-example.component.ts'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];

    timelineVerticalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineVerticalAxisExampleTs),
            name: 'timeline-vertical-double-side-example.component.ts'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];

    timelineLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineLoadingExampleHtml),
            name: 'timeline-loading-example.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineLoadingExampleTs),
            name: 'timeline-loading-example.ts'
        }
    ];
}
