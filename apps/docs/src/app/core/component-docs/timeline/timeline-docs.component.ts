import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import timelineBasicDataExampleTs from '!./examples/timeline-basic-example/timeline-example-data.ts?raw';
import timelineBasicExampleTs from '!./examples/timeline-basic-example/timeline-basic-example.component.ts?raw';
import timelineBasicExampleHtml from '!./examples/timeline-basic-example/timeline-basic-example.component.html?raw';
import timelineTemplateExampleHtml from '!./examples/timeline-template-example.component.html?raw';
import timelineHorizontalAxisExampleTs from '!./examples/timeline-horizontal-axis-example.component.ts?raw';
import timelineHorizontalDoubleExampleTs from '!./examples/timeline-horizontal-double-side-example.component.ts?raw';
import timelineVerticalAxisExampleTs from '!./examples/timeline-vertical-double-side-example.component.ts?raw';

@Component({
    selector: 'fd-timeline-docs',
    templateUrl: './timeline-docs.component.html'
})
export class TimelineDocsComponent {
    timelineBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: timelineBasicExampleHtml,
            name: 'timeline-basic-example.html'
        },
        {
            language: 'typescript',
            code: timelineBasicExampleTs,
            name: 'timeline-basic-example.ts'
        },
        {
            language: 'typescript',
            code: timelineBasicDataExampleTs,
            name: 'timeline-basic-data-example.ts'
        }
    ];

    timelineHorizontalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: timelineTemplateExampleHtml,
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: timelineHorizontalAxisExampleTs,
            name: 'timeline-template-example.component.ts'
        },
        {
            language: 'typescript',
            code: timelineBasicDataExampleTs,
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];

    timelineHorizontalDoubleSideExample: ExampleFile[] = [
        {
            language: 'html',
            code: timelineTemplateExampleHtml,
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: timelineHorizontalDoubleExampleTs,
            name: 'timeline-horizontal-double-side-example.component.ts'
        },
        {
            language: 'typescript',
            code: timelineBasicDataExampleTs,
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];

    timelineVerticalAxisExample: ExampleFile[] = [
        {
            language: 'html',
            code: timelineTemplateExampleHtml,
            name: 'timeline-template-example.component.html'
        },
        {
            language: 'typescript',
            code: timelineVerticalAxisExampleTs,
            name: 'timeline-vertical-double-side-example.component.ts'
        },
        {
            language: 'typescript',
            code: timelineBasicDataExampleTs,
            name: 'timeline-horizontal-axis-example.component.ts'
        }
    ];
}
