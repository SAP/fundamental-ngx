import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchComponent } from './switch';

@NgModule({
  declarations: [SwitchComponent],
  imports: [CommonModule, FormsModule],
  exports: [SwitchComponent]
})
export class PlatformSwitchModule {}
