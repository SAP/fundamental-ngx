import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CalendarLegendBasicExample } from './examples/basic-sample';
import { CalendarLegendHiddenItemsExample } from './examples/hidden-items';
import { CalendarLegendItemTypesExample } from './examples/item-types';

// // Import CLDR data for proper calendar functionality
import '@ui5/webcomponents-base/dist/features/LegacyDateFormats.js';
import '@ui5/webcomponents-localization/dist/Assets.js';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-calendar-legend-docs',
    templateUrl: './calendar-legend-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        CalendarLegendBasicExample,
        CalendarLegendHiddenItemsExample,
        CalendarLegendItemTypesExample
    ]
})
export class CalendarLegendDocs {
    basicCalendarLegendSamples = signal([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'CalendarLegendBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ]);

    calendarLegendItemTypesSamples = signal([
        {
            language: 'html',
            code: getAssetFromModuleAssets('item-types.html'),
            fileName: 'item-types'
        },
        {
            language: 'typescript',
            component: 'CalendarLegendItemTypesExample',
            code: getAssetFromModuleAssets('item-types.ts'),
            fileName: 'item-types'
        }
    ]);

    calendarLegendHiddenItemsSamples = signal([
        {
            language: 'html',
            code: getAssetFromModuleAssets('hidden-items.html'),
            fileName: 'hidden-items'
        },
        {
            language: 'typescript',
            component: 'CalendarLegendHiddenItemsExample',
            code: getAssetFromModuleAssets('hidden-items.ts'),
            fileName: 'hidden-items'
        }
    ]);
}
