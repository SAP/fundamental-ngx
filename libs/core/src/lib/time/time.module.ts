import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { OnlyDigitsDirective } from '../utils/directives/only-digits.directive';


@NgModule({
    declarations: [TimeComponent, OnlyDigitsDirective],
    imports: [CommonModule, FormsModule],
    exports: [TimeComponent, OnlyDigitsDirective]
})
export class TimeModule {}
