import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '@fundamental-ngx/fn/tabs';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { RadioButtonModule } from '@fundamental-ngx/fn/radio';
import { FormModule } from '@fundamental-ngx/fn/form';
import { SwitchModule } from '@fundamental-ngx/fn/switch';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { SearchModule } from '@fundamental-ngx/fn/search';
import { SliderModule } from '@fundamental-ngx/fn/slider';
import { TagModule } from '@fundamental-ngx/fn/tag';
import { ProgressBarModule } from '@fundamental-ngx/fn/progress-bar';
import { SegmentedButtonModule } from '@fundamental-ngx/fn/segmented-button';
import { UtilsModule } from '@fundamental-ngx/fn/utils';
import { CdkModule } from '@fundamental-ngx/fn/cdk';
import { GenericTagModule } from '@fundamental-ngx/fn/generic-tag';
import { ObjectStatusModule } from '@fundamental-ngx/fn/object-status';
import { AvatarModule } from '@fundamental-ngx/fn/avatar';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        TabsModule,
        CheckboxModule,
        RadioButtonModule,
        FormModule,
        SwitchModule,
        ButtonModule,
        SearchModule,
        SliderModule,
        TagModule,
        AvatarModule,
        ProgressBarModule,
        GenericTagModule,
        SegmentedButtonModule,
        UtilsModule,
        CdkModule,
        ObjectStatusModule
    ],
    providers: []
})
export class FundamentalNgxFnModule {}
