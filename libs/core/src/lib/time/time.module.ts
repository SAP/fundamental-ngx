import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { OnlyDigitsDirective } from '../utils/directives/only-digits/only-digits.directive';
import { FormModule } from '../form/form.module';
import { PipeModule } from '../utils/pipes/pipe.module';


@NgModule({
    declarations: [TimeComponent, OnlyDigitsDirective],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule, PipeModule],
    exports: [TimeComponent, OnlyDigitsDirective]
})
export class TimeModule {}
