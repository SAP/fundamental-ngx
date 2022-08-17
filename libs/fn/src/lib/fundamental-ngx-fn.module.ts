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
import { ProgressBarModule } from '@fundamental-ngx/fn/progress-bar';
import { SegmentedButtonModule } from '@fundamental-ngx/fn/segmented-button';
import { UtilsModule } from '@fundamental-ngx/fn/utils';
import { CdkModule } from '@fundamental-ngx/fn/cdk';
import { GenericTagModule } from '@fundamental-ngx/fn/generic-tag';
import { ListModule } from '@fundamental-ngx/fn/list';
import { ObjectStatusModule } from '@fundamental-ngx/fn/object-status';
import { AvatarModule } from '@fundamental-ngx/fn/avatar';
import { InfoLabelModule } from '@fundamental-ngx/fn/info-label';
import { MessageStripModule } from '@fundamental-ngx/fn/message-strip';
import { InputModule } from '@fundamental-ngx/fn/input';
import { MessageToastModule } from '@fundamental-ngx/fn/message-toast';
import { NotificationModule } from '@fundamental-ngx/fn/notification';

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
        AvatarModule,
        ProgressBarModule,
        GenericTagModule,
        SegmentedButtonModule,
        UtilsModule,
        CdkModule,
        MessageStripModule,
        ObjectStatusModule,
        InfoLabelModule,
        ListModule,
        InputModule,
        MessageToastModule,
        NotificationModule
    ],
    providers: []
})
export class FundamentalNgxFnModule {}
