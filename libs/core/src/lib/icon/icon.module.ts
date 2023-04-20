import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';

@NgModule({
    imports: [CommonModule, IconComponent],
    exports: [IconComponent]
})
export class IconModule {}
