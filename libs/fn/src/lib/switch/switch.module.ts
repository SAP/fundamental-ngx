import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalSwitchComponent } from './switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExperimentalSwitchComponent],
    imports: [CommonModule, FormsModule],
    exports: [ExperimentalSwitchComponent]
})
export class ExperimentalSwitchModule {}
