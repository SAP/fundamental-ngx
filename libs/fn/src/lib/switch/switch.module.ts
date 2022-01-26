import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule],
    exports: [SwitchComponent]
})
export class SwitchModule {}
