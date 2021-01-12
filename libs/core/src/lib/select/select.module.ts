import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { BusyIndicatorModule } from '../busy-indicator/busy-indicator.module';
import { ListModule } from '../list/list.module';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
    declarations: [SelectComponent, OptionComponent],
    exports: [SelectComponent, OptionComponent],
    imports: [
        CommonModule,
        OverlayModule,
        BusyIndicatorModule,
        ButtonModule,
        IconModule,
        ListModule,
        PopoverModule]

})
export class SelectModule {}
