import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TimelineExample } from './examples/timeline-sample';

// Import Timeline web component dependencies
import '@ui5/webcomponents-fiori/dist/Timeline.js';
import '@ui5/webcomponents-fiori/dist/TimelineItem.js';

const basicSampleHtml = 'timeline-sample.html';
const basicSampleTs = 'timeline-sample.ts';

@Component({
    selector: 'ui5-timeline-docs',
    templateUrl: './timeline-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TimelineExample
    ]
})
export class TimelineDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'timeline-example'
        },
        {
            language: 'typescript',
            component: 'TimelineExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'timeline-example'
        }
    ]);

    // Computed property for template binding (Angular 20 feature)
    readonly examples = computed(() => this.exampleFiles());
}
