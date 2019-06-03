import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';


@NgModule({
    declarations: [TimeComponent],
    imports: [CommonModule, FormsModule],
    exports: [TimeComponent]
})
export class TimeModule {}
