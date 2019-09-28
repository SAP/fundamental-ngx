import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { OnlyDigitsDirective } from '../utils/directives/only-digits.directive';
import { FormModule } from '../form/form.module';


@NgModule({
    declarations: [TimeComponent, OnlyDigitsDirective],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule],
    exports: [TimeComponent, OnlyDigitsDirective]
})
export class TimeModule {}
