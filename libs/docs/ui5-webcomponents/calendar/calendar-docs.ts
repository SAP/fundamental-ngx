import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CalendarExample } from './examples/calendar-sample';

// Ensure CLDR data is available for all calendar components
import '@ui5/webcomponents-base/dist/features/LegacyDateFormats.js';
import '@ui5/webcomponents-localization/dist/Assets.js';
import '@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js';

const basicSampleHtml = 'calendar-sample.html';
const basicSampleTs = 'calendar-sample.ts';

@Component({
    selector: 'ui5-calendar-docs',
    templateUrl: './calendar-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        CalendarExample
    ]
})
export class CalendarDocs {
    // Using Angular 20 signal for reactive example files
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'calendar-example'
        },
        {
            language: 'typescript',
            component: 'CalendarExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'calendar-example'
        }
    ]);

    // Computed property for template binding (Angular 20 feature)
    readonly examples = computed(() => this.exampleFiles());
}
