import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperimentalTabsModule } from '@fundamental-ngx/experimental/tabs';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/experimental/checkbox';
import { ExperimentalRadioModule } from '@fundamental-ngx/experimental/radio';
import { ExperimentalFormModule } from '@fundamental-ngx/experimental/form';
import { ExperimentalSwitchModule } from '@fundamental-ngx/experimental/switch';
import { ExperimentalButtonModule } from '@fundamental-ngx/experimental/button';
import { ExperimentalSearchModule } from '@fundamental-ngx/experimental/search';
import { ExperimentalSliderModule } from '@fundamental-ngx/experimental/slider';
import { ExperimentalTagModule } from '@fundamental-ngx/experimental/tag';

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
