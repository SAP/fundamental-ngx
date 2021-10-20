import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperimentalTabsModule } from '@fundamental-ngx/fn/tabs';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ExperimentalRadioModule } from '@fundamental-ngx/fn/radio';
import { ExperimentalFormModule } from '@fundamental-ngx/fn/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/fn/switch';
import { ExperimentalButtonModule } from '@fundamental-ngx/fn/button';
import { ExperimentalSearchModule } from '@fundamental-ngx/fn/search';
import { ExperimentalSliderModule } from '@fundamental-ngx/fn/slider';
import { ExperimentalTagModule } from '@fundamental-ngx/fn/tag';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        ExperimentalTabsModule,
        ExperimentalCheckboxModule,
        ExperimentalRadioModule,
        ExperimentalFormModule,
        ExperimentalSwitchModule,
        ExperimentalButtonModule,
        ExperimentalSearchModule,
        ExperimentalSliderModule,
        ExperimentalTagModule
    ],
    providers: []
})
export class FundamentalNgxExperimentalModule {}
