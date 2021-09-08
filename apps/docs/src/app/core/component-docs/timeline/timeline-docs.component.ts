import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as timelineBasicExampleTs from '!raw-loader!./examples/timeline-basic-example/timeline-basic-example.component.ts';
import * as timelineBasicDataExampleTs from '!raw-loader!./examples/timeline-basic-example/timeline-example-data.ts';
import * as timelineBasicExampleHtml from '!raw-loader!./examples/timeline-basic-example/timeline-basic-example.component.html';

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
            name: 'timeline-basic-example.ts',
            component: 'TimelineBasicExampleComponent'
        },
        {
            language: 'typescript',
            code: timelineBasicDataExampleTs,
            name: 'timeline-basic-data-example.ts'
        }
    ];
}
