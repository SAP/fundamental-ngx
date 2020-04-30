import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '../token/token.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { FormModule } from '../form/form.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ListModule } from '../list/list.module';
import { LinkModule } from '../link/link.module';
import { MultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { BarModule, ButtonModule } from '../..';

@NgModule({
    declarations: [MultiInputComponent, MultiInputMobileComponent],
    imports: [
        CommonModule,
        TokenModule,
        FormsModule,
        MenuModule,
        ListModule,
        PopoverModule,
        PipeModule,
        InputGroupModule,
        FormModule,
        CheckboxModule,
        LinkModule,
        BarModule,
        ButtonModule
    ],
    exports: [MultiInputComponent]
})
export class MultiInputModule {}
