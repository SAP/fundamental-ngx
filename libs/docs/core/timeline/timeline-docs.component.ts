import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TimelineLoadingExampleComponent } from './examples/loading/timeline-loading-example.component';
import { TimelineBasicExampleComponent } from './examples/timeline-basic-example/timeline-basic-example.component';
import { TimelineHorizontalAxisExampleComponent } from './examples/timeline-horizontal-axis-example.component';
import { TimelineHorizontalDoubleSideExampleComponent } from './examples/timeline-horizontal-double-side-example.component';
import { TimelineVerticalDoubleSideExampleComponent } from './examples/timeline-vertical-double-side-example.component';

const timelineBasicDataExampleTs = 'timeline-basic-example/timeline-example-data.ts';
const timelineBasicExampleTs = 'timeline-basic-example/timeline-basic-example.component.ts';
const timelineBasicExampleScss = 'timeline-basic-example/timeline-basic-example.component.scss';
const timelineBasicExampleHtml = 'timeline-basic-example/timeline-basic-example.component.html';
const timelineTemplateExampleHtml = 'timeline-template-example.component.html';
const timelineHorizontalAxisExampleTs = 'timeline-horizontal-axis-example.component.ts';
const timelineHorizontalDoubleExampleTs = 'timeline-horizontal-double-side-example.component.ts';
const timelineVerticalAxisExampleTs = 'timeline-vertical-double-side-example.component.ts';
const timelineLoadingExampleHtml = 'loading/timeline-loading-example.component.html';
const timelineLoadingExampleTs = 'loading/timeline-loading-example.component.ts';

@Component({
    selector: 'fd-timeline-docs',
    templateUrl: './timeline-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TimelineBasicExampleComponent,
        CodeExampleComponent,
        TimelineHorizontalAxisExampleComponent,
        TimelineHorizontalDoubleSideExampleComponent,
        TimelineVerticalDoubleSideExampleComponent,
        TimelineLoadingExampleComponent
    ]
})
export class TimelineDocsComponent {
    timelineBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineBasicExampleHtml),
            fileName: 'timeline-basic-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(timelineBasicExampleScss),
            fileName: 'timeline-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicExampleTs),
            main: true,
            component: 'TimelineBasicExampleComponent',
            fileName: 'timeline-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            pure: true,
            fileName: 'timeline-example-data'
        }
    ];

    timelineHorizontalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            fileName: 'timeline-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineHorizontalAxisExampleTs),
            main: true,
            selector: 'timeline-horizontal-axis',
            component: 'TimelineHorizontalAxisExampleComponent',
            fileName: 'timeline-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            pure: true,
            path: 'timeline-basic-example',
            fileName: 'timeline-example-data'
        }
    ];

    timelineHorizontalDoubleSideExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            fileName: 'timeline-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineHorizontalDoubleExampleTs),
            component: 'TimelineHorizontalDoubleSideExampleComponent',
            selector: 'timeline-horizontal-double-side-example',
            fileName: 'timeline-horizontal-double-side-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            pure: true,
            path: 'timeline-basic-example',
            fileName: 'timeline-example-data'
        }
    ];

    timelineVerticalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineTemplateExampleHtml),
            fileName: 'timeline-template-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineVerticalAxisExampleTs),
            main: true,
            selector: 'timeline-vertical-double-side',
            component: 'TimelineVerticalDoubleSideExampleComponent',
            fileName: 'timeline-vertical-double-side-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineBasicDataExampleTs),
            pure: true,
            path: 'timeline-basic-example',
            fileName: 'timeline-example-data'
        }
    ];

    timelineLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timelineLoadingExampleHtml),
            fileName: 'timeline-loading-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timelineLoadingExampleTs),
            main: true,
            component: 'TimelineLoadingExampleComponent',
            fileName: 'timeline-loading-example'
        }
    ];
}
