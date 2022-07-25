import { NgModule } from '@angular/core';
import { FlexibleColumnLayoutModule, FlexibleLayoutConfig } from '@fundamental-ngx/core/flexible-column-layout';

const CUSTOM_FLEXIBLE_COLUMN_LAYOUT_CONFIG: FlexibleLayoutConfig = {
    layouts: {
        OneColumnStartFullScreen: { start: 100, mid: 0, end: 0 },
        OneColumnMidFullScreen: { start: 0, mid: 100, end: 0 },
        OneColumnEndFullScreen: { start: 0, mid: 0, end: 100 },
        TwoColumnsStartExpanded: { start: 50, mid: 50, end: 0 },
        TwoColumnsMidExpanded: { start: 33, mid: 67, end: 0 },
        TwoColumnsEndExpanded: { start: 0, mid: 33, end: 67 },
        ThreeColumnsMidExpanded: { start: 25, mid: 50, end: 25 },
        ThreeColumnsEndExpanded: { start: 25, mid: 25, end: 50 },
        ThreeColumnsStartMinimized: { start: 0, mid: 50, end: 50 },
        ThreeColumnsEndMinimized: { start: 50, mid: 50, end: 0 }
    }
};

@NgModule({
    imports: [FlexibleColumnLayoutModule.withConfig(CUSTOM_FLEXIBLE_COLUMN_LAYOUT_CONFIG)]
})
export class ExampleAppModule {}
