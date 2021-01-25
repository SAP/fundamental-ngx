import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { ComboboxComponent } from './combobox.component';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { ListModule } from '../list/list.module';
import { IconModule } from '../icon/icon.module';
import { AutoCompleteDirective } from './auto-complete.directive';

@NgModule({
    declarations: [ComboboxComponent, AutoCompleteDirective],
    imports: [
        CommonModule,
        PopoverModule,
        FormsModule,
        MenuModule,
        PipeModule,
        ButtonModule,
        InputGroupModule,
        ListModule,
        IconModule
    ],
    exports: [ComboboxComponent]
})
export class ComboboxModule {}
